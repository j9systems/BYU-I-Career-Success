"use client";

import { useState } from "react";
import { students, resumeFeedback } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CloudUpload,
  FileText,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Calendar,
} from "lucide-react";

const student = students.find((s) => s.id === "s1")!;
const feedback = resumeFeedback.find((r) => r.studentId === "s1")!;

export default function StudentResumePage() {
  const [uploadState, setUploadState] = useState<"idle" | "processing" | "done">("idle");

  const handleUpload = () => {
    setUploadState("processing");
    setTimeout(() => setUploadState("done"), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resume</h1>
        <p className="text-muted-foreground">Upload your resume for AI-powered feedback and skill extraction</p>
      </div>

      {uploadState === "idle" && (
        <div
          onClick={handleUpload}
          className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
        >
          <CloudUpload className="h-12 w-12 text-muted-foreground" />
          <div className="text-center">
            <p className="text-lg font-medium">Drop your resume here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports PDF, DOCX, and TXT files up to 5MB
            </p>
          </div>
          <Button variant="outline" className="mt-2">
            Select File
          </Button>
        </div>
      )}

      {uploadState === "processing" && (
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <div className="text-center">
              <p className="text-lg font-medium">Analyzing your resume...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Our AI is extracting skills, experience, and generating feedback
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadState === "done" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Extracted Data (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload success */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-900">Emma_Richardson_Resume.pdf</p>
                  <p className="text-sm text-green-700">Uploaded and analyzed successfully</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadState("idle")}
                >
                  Replace
                </Button>
              </CardContent>
            </Card>

            {/* Extracted Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Extracted Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feedback.extractedSkills.map((skill) => (
                    <Badge key={skill} variant="info" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.workExperience.map((exp, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="mb-4" />}
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {exp.startDate} &mdash; {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} in {edu.field}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {edu.startDate} &mdash; {edu.endDate}
                      </span>
                    </div>
                    {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggested Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feedback.suggestedRoles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-sm px-3 py-1">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - AI Feedback Panel (1 col) */}
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-3">Overall Score</p>
                <div className="relative h-28 w-28">
                  <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-muted/30"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray={`${(feedback.overallScore / 100) * 314} 314`}
                      strokeLinecap="round"
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{feedback.overallScore}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">out of 100</p>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {feedback.strengths.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800"
                  >
                    {s}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gaps */}
            <Card className="border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-yellow-700">
                  <AlertTriangle className="h-5 w-5" />
                  Gaps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {feedback.gaps.map((g, idx) => (
                  <div
                    key={idx}
                    className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800"
                  >
                    {g}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                  <Lightbulb className="h-5 w-5" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {feedback.suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-md bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800"
                  >
                    {s}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
