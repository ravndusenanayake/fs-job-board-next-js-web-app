"use client";

import { useState } from "react";
import { signUp } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Briefcase, ChevronRight, Loader2, Building } from "lucide-react";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("USER");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const result = await signUp(values);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess("Account created successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary-light)] text-[var(--primary)] mb-4">
            <Briefcase size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-gray-500">
            Join our community of professionals
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-all border-gray-200 has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--primary-light)]/50 has-[:checked]:ring-1 has-[:checked]:ring-[var(--primary)]">
                  <input
                    type="radio"
                    name="role"
                    value="USER"
                    className="sr-only"
                    checked={selectedRole === "USER"}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <span className="text-sm font-medium text-gray-900">Job Seeker</span>
                </label>
                <label className="relative flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-all border-gray-200 has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--primary-light)]/50 has-[:checked]:ring-1 has-[:checked]:ring-[var(--primary)]">
                  <input
                    type="radio"
                    name="role"
                    value="RECRUITER"
                    className="sr-only"
                    checked={selectedRole === "RECRUITER"}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <span className="text-sm font-medium text-gray-900">Recruiter</span>
                </label>
              </div>
            </div>

            {/* Company Name Field (Conditional) */}
            {selectedRole === "RECRUITER" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Building size={18} />
                  </div>
                  <input
                    name="companyName"
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                    placeholder="Tech Corp"
                  />
                </div>
              </div>
            )}

          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm rounded-xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[var(--primary)]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] border-none"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Create Account
                <ChevronRight size={18} />
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
