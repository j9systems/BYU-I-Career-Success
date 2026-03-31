import Link from "next/link";
import { GraduationCap, Users, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(217,71%,25%)] to-[hsl(217,71%,15%)] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">BYU-I Career Success</h1>
          <p className="text-xl text-blue-200">
            Business Department Career Management Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/student/dashboard"
            className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <GraduationCap className="w-8 h-8 text-[hsl(217,71%,25%)]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Portal</h2>
            <p className="text-gray-500 text-sm">
              Manage your profile, browse jobs, and track applications
            </p>
          </Link>

          <Link
            href="/faculty/dashboard"
            className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Users className="w-8 h-8 text-[hsl(217,71%,25%)]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Faculty Portal</h2>
            <p className="text-gray-500 text-sm">
              Monitor students, facilitate introductions, and connect with employers
            </p>
          </Link>

          <Link
            href="/employer/dashboard"
            className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Building2 className="w-8 h-8 text-[hsl(217,71%,25%)]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Employer Portal</h2>
            <p className="text-gray-500 text-sm">
              Post jobs, browse students, and manage introductions
            </p>
          </Link>
        </div>

        <p className="mt-8 text-blue-300 text-sm">Prototype — Mock Data Only</p>
      </div>
    </div>
  );
}
