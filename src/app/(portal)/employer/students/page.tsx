"use client";

import { useState, useMemo } from "react";
import { students, jobs, computeMatchScore } from "@/lib/mock-data";
import type { Student } from "@/lib/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,

} from "@/components/ui/dialog";
import {
  GraduationCap,
  Search,
  Send,
  Filter,
  UserPlus,
  X,
} from "lucide-react";

const EMPLOYER_ID = "e1";
const employerJobs = jobs.filter((j) => j.employerId === EMPLOYER_ID);

const ALL_MAJORS = [
  "Business Management",
  "Accounting",
  "Finance",
  "Marketing",
];

const COMMON_SKILLS = [
  "Excel",
  "Data Analysis",
  "Project Management",
  "Leadership",
  "Financial Modeling",
  "SQL",
  "Python",
  "Social Media Marketing",
  "Content Creation",
  "Google Analytics",
  "SEO",
  "Auditing",
  "GAAP",
  "Valuation",
  "Supply Chain Management",
  "Operations",
];

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Internship", "Contract"];

function matchScoreBadge(score: number) {
  if (score >= 75) return <Badge variant="success">{score}% Match</Badge>;
  if (score >= 50) return <Badge variant="warning">{score}% Match</Badge>;
  return <Badge variant="secondary">{score}% Match</Badge>;
}

function bestMatchScore(student: Student): number {
  if (employerJobs.length === 0) return 0;
  return Math.max(...employerJobs.map((job) => computeMatchScore(student, job)));
}

export default function EmployerStudentsPage() {
  // Filter state
  const [majorFilter, setMajorFilter] = useState<string>("");
  const [gradFrom, setGradFrom] = useState("");
  const [gradTo, setGradTo] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [employmentType, setEmploymentType] = useState<string>("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Introduction dialog state
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [introStudent, setIntroStudent] = useState<Student | null>(null);
  const [introFaculty, setIntroFaculty] = useState("");
  const [introNote, setIntroNote] = useState("");
  const [introSent, setIntroSent] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setMajorFilter("");
    setGradFrom("");
    setGradTo("");
    setSelectedSkills([]);
    setEmploymentType("");
    setRemoteOnly(false);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (majorFilter && student.major !== majorFilter) return false;
      if (gradFrom && student.graduationDate < gradFrom) return false;
      if (gradTo && student.graduationDate > gradTo) return false;
      if (
        selectedSkills.length > 0 &&
        !selectedSkills.some((skill) =>
          student.skills.some(
            (ss) =>
              ss.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(ss.toLowerCase())
          )
        )
      )
        return false;
      if (employmentType && student.employmentPreference !== employmentType)
        return false;
      if (remoteOnly && !student.remotePreference) return false;
      return true;
    });
  }, [majorFilter, gradFrom, gradTo, selectedSkills, employmentType, remoteOnly]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort(
      (a, b) => bestMatchScore(b) - bestMatchScore(a)
    );
  }, [filteredStudents]);

  const handleOpenIntro = (student: Student) => {
    setIntroStudent(student);
    setIntroFaculty("");
    setIntroNote("");
    setIntroSent(false);
    setIntroDialogOpen(true);
  };

  const handleSendIntro = () => {
    setIntroSent(true);
  };

  const activeFilterCount =
    (majorFilter ? 1 : 0) +
    (gradFrom ? 1 : 0) +
    (gradTo ? 1 : 0) +
    selectedSkills.length +
    (employmentType ? 1 : 0) +
    (remoteOnly ? 1 : 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Directory</h1>
        <p className="text-muted-foreground mt-1">
          Browse BYU-I students and request introductions through faculty.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Filter Panel - Left Side */}
        <aside className="w-72 shrink-0 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              {activeFilterCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}{" "}
                  active
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Major */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Major</Label>
                <Select value={majorFilter} onValueChange={setMajorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All majors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All majors</SelectItem>
                    {ALL_MAJORS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Graduation Date Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Graduation Date</Label>
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">From</Label>
                    <Input
                      type="month"
                      value={gradFrom}
                      onChange={(e) => setGradFrom(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">To</Label>
                    <Input
                      type="month"
                      value={gradTo}
                      onChange={(e) => setGradTo(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Skills Multi-Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Skills</Label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SKILLS.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-input hover:bg-muted"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Employment Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Employment Type</Label>
                <Select value={employmentType} onValueChange={setEmploymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {EMPLOYMENT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Remote Preference */}
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Remote Preference</Label>
                <Switch checked={remoteOnly} onCheckedChange={setRemoteOnly} />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Student Cards - Main Area */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {sortedStudents.length} of {students.length} students
            </p>
          </div>

          {sortedStudents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No students match your current filters.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sortedStudents.map((student) => {
                const score = bestMatchScore(student);
                return (
                  <Card key={student.id} className="flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <CardTitle className="text-base truncate">
                              {student.name}
                            </CardTitle>
                            {matchScoreBadge(score)}
                          </div>
                          <CardDescription className="mt-0.5">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3.5 w-3.5" />
                              {student.major}
                            </span>
                          </CardDescription>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Graduation: {student.graduationDate}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {student.skills.slice(0, 5).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {student.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <div className="px-6 pb-4">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleOpenIntro(student)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Request Introduction
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Request Introduction Dialog */}
      <Dialog open={introDialogOpen} onOpenChange={setIntroDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Request Introduction</DialogTitle>
            <DialogDescription>
              Ask a faculty member to introduce you to this student.
            </DialogDescription>
          </DialogHeader>

          {introSent ? (
            <div className="py-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-800 flex items-center justify-center mx-auto">
                <Send className="h-5 w-5" />
              </div>
              <p className="font-semibold">Introduction Request Sent</p>
              <p className="text-sm text-muted-foreground">
                Your request to connect with {introStudent?.name} has been sent to{" "}
                {introFaculty || "the selected faculty member"}.
              </p>
              <Button
                variant="outline"
                onClick={() => setIntroDialogOpen(false)}
                className="mt-2"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {/* Student Name (read-only) */}
                <div className="space-y-2">
                  <Label>Student</Label>
                  <Input value={introStudent?.name ?? ""} readOnly className="bg-muted" />
                </div>

                {/* Faculty Select */}
                <div className="space-y-2">
                  <Label>Route Through Faculty</Label>
                  <Select value={introFaculty} onValueChange={setIntroFaculty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select faculty member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prof. David Anderson">
                        Prof. David Anderson
                      </SelectItem>
                      <SelectItem value="Prof. Jennifer Liu">
                        Prof. Jennifer Liu
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Optional Note */}
                <div className="space-y-2">
                  <Label htmlFor="intro-note">Note (optional)</Label>
                  <Textarea
                    id="intro-note"
                    placeholder="Add a note about why you'd like to connect with this student..."
                    rows={3}
                    value={introNote}
                    onChange={(e) => setIntroNote(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIntroDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendIntro}
                  disabled={!introFaculty}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
