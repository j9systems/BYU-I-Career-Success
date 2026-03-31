"use client";

import { students } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Link2,
  Globe,
  GraduationCap,
  CheckCircle2,
  Circle,
  Mail,
  Calendar,
  Award,
} from "lucide-react";

const student = students.find((s) => s.id === "s1")!;

const profileChecklist = [
  { label: "Basic information", done: true },
  { label: "Bio completed", done: true },
  { label: "Skills added", done: true },
  { label: "Work experience added", done: true },
  { label: "Education added", done: true },
  { label: "Resume uploaded", done: true },
  { label: "LinkedIn profile linked", done: true },
  { label: "Portfolio link added", done: true },
  ...student.missingProfileItems.map((item) => ({ label: item, done: false })),
];

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 text-2xl mb-4">
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {student.avatar}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold">{student.name}</h1>
              <p className="text-muted-foreground">{student.major}</p>

              <Separator className="my-4" />

              <div className="w-full space-y-3 text-sm text-left">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Graduating{" "}
                    {new Date(student.graduationDate + "-01").toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric" }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>GPA: {student.gpa}</span>
                </div>
                {student.linkedIn && (
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://${student.linkedIn}`}
                      className="text-blue-600 hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {student.linkedIn}
                    </a>
                  </div>
                )}
                {student.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://${student.portfolio}`}
                      className="text-blue-600 hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {student.portfolio}
                    </a>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <Button className="w-full gap-2">
                <Upload className="h-4 w-4" />
                Upload Resume
              </Button>
            </CardContent>
          </Card>

          {/* Profile Completeness */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Score</span>
                <span className="font-semibold">{student.profileScore}%</span>
              </div>
              <Progress value={student.profileScore} className="h-2 mb-4" />
              <ul className="space-y-2">
                {profileChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    {item.done ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={
                        item.done
                          ? "text-muted-foreground"
                          : "text-foreground font-medium"
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabbed Sections */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="bio">
            <TabsList className="mb-4">
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="bio">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{student.bio}</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Employment Preference</p>
                      <p className="font-medium">{student.employmentPreference}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Remote Preference</p>
                      <p className="font-medium">
                        {student.remotePreference ? "Open to Remote" : "On-site preferred"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Active</p>
                      <p className="font-medium">
                        {new Date(student.lastActive).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill) => (
                      <Badge key={skill} variant="info" className="text-sm px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <div className="space-y-4">
                {student.workExperience.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No work experience added yet.
                    </CardContent>
                  </Card>
                ) : (
                  student.workExperience.map((exp, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{exp.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {exp.startDate} &mdash; {exp.endDate}
                          </span>
                        </div>
                        <p className="text-sm">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="space-y-4">
                {student.education.map((edu, idx) => (
                  <Card key={idx}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{edu.institution}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree} in {edu.field}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {edu.startDate} &mdash; {edu.endDate}
                        </span>
                      </div>
                      {edu.gpa && (
                        <p className="text-sm">
                          GPA: <span className="font-medium">{edu.gpa}</span>
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
