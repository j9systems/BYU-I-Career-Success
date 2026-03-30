"use client";

import { useState } from "react";
import { jobs } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const EMPLOYER_ID = "e1";
const employerJobs = jobs.filter((j) => j.employerId === EMPLOYER_ID);

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

const STEPS = ["Role Details", "Description", "Target Criteria", "Review"];

interface NewJobForm {
  title: string;
  type: string;
  location: string;
  compensation: string;
  description: string;
  requirements: string;
  major: string;
  gradStart: string;
  gradEnd: string;
  skills: string;
}

const emptyForm: NewJobForm = {
  title: "",
  type: "",
  location: "",
  compensation: "",
  description: "",
  requirements: "",
  major: "",
  gradStart: "",
  gradEnd: "",
  skills: "",
};

export default function EmployerJobsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<NewJobForm>(emptyForm);

  const resetDialog = () => {
    setStep(1);
    setForm(emptyForm);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) resetDialog();
  };

  const updateField = (field: keyof NewJobForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your open positions and create new listings.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
              <DialogDescription>
                Step {step} of 4 &mdash; {STEPS[step - 1]}
              </DialogDescription>
            </DialogHeader>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 py-2">
              {STEPS.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = stepNum === step;
                const isComplete = stepNum < step;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : isComplete
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`w-8 h-0.5 ${
                          isComplete ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Step 1: Role Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Business Analyst"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => updateField("type", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Boise, ID"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compensation">Compensation</Label>
                  <Input
                    id="compensation"
                    placeholder="e.g. $55,000 - $65,000/year"
                    value={form.compensation}
                    onChange={(e) =>
                      updateField("compensation", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 2: Description & Requirements */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List requirements, one per line..."
                    rows={5}
                    value={form.requirements}
                    onChange={(e) =>
                      updateField("requirements", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 3: Target Student Criteria */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Major</Label>
                  <Select
                    value={form.major}
                    onValueChange={(v) => updateField("major", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Management">
                        Business Management
                      </SelectItem>
                      <SelectItem value="Accounting">Accounting</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradStart">Grad Date From</Label>
                    <Input
                      id="gradStart"
                      type="month"
                      value={form.gradStart}
                      onChange={(e) =>
                        updateField("gradStart", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradEnd">Grad Date To</Label>
                    <Input
                      id="gradEnd"
                      type="month"
                      value={form.gradEnd}
                      onChange={(e) => updateField("gradEnd", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">
                    Desired Skills (comma-separated)
                  </Label>
                  <Input
                    id="skills"
                    placeholder="e.g. Excel, Data Analysis, Project Management"
                    value={form.skills}
                    onChange={(e) => updateField("skills", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">Title:</span> {form.title || "—"}
                </div>
                <div>
                  <span className="font-semibold">Type:</span> {form.type || "—"}
                </div>
                <div>
                  <span className="font-semibold">Location:</span>{" "}
                  {form.location || "—"}
                </div>
                <div>
                  <span className="font-semibold">Compensation:</span>{" "}
                  {form.compensation || "—"}
                </div>
                <Separator />
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="text-muted-foreground mt-1 whitespace-pre-wrap">
                    {form.description || "—"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Requirements:</span>
                  <p className="text-muted-foreground mt-1 whitespace-pre-wrap">
                    {form.requirements || "—"}
                  </p>
                </div>
                <Separator />
                <div>
                  <span className="font-semibold">Target Major:</span>{" "}
                  {form.major || "—"}
                </div>
                <div>
                  <span className="font-semibold">Graduation Range:</span>{" "}
                  {form.gradStart || "—"} to {form.gradEnd || "—"}
                </div>
                <div>
                  <span className="font-semibold">Skills:</span>{" "}
                  {form.skills || "—"}
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between sm:justify-between">
              <div>
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                )}
              </div>
              <div>
                {step < 4 ? (
                  <Button onClick={() => setStep((s) => s + 1)}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleOpenChange(false);
                    }}
                  >
                    Publish Job
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Posted Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-center">Applicants</th>
                  <th className="pb-3 font-medium">Posted</th>
                </tr>
              </thead>
              <tbody>
                {employerJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{job.title}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">{job.type}</td>
                    <td className="py-4">{jobStatusBadge(job.status)}</td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {job.applicantCount}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {job.postedDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
