"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  LogOut,
  Settings,
  ChevronRight,
  Bell,
  Activity
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Recruiters', href: '/admin/recruiters', icon: Users },
  { label: 'Job Moderation', href: '/admin/jobs', icon: Briefcase },
  { label: 'System Logs', href: '/admin/logs', icon: Activity },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0F172A] text-slate-300 flex flex-col fixed left-0 top-0 z-20 border-r border-slate-800 shadow-2xl">
      {/* Brand Header */}
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-500/20 shadow-xl">
             <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-white font-black text-xl tracking-tighter leading-tight">SUPER<span className="text-indigo-400">ADMIN</span></h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Control Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Core Platform</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                  : 'hover:bg-slate-800/50 hover:text-white'
                }
              `}
            >
              <Icon size={20} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'} />
              <span className="text-sm font-semibold">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-800/40 rounded-2xl p-4 mb-4 border border-slate-700/50">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                M
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Main Server</p>
                <div className="flex items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <p className="text-[10px] text-slate-500 font-bold">STABLE</p>
                </div>
              </div>
           </div>
           <button className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors">
              <Bell size={12} />
              NOTIFICATIONS
           </button>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-bold uppercase tracking-tight">Return to Site</span>
        </button>
      </div>
    </aside>
  );
}
