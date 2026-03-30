"use client";

import { useState } from "react";
import { jobs, applications, introductions } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Users,
  Handshake,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

const EMPLOYER_ID = "e1";

const employerJobs = jobs.filter((j) => j.employerId === EMPLOYER_ID);
const employerApplications = applications.filter((a) =>
  employerJobs.some((j) => j.id === a.jobId)
);
const employerIntroductions = introductions.filter(
  (i) => i.employerId === EMPLOYER_ID
);

function applicationStatusBadge(status: string) {
  switch (status) {
    case "submitted":
      return <Badge variant="info">Submitted</Badge>;
    case "under_review":
      return <Badge variant="warning">Under Review</Badge>;
    case "interview":
      return <Badge variant="success">Interview</Badge>;
    case "offered":
      return <Badge variant="success">Offered</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function introductionStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "accepted":
      return <Badge variant="success">Accepted</Badge>;
    case "declined":
      return <Badge variant="destructive">Declined</Badge>;
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function jobStatusBadge(status: string) {
  switch (status) {
    case "open":
      return <Badge variant="success">Open</Badge>;
    case "filled":
      return <Badge variant="warning">Filled</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function EmployerDashboardPage() {
  const [introStatuses, setIntroStatuses] = useState<Record<string, string>>(
    () => {
      const map: Record<string, string> = {};
      employerIntroductions.forEach((i) => {
        map[i.id] = i.status;
      });
      return map;
    }
  );

  const handleAccept = (id: string) => {
    setIntroStatuses((prev) => ({ ...prev, [id]: "accepted" }));
  };

  const handleDecline = (id: string) => {
    setIntroStatuses((prev) => ({ ...prev, [id]: "declined" }));
  };

  const totalApplicants = employerJobs.reduce(
    (sum, j) => sum + j.applicantCount,
    0
  );
  const pendingIntros = employerIntroductions.filter(
    (i) => i.status === "pending"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Employer Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Mark. Here is an overview of your recruiting activity.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Job Postings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employerJobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplicants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Introductions
            </CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingIntros}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Job Postings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Job Postings</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {employerJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  {jobStatusBadge(job.status)}
                </div>
                <CardDescription>
                  {job.location} &middot; {job.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {job.applicantCount} applicant
                    {job.applicantCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {job.postedDate}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto">
                  View Details <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Recent Student Interest / Applications */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Recent Student Interest
        </h2>
        <Card>
          <CardContent className="pt-6">
            {employerApplications.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No applications yet.
              </p>
            ) : (
              <div className="space-y-4">
                {employerApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{app.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        Applied for{" "}
                        <span className="font-medium">{app.jobTitle}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {app.dateApplied}
                      </span>
                      {applicationStatusBadge(app.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Pending Introductions from Faculty */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Faculty Introductions
        </h2>
        <div className="space-y-4">
          {employerIntroductions.map((intro) => {
            const currentStatus = introStatuses[intro.id] || intro.status;
            return (
              <Card key={intro.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {intro.studentName}
                    </CardTitle>
                    {introductionStatusBadge(currentStatus)}
                  </div>
                  <CardDescription>
                    Introduced by {intro.facultyName}
                    {intro.jobTitle ? ` for ${intro.jobTitle}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;{intro.facultyNote}&rdquo;
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Initiated {intro.dateInitiated}
                  </p>
                </CardContent>
                {currentStatus === "pending" && (
                  <CardFooter className="gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(intro.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(intro.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
