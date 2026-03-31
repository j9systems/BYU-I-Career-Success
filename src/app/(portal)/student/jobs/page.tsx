"use client";

import { useState, useMemo } from "react";
import { students, jobs, computeMatchScore, type Job } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Users,
  Wifi,
  Briefcase,
  CheckCircle2,
  Search,
} from "lucide-react";

const student = students.find((s) => s.id === "s1")!;

const typeBadgeVariant = (type: string) => {
  switch (type) {
    case "Full-time":
      return "default" as const;
    case "Part-time":
      return "secondary" as const;
    case "Internship":
      return "info" as const;
    case "Contract":
      return "warning" as const;
    default:
      return "outline" as const;
  }
};

const matchBadgeVariant = (score: number) => {
  if (score >= 75) return "success" as const;
  if (score >= 50) return "warning" as const;
  return "secondary" as const;
};

export default function StudentJobsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationSearch, setLocationSearch] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expressedInterest, setExpressedInterest] = useState<Set<string>>(new Set());

  const openJobs = jobs.filter((j) => j.status === "open");

  const industries = useMemo(
    () => Array.from(new Set(openJobs.map((j) => j.industry))),
    [openJobs]
  );

  const filteredJobs = useMemo(() => {
    return openJobs
      .filter((j) => {
        if (typeFilter !== "all" && j.type !== typeFilter) return false;
        if (
          locationSearch &&
          !j.location.toLowerCase().includes(locationSearch.toLowerCase())
        )
          return false;
        if (remoteOnly && !j.remote) return false;
        if (industryFilter !== "all" && j.industry !== industryFilter) return false;
        return true;
      })
      .map((j) => ({ ...j, matchScore: computeMatchScore(student, j) }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [typeFilter, locationSearch, remoteOnly, industryFilter, openJobs]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setSheetOpen(true);
  };

  const handleExpressInterest = (jobId: string) => {
    setExpressedInterest((prev) => new Set(prev).add(jobId));
  };

  const selectedMatchScore = selectedJob
    ? computeMatchScore(student, selectedJob)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job Opportunities</h1>
        <p className="text-muted-foreground">
          Browse and discover roles matched to your profile
        </p>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-sm">Employment Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Location</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search location..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Industry</Label>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 h-10">
              <Switch
                id="remote-toggle"
                checked={remoteOnly}
                onCheckedChange={setRemoteOnly}
              />
              <Label htmlFor="remote-toggle" className="text-sm cursor-pointer">
                Remote Only
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
      </p>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No jobs match your current filters. Try adjusting your search criteria.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleJobClick(job)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-tight">
                    {job.title}
                  </CardTitle>
                  <Badge
                    variant={matchBadgeVariant(job.matchScore)}
                    className="shrink-0"
                  >
                    {job.matchScore}% match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {job.company}
                </p>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  {job.remote && (
                    <span className="flex items-center gap-1">
                      <Wifi className="h-3.5 w-3.5" />
                      Remote
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Badge variant={typeBadgeVariant(job.type)}>{job.type}</Badge>
                <span className="text-xs text-muted-foreground">
                  Posted{" "}
                  {new Date(job.postedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Job Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selectedJob && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">{selectedJob.title}</SheetTitle>
                <SheetDescription>
                  {selectedJob.company} &middot; {selectedJob.location}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                {/* Match + Meta */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant={matchBadgeVariant(selectedMatchScore)}>
                    {selectedMatchScore}% match
                  </Badge>
                  <Badge variant={typeBadgeVariant(selectedJob.type)}>
                    {selectedJob.type}
                  </Badge>
                  {selectedJob.remote && <Badge variant="info">Remote</Badge>}
                  <Badge variant="outline">{selectedJob.industry}</Badge>
                </div>

                {/* Compensation */}
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{selectedJob.compensation}</span>
                </div>

                {/* Applicants */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{selectedJob.applicantCount} applicants</span>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Description</h3>
                  <p className="text-sm leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                <Separator />

                {/* Requirements */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Requirements</h3>
                  <ul className="space-y-1.5">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Target Skills */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">
                    Desired Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.targetSkills.map((skill) => {
                      const hasSkill = student.skills.some(
                        (s) =>
                          s.toLowerCase().includes(skill.toLowerCase()) ||
                          skill.toLowerCase().includes(s.toLowerCase())
                      );
                      return (
                        <Badge
                          key={skill}
                          variant={hasSkill ? "success" : "outline"}
                        >
                          {skill}
                          {hasSkill && " \u2713"}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Posted date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Posted{" "}
                  {new Date(selectedJob.postedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Express Interest Button */}
                <Button
                  className="w-full"
                  size="lg"
                  disabled={expressedInterest.has(selectedJob.id)}
                  onClick={() => handleExpressInterest(selectedJob.id)}
                >
                  {expressedInterest.has(selectedJob.id) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Interest Expressed
                    </>
                  ) : (
                    <>
                      <Briefcase className="h-4 w-4 mr-2" />
                      Express Interest
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
