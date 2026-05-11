import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import {
  Users,
  Briefcase,
  FileText,
  UserCheck,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalRecruiters,
    totalActiveJobs,
    totalApplications
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: Role.RECRUITER } }),
    prisma.job.count({ where: { status: 'Published' } }),
    prisma.application.count()
  ]);

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12%',
      description: 'Total registered candidates'
    },
    {
      label: 'Verified Recruiters',
      value: totalRecruiters,
      icon: UserCheck,
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      trend: '+5%',
      description: 'Approved company profiles'
    },
    {
      label: 'Active Jobs',
      value: totalActiveJobs,
      icon: Briefcase,
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      trend: '+24%',
      description: 'Live and hiring postings'
    },
    {
      label: 'Total Applications',
      value: totalApplications,
      icon: FileText,
      color: 'bg-orange-600',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: '+18%',
      description: 'Applicant submissions'
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Platform Overview</h2>
        <p className="text-slate-500 font-medium mt-1">Real-time monitoring of your recruitment ecosystem.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`${stat.lightColor} ${stat.textColor} w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    <Icon size={28} />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} />
                    {stat.trend}
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-1">{stat.value.toLocaleString()}</h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>

              {/* Decorative Background Icon */}
              <Icon className="absolute -bottom-4 -right-4 text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500" size={140} />
            </div>
          );
        })}
      </div>

      {/* Secondary Modules */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">System Infrastructure</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Connected services and database status.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
              VIEW LOGS <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Database', status: 'Optimal', color: 'emerald' },
              { label: 'Storage', status: 'Active', color: 'blue' },
              { label: 'Prisma Client', status: 'Stable', color: 'indigo' },
            ].map((svc, i) => (
              <div key={i} className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{svc.label}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${svc.color}-500 shadow-[0_0_8px_rgba(var(--${svc.color}-500))]`} />
                  <span className={`text-sm font-black text-${svc.color}-700`}>{svc.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-indigo-600 rounded-[2rem] text-white flex items-center justify-between overflow-hidden relative shadow-indigo-200 shadow-2xl">
            <div className="relative z-10">
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Upcoming Maintenance</p>
              <h4 className="text-xl font-bold">Schema Migration scheduled for May 15th</h4>
              <p className="text-indigo-100 text-xs mt-2 opacity-80 font-medium">Estimated downtime: 15 minutes during off-peak hours.</p>
            </div>
            <ShieldAlert className="text-white/10 absolute -right-4 -bottom-4" size={120} />
          </div>
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="bg-[#0F172A] p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 text-white">
          <h3 className="text-xl font-black tracking-tight mb-8">Admin Directives</h3>
          <div className="space-y-4">
            {[
              'Review 12 Pending Recruiters',
              'Moderation: 5 Flagged Jobs',
              'System: Update Privacy Policy',
              'Backup: Weekly DB Snapshot'
            ].map((act, i) => (
              <div key={i} className="group cursor-pointer flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{act}</span>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-white/5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Storage Usage</p>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[64%] bg-indigo-500 rounded-full" />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-xs font-bold text-slate-300">6.4 GB used</span>
              <span className="text-xs font-bold text-slate-500">10 GB Limit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
