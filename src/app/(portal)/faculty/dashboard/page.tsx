"use client";

import { useState } from "react";
import { students, applications, introductions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  UserCheck,
  FileText,
  Briefcase,
  AlertTriangle,
  Send,
  Handshake,
} from "lucide-react";

const FLAGGED_DATE_THRESHOLD = "2026-03-16";

type FlaggedStudent = {
  id: string;
  name: string;
  reasons: string[];
};

function getFlaggedStudents(): FlaggedStudent[] {
  const flagged: FlaggedStudent[] = [];

  for (const s of students) {
    const reasons: string[] = [];
    if (s.lastActive < FLAGGED_DATE_THRESHOLD) {
      reasons.push("Inactive 14+ days");
    }
    if (s.profileScore < 60) {
      reasons.push("Low profile score (" + s.profileScore + "%)");
    }
    const appCount = applications.filter((a) => a.studentId === s.id).length;
    if (appCount === 0) {
      reasons.push("No applications submitted");
    }
    if (reasons.length > 0) {
      flagged.push({ id: s.id, name: s.name, reasons });
    }
  }
  return flagged;
}

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

export default function FacultyDashboardPage() {
  const [nudgedIds, setNudgedIds] = useState<Set<string>>(new Set());

  // Stats
  const totalStudents = students.length;
  const completeProfiles = students.filter((s) => s.profileScore >= 80).length;
  const completeProfilePct = Math.round((completeProfiles / totalStudents) * 100);

  const studentsWithApps = new Set(applications.map((a) => a.studentId));
  const withAppPct = Math.round((studentsWithApps.size / totalStudents) * 100);

  const studentsPlaced = new Set(
    applications.filter((a) => a.status === "offered").map((a) => a.studentId)
  );
  const placedPct = Math.round((studentsPlaced.size / totalStudents) * 100);

  const flaggedStudents = getFlaggedStudents();

  const recentIntros = [...introductions].sort(
    (a, b) => b.dateInitiated.localeCompare(a.dateInitiated)
  );

  const handleNudge = (studentId: string) => {
    setNudgedIds((prev) => new Set(prev).add(studentId));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Department overview and student engagement metrics
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Active in department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete Profiles</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completeProfilePct}%</div>
            <p className="text-xs text-muted-foreground">
              {completeProfiles} of {totalStudents} students (80+ score)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied to Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{withAppPct}%</div>
            <p className="text-xs text-muted-foreground">
              {studentsWithApps.size} of {totalStudents} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placed</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placedPct}%</div>
            <p className="text-xs text-muted-foreground">
              {studentsPlaced.size} of {totalStudents} with offers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Flagged Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Flagged Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            {flaggedStudents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No students flagged at this time.
              </p>
            ) : (
              <div className="space-y-4">
                {flaggedStudents.map((fs) => (
                  <div key={fs.id}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {fs.name}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {fs.reasons.map((r) => (
                            <Badge key={r} variant="destructive" className="text-xs">
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={nudgedIds.has(fs.id) ? "secondary" : "outline"}
                        onClick={() => handleNudge(fs.id)}
                        disabled={nudgedIds.has(fs.id)}
                      >
                        <Send className="h-3 w-3 mr-1" />
                        {nudgedIds.has(fs.id) ? "Sent" : "Send Nudge"}
                      </Button>
                    </div>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Introductions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Handshake className="h-5 w-5 text-blue-600" />
              Recent Introductions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIntros.map((intro) => (
                <div key={intro.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {intro.studentName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {intro.company} &mdash;{" "}
                        {intro.jobTitle || "General introduction"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {intro.dateInitiated}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(intro.status)}>
                      {intro.status.charAt(0).toUpperCase() + intro.status.slice(1)}
                    </Badge>
                  </div>
                  <Separator className="mt-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
