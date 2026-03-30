// ============================================================
// BYU-I Career Success Platform — Centralized Mock Data
// ============================================================

// ----- Types ------------------------------------------------

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  major: string;
  graduationDate: string;
  gpa: number;
  bio: string;
  linkedIn: string;
  portfolio: string;
  skills: string[];
  profileScore: number;
  missingProfileItems: string[];
  lastActive: string;
  workExperience: WorkExperience[];
  education: Education[];
  employmentPreference: string;
  remotePreference: boolean;
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: number;
}

export interface Employer {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  website: string;
  contactName: string;
  contactEmail: string;
  isAlumniOwned: boolean;
  openJobsCount: number;
}

export interface Job {
  id: string;
  title: string;
  employerId: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  remote: boolean;
  industry: string;
  description: string;
  requirements: string[];
  targetMajors: string[];
  targetGradDateRange: { start: string; end: string };
  targetSkills: string[];
  compensation: string;
  postedDate: string;
  status: "open" | "filled" | "draft";
  applicantCount: number;
}

export interface Introduction {
  id: string;
  studentId: string;
  studentName: string;
  employerId: string;
  employerContactName: string;
  company: string;
  jobId?: string;
  jobTitle?: string;
  facultyName: string;
  facultyNote: string;
  status: "pending" | "accepted" | "declined" | "completed";
  dateInitiated: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: "submitted" | "under_review" | "interview" | "offered" | "rejected";
  dateApplied: string;
}

export interface Message {
  id: string;
  threadId: string;
  from: string;
  fromRole: "student" | "faculty" | "employer";
  to: string;
  toRole: "student" | "faculty" | "employer";
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

export interface ResumeFeedback {
  studentId: string;
  overallScore: number;
  strengths: string[];
  gaps: string[];
  suggestions: string[];
  extractedSkills: string[];
  suggestedRoles: string[];
}

export interface ActivityItem {
  id: string;
  type: "application" | "message" | "introduction" | "profile" | "match";
  description: string;
  date: string;
}

// ----- Data -------------------------------------------------

export const students: Student[] = [
  {
    id: "s1",
    name: "Emma Richardson",
    email: "ric18004@byui.edu",
    avatar: "ER",
    major: "Business Management",
    graduationDate: "2026-07",
    gpa: 3.8,
    bio: "Business Management student with a passion for strategic planning and organizational development. Currently interning with a local tech startup and involved in the BYU-I Entrepreneurship Club.",
    linkedIn: "linkedin.com/in/emmarichardson",
    portfolio: "emmarichardson.com",
    skills: ["Project Management", "Excel", "Data Analysis", "Leadership", "Strategic Planning", "Agile"],
    profileScore: 92,
    missingProfileItems: ["Add a portfolio project"],
    lastActive: "2026-03-29",
    workExperience: [
      { title: "Operations Intern", company: "TechVista Solutions", startDate: "2025-06", endDate: "2025-12", description: "Assisted in streamlining project workflows, reducing delivery time by 15%." },
      { title: "Student Manager", company: "BYU-I Bookstore", startDate: "2024-09", endDate: "2025-05", description: "Managed a team of 8 student employees and coordinated scheduling." },
    ],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Business Management", startDate: "2023-09", endDate: "2026-07", gpa: 3.8 },
    ],
    employmentPreference: "Full-time",
    remotePreference: false,
  },
  {
    id: "s2",
    name: "James Nakamura",
    email: "nak19002@byui.edu",
    avatar: "JN",
    major: "Accounting",
    graduationDate: "2026-04",
    gpa: 3.9,
    bio: "Accounting student pursuing CPA certification. Detail-oriented with strong analytical skills.",
    linkedIn: "linkedin.com/in/jamesnakamura",
    portfolio: "",
    skills: ["Financial Analysis", "QuickBooks", "Excel", "Tax Preparation", "Auditing", "GAAP"],
    profileScore: 85,
    missingProfileItems: ["Add portfolio link", "Upload resume"],
    lastActive: "2026-03-28",
    workExperience: [
      { title: "Tax Intern", company: "Deloitte", startDate: "2025-01", endDate: "2025-04", description: "Prepared individual and business tax returns." },
    ],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Accounting", startDate: "2022-09", endDate: "2026-04", gpa: 3.9 },
    ],
    employmentPreference: "Full-time",
    remotePreference: false,
  },
  {
    id: "s3",
    name: "Sofia Martinez",
    email: "mar20010@byui.edu",
    avatar: "SM",
    major: "Marketing",
    graduationDate: "2026-12",
    gpa: 3.5,
    bio: "Creative marketing student specializing in digital campaigns and social media strategy.",
    linkedIn: "linkedin.com/in/sofiamartinez",
    portfolio: "sofiamartinez.design",
    skills: ["Social Media Marketing", "Content Creation", "Adobe Creative Suite", "Google Analytics", "SEO", "Copywriting"],
    profileScore: 78,
    missingProfileItems: ["Complete work experience section", "Add 2 more skills"],
    lastActive: "2026-03-27",
    workExperience: [
      { title: "Social Media Coordinator", company: "BYU-I Communications", startDate: "2025-05", endDate: "Present", description: "Manage social media accounts for university departments." },
    ],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Marketing", startDate: "2023-09", endDate: "2026-12", gpa: 3.5 },
    ],
    employmentPreference: "Full-time",
    remotePreference: true,
  },
  {
    id: "s4",
    name: "Tyler Jensen",
    email: "jen18009@byui.edu",
    avatar: "TJ",
    major: "Finance",
    graduationDate: "2026-07",
    gpa: 3.6,
    bio: "Finance student with experience in equity research and financial modeling.",
    linkedIn: "linkedin.com/in/tylerjensen",
    portfolio: "",
    skills: ["Financial Modeling", "Bloomberg Terminal", "Equity Research", "Valuation", "Excel"],
    profileScore: 65,
    missingProfileItems: ["Add portfolio link", "Complete bio section", "Upload resume", "Add work experience"],
    lastActive: "2026-03-10",
    workExperience: [],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Finance", startDate: "2023-01", endDate: "2026-07", gpa: 3.6 },
    ],
    employmentPreference: "Internship",
    remotePreference: false,
  },
  {
    id: "s5",
    name: "Rachel Okonkwo",
    email: "oko19007@byui.edu",
    avatar: "RO",
    major: "Business Management",
    graduationDate: "2026-04",
    gpa: 3.7,
    bio: "Focused on operations management and supply chain. President of the Supply Chain Club.",
    linkedIn: "linkedin.com/in/rachelokonkwo",
    portfolio: "rachelokonkwo.com",
    skills: ["Supply Chain Management", "Operations", "SAP", "Lean Six Sigma", "Project Management", "SQL"],
    profileScore: 88,
    missingProfileItems: ["Add one more reference"],
    lastActive: "2026-03-29",
    workExperience: [
      { title: "Supply Chain Intern", company: "Walmart Distribution", startDate: "2025-05", endDate: "2025-08", description: "Optimized inventory routing, reducing costs by 8%." },
      { title: "Operations Assistant", company: "BYU-I Facilities", startDate: "2024-01", endDate: "2025-04", description: "Coordinated facility scheduling and maintenance logs." },
    ],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Business Management", startDate: "2022-09", endDate: "2026-04", gpa: 3.7 },
    ],
    employmentPreference: "Full-time",
    remotePreference: false,
  },
  {
    id: "s6",
    name: "David Kim",
    email: "kim20003@byui.edu",
    avatar: "DK",
    major: "Accounting",
    graduationDate: "2027-04",
    gpa: 3.4,
    bio: "Aspiring auditor with a strong interest in forensic accounting.",
    linkedIn: "",
    portfolio: "",
    skills: ["Auditing", "Excel", "GAAP"],
    profileScore: 35,
    missingProfileItems: ["Add LinkedIn", "Add portfolio", "Upload resume", "Complete bio", "Add work experience", "Add skills"],
    lastActive: "2026-02-15",
    workExperience: [],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Accounting", startDate: "2024-01", endDate: "2027-04", gpa: 3.4 },
    ],
    employmentPreference: "Internship",
    remotePreference: true,
  },
  {
    id: "s7",
    name: "Megan Thompson",
    email: "tho19011@byui.edu",
    avatar: "MT",
    major: "Marketing",
    graduationDate: "2026-07",
    gpa: 3.3,
    bio: "Passionate about brand strategy and consumer behavior research.",
    linkedIn: "linkedin.com/in/meganthompson",
    portfolio: "",
    skills: ["Brand Strategy", "Market Research", "SPSS", "Presentation", "Consumer Behavior"],
    profileScore: 55,
    missingProfileItems: ["Add portfolio", "Upload resume", "Add work experience"],
    lastActive: "2026-03-05",
    workExperience: [],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Marketing", startDate: "2023-01", endDate: "2026-07", gpa: 3.3 },
    ],
    employmentPreference: "Part-time",
    remotePreference: true,
  },
  {
    id: "s8",
    name: "Andrew Patel",
    email: "pat18015@byui.edu",
    avatar: "AP",
    major: "Finance",
    graduationDate: "2026-04",
    gpa: 3.8,
    bio: "Finance student with internships in investment banking and wealth management.",
    linkedIn: "linkedin.com/in/andrewpatel",
    portfolio: "andrewpatel.finance",
    skills: ["Investment Analysis", "Financial Modeling", "Bloomberg Terminal", "Valuation", "DCF Analysis", "Python", "Excel"],
    profileScore: 95,
    missingProfileItems: [],
    lastActive: "2026-03-30",
    workExperience: [
      { title: "Investment Banking Intern", company: "Goldman Sachs", startDate: "2025-06", endDate: "2025-08", description: "Worked on M&A deal modeling and client presentations." },
      { title: "Wealth Management Intern", company: "Fidelity Investments", startDate: "2024-06", endDate: "2024-08", description: "Assisted financial advisors with portfolio analysis." },
    ],
    education: [
      { institution: "Brigham Young University–Idaho", degree: "B.S.", field: "Finance", startDate: "2022-09", endDate: "2026-04", gpa: 3.8 },
    ],
    employmentPreference: "Full-time",
    remotePreference: false,
  },
];

export const employers: Employer[] = [
  {
    id: "e1",
    name: "TechVista Solutions",
    logo: "TV",
    industry: "Technology",
    description: "A growing SaaS company specializing in business intelligence tools for mid-market companies.",
    website: "techvista.com",
    contactName: "Mark Stevens",
    contactEmail: "mstevens@techvista.com",
    isAlumniOwned: true,
    openJobsCount: 3,
  },
  {
    id: "e2",
    name: "Mountain West Financial",
    logo: "MW",
    industry: "Financial Services",
    description: "Regional financial advisory and wealth management firm serving the Intermountain West.",
    website: "mwfinancial.com",
    contactName: "Lisa Chen",
    contactEmail: "lchen@mwfinancial.com",
    isAlumniOwned: true,
    openJobsCount: 2,
  },
  {
    id: "e3",
    name: "Pinnacle Marketing Group",
    logo: "PM",
    industry: "Marketing & Advertising",
    description: "Full-service digital marketing agency working with Fortune 500 and startup clients.",
    website: "pinnaclemg.com",
    contactName: "Sarah Williams",
    contactEmail: "swilliams@pinnaclemg.com",
    isAlumniOwned: false,
    openJobsCount: 2,
  },
  {
    id: "e4",
    name: "Deloitte",
    logo: "DL",
    industry: "Professional Services",
    description: "Global professional services network providing audit, consulting, tax, and advisory services.",
    website: "deloitte.com",
    contactName: "Robert Taylor",
    contactEmail: "rtaylor@deloitte.com",
    isAlumniOwned: false,
    openJobsCount: 1,
  },
];

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Business Analyst",
    employerId: "e1",
    company: "TechVista Solutions",
    location: "Boise, ID",
    type: "Full-time",
    remote: false,
    industry: "Technology",
    description: "Join our growing analytics team to help clients leverage data for business decisions. You'll work with cross-functional teams to gather requirements, build dashboards, and present insights to stakeholders.",
    requirements: ["Bachelor's in Business or related field", "Strong Excel skills", "Experience with data visualization tools", "Excellent communication skills"],
    targetMajors: ["Business Management", "Finance"],
    targetGradDateRange: { start: "2026-01", end: "2026-12" },
    targetSkills: ["Data Analysis", "Excel", "Project Management"],
    compensation: "$55,000 - $65,000/year",
    postedDate: "2026-03-15",
    status: "open",
    applicantCount: 5,
  },
  {
    id: "j2",
    title: "Marketing Coordinator",
    employerId: "e1",
    company: "TechVista Solutions",
    location: "Boise, ID",
    type: "Full-time",
    remote: true,
    industry: "Technology",
    description: "Drive our content marketing strategy and manage digital campaigns across multiple channels. Work closely with the sales team to generate qualified leads.",
    requirements: ["Bachelor's in Marketing or related field", "Social media management experience", "Content creation skills", "Google Analytics proficiency"],
    targetMajors: ["Marketing"],
    targetGradDateRange: { start: "2026-01", end: "2026-12" },
    targetSkills: ["Social Media Marketing", "Content Creation", "Google Analytics"],
    compensation: "$48,000 - $55,000/year",
    postedDate: "2026-03-20",
    status: "open",
    applicantCount: 3,
  },
  {
    id: "j3",
    title: "Financial Analyst Intern",
    employerId: "e2",
    company: "Mountain West Financial",
    location: "Salt Lake City, UT",
    type: "Internship",
    remote: false,
    industry: "Financial Services",
    description: "Summer internship opportunity to work alongside senior analysts in portfolio management, financial modeling, and client reporting.",
    requirements: ["Pursuing degree in Finance or Accounting", "GPA 3.5+", "Excel proficiency", "Bloomberg Terminal experience preferred"],
    targetMajors: ["Finance", "Accounting"],
    targetGradDateRange: { start: "2026-04", end: "2027-12" },
    targetSkills: ["Financial Modeling", "Excel", "Bloomberg Terminal"],
    compensation: "$22/hour",
    postedDate: "2026-03-10",
    status: "open",
    applicantCount: 8,
  },
  {
    id: "j4",
    title: "Operations Associate",
    employerId: "e1",
    company: "TechVista Solutions",
    location: "Boise, ID",
    type: "Full-time",
    remote: false,
    industry: "Technology",
    description: "Help scale our operations as we grow. You'll optimize processes, manage vendor relationships, and ensure smooth day-to-day operations.",
    requirements: ["Bachelor's in Business Management or related field", "Strong organizational skills", "Experience with project management tools", "Problem-solving mindset"],
    targetMajors: ["Business Management"],
    targetGradDateRange: { start: "2026-01", end: "2026-08" },
    targetSkills: ["Operations", "Project Management", "Supply Chain Management"],
    compensation: "$50,000 - $60,000/year",
    postedDate: "2026-03-22",
    status: "open",
    applicantCount: 2,
  },
  {
    id: "j5",
    title: "Digital Marketing Specialist",
    employerId: "e3",
    company: "Pinnacle Marketing Group",
    location: "Remote",
    type: "Full-time",
    remote: true,
    industry: "Marketing & Advertising",
    description: "Execute digital marketing campaigns for diverse clients. Manage SEO, SEM, social media advertising, and email marketing programs.",
    requirements: ["Bachelor's in Marketing", "Google Ads certification preferred", "SEO experience", "Strong analytical skills"],
    targetMajors: ["Marketing"],
    targetGradDateRange: { start: "2026-01", end: "2026-12" },
    targetSkills: ["SEO", "Google Analytics", "Social Media Marketing", "Content Creation"],
    compensation: "$52,000 - $62,000/year",
    postedDate: "2026-03-18",
    status: "open",
    applicantCount: 6,
  },
  {
    id: "j6",
    title: "Audit Associate",
    employerId: "e4",
    company: "Deloitte",
    location: "Salt Lake City, UT",
    type: "Full-time",
    remote: false,
    industry: "Professional Services",
    description: "Join our audit practice serving technology and financial services clients. Perform audit procedures, analyze financial statements, and work with engagement teams.",
    requirements: ["Bachelor's in Accounting", "CPA eligible", "GPA 3.5+", "Strong attention to detail"],
    targetMajors: ["Accounting"],
    targetGradDateRange: { start: "2026-01", end: "2026-08" },
    targetSkills: ["Auditing", "GAAP", "Financial Analysis"],
    compensation: "$62,000 - $72,000/year",
    postedDate: "2026-03-05",
    status: "open",
    applicantCount: 12,
  },
  {
    id: "j7",
    title: "Wealth Management Associate",
    employerId: "e2",
    company: "Mountain West Financial",
    location: "Salt Lake City, UT",
    type: "Full-time",
    remote: false,
    industry: "Financial Services",
    description: "Support our wealth management team in serving high-net-worth clients with financial planning, investment management, and estate planning services.",
    requirements: ["Bachelor's in Finance", "Series 7 & 66 preferred", "Client relationship skills", "Financial planning knowledge"],
    targetMajors: ["Finance"],
    targetGradDateRange: { start: "2026-01", end: "2026-07" },
    targetSkills: ["Investment Analysis", "Financial Modeling", "Valuation"],
    compensation: "$58,000 - $68,000/year + bonus",
    postedDate: "2026-03-12",
    status: "open",
    applicantCount: 4,
  },
  {
    id: "j8",
    title: "Social Media Intern",
    employerId: "e3",
    company: "Pinnacle Marketing Group",
    location: "Remote",
    type: "Internship",
    remote: true,
    industry: "Marketing & Advertising",
    description: "Assist our social media team in creating content, scheduling posts, and analyzing engagement metrics for client accounts.",
    requirements: ["Pursuing Marketing degree", "Social media savvy", "Basic design skills", "Strong writing"],
    targetMajors: ["Marketing"],
    targetGradDateRange: { start: "2026-07", end: "2027-12" },
    targetSkills: ["Social Media Marketing", "Content Creation", "Copywriting"],
    compensation: "$18/hour",
    postedDate: "2026-03-25",
    status: "draft",
    applicantCount: 0,
  },
];

export const introductions: Introduction[] = [
  {
    id: "i1",
    studentId: "s1",
    studentName: "Emma Richardson",
    employerId: "e1",
    employerContactName: "Mark Stevens",
    company: "TechVista Solutions",
    jobId: "j1",
    jobTitle: "Business Analyst",
    facultyName: "Prof. David Anderson",
    facultyNote: "Emma is one of our top Business Management students. Her internship experience and analytical skills make her an excellent fit for this role.",
    status: "accepted",
    dateInitiated: "2026-03-20",
  },
  {
    id: "i2",
    studentId: "s2",
    studentName: "James Nakamura",
    employerId: "e4",
    employerContactName: "Robert Taylor",
    company: "Deloitte",
    jobId: "j6",
    jobTitle: "Audit Associate",
    facultyName: "Prof. Jennifer Liu",
    facultyNote: "James has been exceptional in our Auditing and Advanced Accounting courses. His Deloitte internship experience gives him a head start.",
    status: "completed",
    dateInitiated: "2026-03-10",
  },
  {
    id: "i3",
    studentId: "s5",
    studentName: "Rachel Okonkwo",
    employerId: "e1",
    employerContactName: "Mark Stevens",
    company: "TechVista Solutions",
    jobId: "j4",
    jobTitle: "Operations Associate",
    facultyName: "Prof. David Anderson",
    facultyNote: "Rachel's supply chain expertise and leadership skills would be a great asset to your operations team.",
    status: "pending",
    dateInitiated: "2026-03-28",
  },
  {
    id: "i4",
    studentId: "s3",
    studentName: "Sofia Martinez",
    employerId: "e3",
    employerContactName: "Sarah Williams",
    company: "Pinnacle Marketing Group",
    jobId: "j5",
    jobTitle: "Digital Marketing Specialist",
    facultyName: "Prof. Michael Brown",
    facultyNote: "Sofia has demonstrated strong digital marketing skills and creativity in her coursework. I believe she would thrive in your agency environment.",
    status: "pending",
    dateInitiated: "2026-03-27",
  },
  {
    id: "i5",
    studentId: "s8",
    studentName: "Andrew Patel",
    employerId: "e2",
    employerContactName: "Lisa Chen",
    company: "Mountain West Financial",
    jobId: "j7",
    jobTitle: "Wealth Management Associate",
    facultyName: "Prof. Jennifer Liu",
    facultyNote: "Andrew's investment banking experience at Goldman Sachs and strong analytical skills make him an ideal candidate.",
    status: "accepted",
    dateInitiated: "2026-03-15",
  },
  {
    id: "i6",
    studentId: "s4",
    studentName: "Tyler Jensen",
    employerId: "e2",
    employerContactName: "Lisa Chen",
    company: "Mountain West Financial",
    jobId: "j3",
    jobTitle: "Financial Analyst Intern",
    facultyName: "Prof. Jennifer Liu",
    facultyNote: "Tyler is eager to gain practical finance experience. Despite limited work history, his coursework in financial modeling has been strong.",
    status: "declined",
    dateInitiated: "2026-03-08",
  },
];

export const applications: Application[] = [
  { id: "a1", studentId: "s1", studentName: "Emma Richardson", jobId: "j1", jobTitle: "Business Analyst", company: "TechVista Solutions", status: "interview", dateApplied: "2026-03-18" },
  { id: "a2", studentId: "s1", studentName: "Emma Richardson", jobId: "j4", jobTitle: "Operations Associate", company: "TechVista Solutions", status: "submitted", dateApplied: "2026-03-25" },
  { id: "a3", studentId: "s2", studentName: "James Nakamura", jobId: "j6", jobTitle: "Audit Associate", company: "Deloitte", status: "offered", dateApplied: "2026-03-08" },
  { id: "a4", studentId: "s3", studentName: "Sofia Martinez", jobId: "j5", jobTitle: "Digital Marketing Specialist", company: "Pinnacle Marketing Group", status: "under_review", dateApplied: "2026-03-22" },
  { id: "a5", studentId: "s3", studentName: "Sofia Martinez", jobId: "j2", jobTitle: "Marketing Coordinator", company: "TechVista Solutions", status: "submitted", dateApplied: "2026-03-26" },
  { id: "a6", studentId: "s5", studentName: "Rachel Okonkwo", jobId: "j4", jobTitle: "Operations Associate", company: "TechVista Solutions", status: "interview", dateApplied: "2026-03-24" },
  { id: "a7", studentId: "s5", studentName: "Rachel Okonkwo", jobId: "j1", jobTitle: "Business Analyst", company: "TechVista Solutions", status: "submitted", dateApplied: "2026-03-26" },
  { id: "a8", studentId: "s8", studentName: "Andrew Patel", jobId: "j7", jobTitle: "Wealth Management Associate", company: "Mountain West Financial", status: "interview", dateApplied: "2026-03-14" },
  { id: "a9", studentId: "s8", studentName: "Andrew Patel", jobId: "j3", jobTitle: "Financial Analyst Intern", company: "Mountain West Financial", status: "rejected", dateApplied: "2026-03-05" },
  { id: "a10", studentId: "s4", studentName: "Tyler Jensen", jobId: "j3", jobTitle: "Financial Analyst Intern", company: "Mountain West Financial", status: "submitted", dateApplied: "2026-03-12" },
];

export const messages: Message[] = [
  {
    id: "m1",
    threadId: "t1",
    from: "Prof. David Anderson",
    fromRole: "faculty",
    to: "Emma Richardson",
    toRole: "student",
    subject: "Introduction to TechVista Solutions",
    body: "Hi Emma,\n\nI've facilitated an introduction with Mark Stevens at TechVista Solutions for the Business Analyst position. Mark is a BYU-I alum and is excited to connect with strong candidates from our program.\n\nHe'll be reaching out to you via email within the next few days. Make sure your LinkedIn profile is up to date!\n\nBest regards,\nProf. Anderson",
    date: "2026-03-20",
    read: true,
  },
  {
    id: "m2",
    threadId: "t1",
    from: "Emma Richardson",
    fromRole: "student",
    to: "Prof. David Anderson",
    toRole: "faculty",
    subject: "Re: Introduction to TechVista Solutions",
    body: "Thank you so much, Professor Anderson! I really appreciate you connecting me with TechVista. I've updated my LinkedIn profile and I'm looking forward to hearing from Mark.\n\nIs there anything specific you'd recommend I prepare before the conversation?",
    date: "2026-03-20",
    read: true,
  },
  {
    id: "m3",
    threadId: "t1",
    from: "Prof. David Anderson",
    fromRole: "faculty",
    to: "Emma Richardson",
    toRole: "student",
    subject: "Re: Introduction to TechVista Solutions",
    body: "Great question! I'd suggest:\n\n1. Research TechVista's recent product launches\n2. Prepare your elevator pitch focusing on your analytics experience\n3. Have 2-3 thoughtful questions ready about the team and role\n\nYou've got this!",
    date: "2026-03-21",
    read: false,
  },
  {
    id: "m4",
    threadId: "t2",
    from: "Mark Stevens",
    fromRole: "employer",
    to: "Emma Richardson",
    toRole: "student",
    subject: "TechVista Business Analyst – Let's Connect",
    body: "Hi Emma,\n\nProf. Anderson spoke very highly of you. I'd love to set up a brief call to discuss the Business Analyst role and learn more about your experience.\n\nAre you available this Thursday or Friday for a 20-minute chat?\n\nBest,\nMark Stevens\nVP of Operations, TechVista Solutions",
    date: "2026-03-22",
    read: true,
  },
  {
    id: "m5",
    threadId: "t2",
    from: "Emma Richardson",
    fromRole: "student",
    to: "Mark Stevens",
    toRole: "employer",
    subject: "Re: TechVista Business Analyst – Let's Connect",
    body: "Hi Mark,\n\nThank you for reaching out! I'm very excited about the opportunity at TechVista.\n\nI'm available Thursday at 2pm or Friday at 10am MT. Please let me know what works best for you.\n\nLooking forward to connecting!\n\nBest,\nEmma Richardson",
    date: "2026-03-22",
    read: true,
  },
];

export const resumeFeedback: ResumeFeedback[] = [
  {
    studentId: "s1",
    overallScore: 82,
    strengths: [
      "Strong action verbs throughout experience descriptions",
      "Quantified achievements (15% delivery time reduction)",
      "Clear progression from student roles to professional internship",
      "Skills section aligns well with target roles",
    ],
    gaps: [
      "Missing technical certifications (PMP, Agile)",
      "No mention of specific software tools beyond Excel",
      "Limited evidence of cross-functional collaboration",
    ],
    suggestions: [
      "Add a professional summary section highlighting your unique value proposition",
      "Include specific project management tools (Jira, Asana, Monday.com) if you have experience",
      "Consider adding a 'Projects' section to showcase coursework or club achievements",
      "Quantify the bookstore management experience (e.g., budget managed, customer satisfaction)",
    ],
    extractedSkills: ["Project Management", "Excel", "Data Analysis", "Leadership", "Team Management", "Operations"],
    suggestedRoles: ["Business Analyst", "Operations Associate", "Project Coordinator", "Management Trainee"],
  },
  {
    studentId: "s8",
    overallScore: 91,
    strengths: [
      "Exceptional internship experience at top-tier firms",
      "Strong technical skills clearly articulated",
      "Excellent formatting and consistent structure",
      "Clear career trajectory in finance",
    ],
    gaps: [
      "Could expand on specific deal experience at Goldman Sachs",
      "No mention of leadership or extracurricular activities",
    ],
    suggestions: [
      "Add detail about the size/scope of M&A deals you worked on",
      "Include any financial modeling competition results",
      "Consider mentioning leadership roles in finance clubs or student organizations",
    ],
    extractedSkills: ["Investment Analysis", "Financial Modeling", "Bloomberg Terminal", "Valuation", "DCF Analysis", "Python", "M&A"],
    suggestedRoles: ["Investment Banking Analyst", "Wealth Management Associate", "Financial Analyst", "Equity Research Associate"],
  },
];

export const studentActivities: ActivityItem[] = [
  { id: "act1", type: "application", description: "You applied to Operations Associate at TechVista Solutions", date: "2026-03-25" },
  { id: "act2", type: "introduction", description: "Prof. Anderson introduced you to Mark Stevens at TechVista Solutions", date: "2026-03-20" },
  { id: "act3", type: "message", description: "New message from Mark Stevens at TechVista Solutions", date: "2026-03-22" },
  { id: "act4", type: "application", description: "Your Business Analyst application moved to Interview stage", date: "2026-03-22" },
  { id: "act5", type: "match", description: "3 new job matches based on your profile", date: "2026-03-20" },
  { id: "act6", type: "profile", description: "Profile completeness increased to 92%", date: "2026-03-18" },
];

// Helper to compute match percentage between a student and a job
export function computeMatchScore(student: Student, job: Job): number {
  let score = 0;
  let factors = 0;

  // Major match
  factors++;
  if (job.targetMajors.includes(student.major)) score += 1;

  // Skills overlap
  factors++;
  const skillOverlap = student.skills.filter((s) => job.targetSkills.some((ts) => s.toLowerCase().includes(ts.toLowerCase()) || ts.toLowerCase().includes(s.toLowerCase()))).length;
  score += Math.min(skillOverlap / Math.max(job.targetSkills.length, 1), 1);

  // Graduation date in range
  factors++;
  if (student.graduationDate >= job.targetGradDateRange.start && student.graduationDate <= job.targetGradDateRange.end) score += 1;

  // Employment preference match
  factors++;
  if (student.employmentPreference === job.type || student.employmentPreference === "Full-time") score += 1;

  return Math.round((score / factors) * 100);
}
