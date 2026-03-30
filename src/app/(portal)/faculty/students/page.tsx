"use client";

import { useState, useMemo } from "react";
import { students, applications } from "@/lib/mock-data";
import type { Student } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Search,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Handshake,
} from "lucide-react";

type SortField =
  | "name"
  | "major"
  | "graduationDate"
  | "profileScore"
  | "lastActive"
  | "applications";
type SortDirection = "asc" | "desc";

function getStatusLabel(student: Student): { label: string; variant: "success" | "warning" | "destructive" | "info" } {
  const studentApps = applications.filter((a) => a.studentId === student.id);
  const hasOffer = studentApps.some((a) => a.status === "offered");
  const hasInterview = studentApps.some((a) => a.status === "interview");

  if (hasOffer) return { label: "Placed", variant: "success" };
  if (hasInterview) return { label: "Interviewing", variant: "info" };
  if (studentApps.length > 0) return { label: "Active", variant: "warning" };
  return { label: "No Applications", variant: "destructive" };
}

export default function FacultyStudentsPage() {
  const [search, setSearch] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const uniqueMajors = useMemo(
    () => Array.from(new Set(students.map((s) => s.major))).sort(),
    []
  );

  const appCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of applications) {
      map[a.studentId] = (map[a.studentId] || 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list = [...students];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.major.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    if (majorFilter !== "all") {
      list = list.filter((s) => s.major === majorFilter);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "major":
          cmp = a.major.localeCompare(b.major);
          break;
        case "graduationDate":
          cmp = a.graduationDate.localeCompare(b.graduationDate);
          break;
        case "profileScore":
          cmp = a.profileScore - b.profileScore;
          break;
        case "lastActive":
          cmp = a.lastActive.localeCompare(b.lastActive);
          break;
        case "applications":
          cmp = (appCountMap[a.id] || 0) - (appCountMap[b.id] || 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, majorFilter, sortField, sortDir, appCountMap]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3 ml-1" />
    ) : (
      <ChevronDown className="h-3 w-3 ml-1" />
    );
  };

  const openStudentSheet = (student: Student) => {
    setSelectedStudent(student);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all students in your department
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={majorFilter} onValueChange={setMajorFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Majors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Majors</SelectItem>
            {uniqueMajors.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {(
                    [
                      ["name", "Name"],
                      ["major", "Major"],
                      ["graduationDate", "Grad Date"],
                      ["profileScore", "Profile"],
                      ["lastActive", "Last Active"],
                      ["applications", "Apps"],
                    ] as [SortField, string][]
                  ).map(([field, label]) => (
                    <th
                      key={field}
                      className="px-4 py-3 text-left font-medium cursor-pointer select-none hover:bg-muted/80 transition-colors"
                      onClick={() => handleSort(field)}
                    >
                      <span className="inline-flex items-center">
                        {label}
                        <SortIcon field={field} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => {
                  const status = getStatusLabel(student);
                  const appCount = appCountMap[student.id] || 0;
                  return (
                    <tr
                      key={student.id}
                      className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => openStudentSheet(student)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{student.major}</td>
                      <td className="px-4 py-3">{student.graduationDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <Progress
                            value={student.profileScore}
                            className={`h-2 w-16 ${
                              student.profileScore >= 80
                                ? "[&>div]:bg-green-500"
                                : student.profileScore >= 60
                                ? "[&>div]:bg-yellow-500"
                                : "[&>div]:bg-red-500"
                            }`}
                          />
                          <span className="text-xs font-medium">
                            {student.profileScore}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {student.lastActive}
                      </td>
                      <td className="px-4 py-3 text-center">{appCount}</td>
                      <td className="px-4 py-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No students match your search criteria.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Student Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="overflow-y-auto w-full max-w-md">
          {selectedStudent && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 mt-2">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="text-lg">
                      {selectedStudent.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedStudent.name}</SheetTitle>
                    <SheetDescription>{selectedStudent.major}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                {/* Bio */}
                <div>
                  <h4 className="text-sm font-semibold mb-1">Bio</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.bio}
                  </p>
                </div>

                <Separator />

                {/* Profile Score */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Profile Score</h4>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={selectedStudent.profileScore}
                      className={`h-3 flex-1 ${
                        selectedStudent.profileScore >= 80
                          ? "[&>div]:bg-green-500"
                          : selectedStudent.profileScore >= 60
                          ? "[&>div]:bg-yellow-500"
                          : "[&>div]:bg-red-500"
                      }`}
                    />
                    <span className="text-sm font-bold">
                      {selectedStudent.profileScore}%
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedStudent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Work Experience */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Work Experience</h4>
                  {selectedStudent.workExperience.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No work experience listed.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedStudent.workExperience.map((exp, i) => (
                        <div key={i}>
                          <p className="text-sm font-medium">{exp.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {exp.company} &middot; {exp.startDate} &ndash;{" "}
                            {exp.endDate}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">GPA</span>
                    <p className="font-medium">{selectedStudent.gpa}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Graduation</span>
                    <p className="font-medium">
                      {selectedStudent.graduationDate}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preference</span>
                    <p className="font-medium">
                      {selectedStudent.employmentPreference}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Remote</span>
                    <p className="font-medium">
                      {selectedStudent.remotePreference ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-2">
                  <Handshake className="h-4 w-4 mr-2" />
                  Facilitate Introduction
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
