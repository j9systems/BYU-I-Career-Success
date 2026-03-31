"use client";

import { useState, useMemo } from "react";
import {
  introductions,
  students,
  employers,
  jobs,
} from "@/lib/mock-data";
import type { Introduction } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  Search,
  Plus,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Send,
} from "lucide-react";

type SortField =
  | "studentName"
  | "company"
  | "status"
  | "dateInitiated";
type SortDirection = "asc" | "desc";

function getStatusBadgeVariant(
  status: string
): "warning" | "success" | "destructive" | "info" {
  switch (status) {
    case "pending":
      return "warning";
    case "accepted":
      return "success";
    case "declined":
      return "destructive";
    case "completed":
      return "info";
    default:
      return "info";
  }
}

export default function FacultyIntroductionsPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("dateInitiated");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [dialogOpen, setDialogOpen] = useState(false);

  // New introduction form state
  const [formStudent, setFormStudent] = useState("");
  const [formEmployer, setFormEmployer] = useState("");
  const [formJob, setFormJob] = useState("");
  const [formNote, setFormNote] = useState("");
  const [localIntros, setLocalIntros] = useState<Introduction[]>(introductions);

  const filtered = useMemo(() => {
    let list = [...localIntros];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (intro) =>
          intro.studentName.toLowerCase().includes(q) ||
          intro.company.toLowerCase().includes(q) ||
          intro.employerContactName.toLowerCase().includes(q) ||
          (intro.jobTitle && intro.jobTitle.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "studentName":
          cmp = a.studentName.localeCompare(b.studentName);
          break;
        case "company":
          cmp = a.company.localeCompare(b.company);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "dateInitiated":
          cmp = a.dateInitiated.localeCompare(b.dateInitiated);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, sortField, sortDir, localIntros]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3 ml-1" />
    ) : (
      <ChevronDown className="h-3 w-3 ml-1" />
    );
  };

  const handleCreateIntro = () => {
    if (!formStudent || !formEmployer) return;

    const student = students.find((s) => s.id === formStudent);
    const employer = employers.find((e) => e.id === formEmployer);
    const job = jobs.find((j) => j.id === formJob);

    if (!student || !employer) return;

    const newIntro: Introduction = {
      id: `i${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      employerId: employer.id,
      employerContactName: employer.contactName,
      company: employer.name,
      jobId: job?.id,
      jobTitle: job?.title,
      facultyName: "Prof. David Anderson",
      facultyNote: formNote,
      status: "pending",
      dateInitiated: new Date().toISOString().split("T")[0],
    };

    setLocalIntros((prev) => [newIntro, ...prev]);
    setDialogOpen(false);
    setFormStudent("");
    setFormEmployer("");
    setFormJob("");
    setFormNote("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Introductions</h1>
          <p className="text-muted-foreground mt-1">
            Manage faculty-facilitated introductions between students and employers
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Introduction
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search introductions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("studentName")}
                  >
                    <span className="inline-flex items-center">
                      Student
                      <SortIcon field="studentName" />
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    Employer Contact
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("company")}
                  >
                    <span className="inline-flex items-center">
                      Company
                      <SortIcon field="company" />
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Job Title</th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    <span className="inline-flex items-center">
                      Status
                      <SortIcon field="status" />
                    </span>
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("dateInitiated")}
                  >
                    <span className="inline-flex items-center">
                      Date
                      <SortIcon field="dateInitiated" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((intro) => (
                  <tr
                    key={intro.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">
                      {intro.studentName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {intro.employerContactName}
                    </td>
                    <td className="px-4 py-3">{intro.company}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {intro.jobTitle || "General"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getStatusBadgeVariant(intro.status)}>
                        {intro.status.charAt(0).toUpperCase() +
                          intro.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {intro.dateInitiated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No introductions match your search.
            </p>
          )}
        </CardContent>
      </Card>

      {/* New Introduction Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Introduction</DialogTitle>
            <DialogDescription>
              Facilitate a connection between a student and an employer contact.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="intro-student">Student</Label>
              <Select value={formStudent} onValueChange={setFormStudent}>
                <SelectTrigger id="intro-student">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intro-employer">Employer Contact</Label>
              <Select value={formEmployer} onValueChange={setFormEmployer}>
                <SelectTrigger id="intro-employer">
                  <SelectValue placeholder="Select an employer" />
                </SelectTrigger>
                <SelectContent>
                  {employers.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.contactName} ({e.name})
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
                  {jobs
                    .filter((j) => j.status === "open")
                    .map((j) => (
                      <SelectItem key={j.id} value={j.id}>
                        {j.title} - {j.company}
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateIntro}
              disabled={!formStudent || !formEmployer}
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
