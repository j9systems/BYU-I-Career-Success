"use client";

import { useState, useMemo } from "react";
import {
  employers,
  students,
  jobs,
  introductions,
} from "@/lib/mock-data";
import type { Employer, Introduction } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  ExternalLink,
  Mail,
  Briefcase,
  GraduationCap,
  Send,
  Handshake,
  Eye,
} from "lucide-react";

export default function FacultyEmployersPage() {
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [introEmployer, setIntroEmployer] = useState<Employer | null>(null);

  // Intro form state
  const [formStudent, setFormStudent] = useState("");
  const [formJob, setFormJob] = useState("");
  const [formNote, setFormNote] = useState("");
  const [localIntros, setLocalIntros] = useState<Introduction[]>(introductions);

  const filtered = useMemo(() => {
    if (!search) return employers;
    const q = search.toLowerCase();
    return employers.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.industry.toLowerCase().includes(q) ||
        e.contactName.toLowerCase().includes(q)
    );
  }, [search]);

  const openDetails = (employer: Employer) => {
    setSelectedEmployer(employer);
    setSheetOpen(true);
  };

  const openIntroDialog = (employer: Employer) => {
    setIntroEmployer(employer);
    setFormStudent("");
    setFormJob("");
    setFormNote("");
    setIntroDialogOpen(true);
  };

  const employerJobs = (employerId: string) =>
    jobs.filter((j) => j.employerId === employerId && j.status === "open");

  const handleCreateIntro = () => {
    if (!formStudent || !introEmployer) return;

    const student = students.find((s) => s.id === formStudent);
    const job = formJob ? jobs.find((j) => j.id === formJob) : undefined;

    if (!student) return;

    const newIntro: Introduction = {
      id: `i${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      employerId: introEmployer.id,
      employerContactName: introEmployer.contactName,
      company: introEmployer.name,
      jobId: job?.id,
      jobTitle: job?.title,
      facultyName: "Prof. David Anderson",
      facultyNote: formNote,
      status: "pending",
      dateInitiated: new Date().toISOString().split("T")[0],
    };

    setLocalIntros((prev) => [newIntro, ...prev]);
    setIntroDialogOpen(false);
    setFormStudent("");
    setFormJob("");
    setFormNote("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employer Directory</h1>
        <p className="text-muted-foreground mt-1">
          Browse employer partners and facilitate student introductions
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Employer Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((employer) => {
          const openCount = employerJobs(employer.id).length;
          return (
            <Card key={employer.id} className="flex flex-col">
              <CardContent className="flex flex-col items-center pt-6 flex-1">
                {/* Logo Circle */}
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {employer.logo}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  {employer.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {employer.industry}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  {employer.isAlumniOwned && (
                    <Badge variant="info">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Alumni
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {openCount} Open {openCount === 1 ? "Job" : "Jobs"}
                  </Badge>
                </div>

                <div className="flex gap-2 mt-auto pt-6 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openDetails(employer)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => openIntroDialog(employer)}
                  >
                    <Handshake className="h-4 w-4 mr-2" />
                    Introduce Student
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No employers match your search.
        </p>
      )}

      {/* Employer Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="overflow-y-auto w-full max-w-md">
          {selectedEmployer && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-primary">
                      {selectedEmployer.logo}
                    </span>
                  </div>
                  <div>
                    <SheetTitle>{selectedEmployer.name}</SheetTitle>
                    <SheetDescription>{selectedEmployer.industry}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                {/* Alumni Badge */}
                {selectedEmployer.isAlumniOwned && (
                  <Badge variant="info">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    Alumni-Owned Business
                  </Badge>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold mb-1">About</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEmployer.description}
                  </p>
                </div>

                <Separator />

                {/* Contact Info */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedEmployer.contactName}</p>
                        <p className="text-muted-foreground">
                          {selectedEmployer.contactEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://${selectedEmployer.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {selectedEmployer.website}
                      </a>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Open Jobs */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Open Positions ({employerJobs(selectedEmployer.id).length})
                  </h4>
                  {employerJobs(selectedEmployer.id).length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No open positions at this time.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {employerJobs(selectedEmployer.id).map((job) => (
                        <div key={job.id} className="rounded-md border p-3">
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {job.location} &middot; {job.type}
                            {job.remote ? " &middot; Remote" : ""}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {job.compensation}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="success" className="text-xs">
                              Open
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {job.applicantCount} applicants
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Recent Introductions */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Recent Introductions
                  </h4>
                  {(() => {
                    const empIntros = localIntros.filter(
                      (i) => i.employerId === selectedEmployer.id
                    );
                    if (empIntros.length === 0)
                      return (
                        <p className="text-sm text-muted-foreground">
                          No introductions yet.
                        </p>
                      );
                    return (
                      <div className="space-y-2">
                        {empIntros.map((intro) => (
                          <div
                            key={intro.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <div>
                              <p className="font-medium">{intro.studentName}</p>
                              <p className="text-xs text-muted-foreground">
                                {intro.jobTitle || "General"} &middot;{" "}
                                {intro.dateInitiated}
                              </p>
                            </div>
                            <Badge
                              variant={
                                intro.status === "pending"
                                  ? "warning"
                                  : intro.status === "accepted"
                                  ? "success"
                                  : intro.status === "declined"
                                  ? "destructive"
                                  : "info"
                              }
                            >
                              {intro.status.charAt(0).toUpperCase() +
                                intro.status.slice(1)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                <Button
                  className="w-full mt-2"
                  onClick={() => {
                    setSheetOpen(false);
                    openIntroDialog(selectedEmployer);
                  }}
                >
                  <Handshake className="h-4 w-4 mr-2" />
                  Introduce Student
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Introduce Student Dialog */}
      <Dialog open={introDialogOpen} onOpenChange={setIntroDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Introduce Student</DialogTitle>
            <DialogDescription>
              {introEmployer
                ? `Facilitate a connection with ${introEmployer.contactName} at ${introEmployer.name}.`
                : "Select an employer and student to introduce."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Pre-filled employer display */}
            {introEmployer && (
              <div className="rounded-md border p-3 bg-muted/30">
                <p className="text-xs text-muted-foreground">Employer</p>
                <p className="text-sm font-medium">
                  {introEmployer.contactName} &mdash; {introEmployer.name}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="intro-student">Student</Label>
              <Select value={formStudent} onValueChange={setFormStudent}>
                <SelectTrigger id="intro-student">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} &mdash; {s.major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intro-job">Job (Optional)</Label>
              <Select value={formJob} onValueChange={setFormJob}>
                <SelectTrigger id="intro-job">
                  <SelectValue placeholder="Select a job (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {(introEmployer
                    ? employerJobs(introEmployer.id)
                    : jobs.filter((j) => j.status === "open")
                  ).map((j) => (
                    <SelectItem key={j.id} value={j.id}>
                      {j.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intro-note">Faculty Note</Label>
              <Textarea
                id="intro-note"
                placeholder="Write a note to accompany the introduction..."
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
                rows={4}
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
              onClick={handleCreateIntro}
              disabled={!formStudent}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Introduction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
