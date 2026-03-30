"use client";

import { students, studentActivities, applications } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Send,
  Eye,
  CheckCircle2,
  Circle,
  FileText,
  Settings,
  Search,
  MessageSquare,
  Handshake,
  UserCheck,
  Sparkles,
} from "lucide-react";

const student = students.find((s) => s.id === "s1")!;
const myApplications = applications.filter((a) => a.studentId === "s1");

const actionItems = [
  { label: "Upload your resume", done: true },
  { label: "Complete career preferences", done: true },
  { label: "Browse 3 new job matches", done: false },
  { label: "Add a portfolio project", done: false },
  { label: "Respond to Mark Stevens' message", done: false },
];

const activityIcons: Record<string, React.ReactNode> = {
  application: <Send className="h-4 w-4 text-blue-500" />,
  message: <MessageSquare className="h-4 w-4 text-purple-500" />,
  introduction: <Handshake className="h-4 w-4 text-green-500" />,
  profile: <UserCheck className="h-4 w-4 text-orange-500" />,
  match: <Sparkles className="h-4 w-4 text-yellow-500" />,
};

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {student.name.split(" ")[0]}!
              </h1>
              <p className="text-blue-100 mt-1">
                Your profile is {student.profileScore}% complete. Keep it up!
              </p>
            </div>
            <div className="w-full md:w-64">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-blue-100">Profile Completeness</span>
                <span className="font-semibold">{student.profileScore}%</span>
              </div>
              <Progress value={student.profileScore} className="h-3 bg-blue-400/30" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Jobs Matched", value: "6", icon: Briefcase, color: "text-blue-600 bg-blue-50" },
          { label: "Applications", value: String(myApplications.length), icon: Send, color: "text-green-600 bg-green-50" },
          { label: "Profile Views", value: "24", icon: Eye, color: "text-purple-600 bg-purple-50" },
          { label: "Profile Score", value: `${student.profileScore}%`, icon: FileText, color: "text-orange-600 bg-orange-50" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`rounded-lg p-2.5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5" />
              Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {actionItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span
                    className={
                      item.done
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                  {!item.done && (
                    <Badge variant="warning" className="ml-auto">
                      To Do
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {studentActivities.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {activityIcons[activity.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
