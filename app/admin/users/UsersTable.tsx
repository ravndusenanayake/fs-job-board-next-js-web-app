"use client";

import { useState } from 'react';
import { 
  User, 
  Mail, 
  ShieldAlert, 
  ShieldCheck, 
  Trash2, 
  Search,
  MoreVertical,
  Calendar,
  Lock,
  Unlock
} from 'lucide-react';
import { toggleBanUser, deleteUser, changeUserRole } from './actions';
import { Role } from '@prisma/client';

export default function UsersTable({ users }: { users: any[] }) {
  const [localUsers, setLocalUsers] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = localUsers.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleBan = async (id: string, isBanned: boolean) => {
    setLoadingId(id);
    try {
      await toggleBanUser(id, isBanned);
      setLocalUsers(prev => prev.map(u => u.id === id ? { ...u, isBanned: !isBanned } : u));
    } catch (error) {
      alert('Action failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setLoadingId(id);
    try {
      await deleteUser(id);
      setLocalUsers(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      alert('Action failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (id: string, currentRole: Role) => {
    const roles: Role[] = [Role.STUDENT, Role.RECRUITER, Role.ADMIN];
    const nextRole = roles[(roles.indexOf(currentRole) + 1) % roles.length];
    
    if (!confirm(`Change role from ${currentRole} to ${nextRole}?`)) return;
    
    setLoadingId(id);
    try {
      await changeUserRole(id, nextRole);
      setLocalUsers(prev => prev.map(u => u.id === id ? { ...u, role: nextRole } : u));
    } catch (error) {
      alert('Action failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Search & Filter Header */}
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
            />
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Users</span>
            </div>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">User Identity</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Role / Access</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Account Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Registration</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr key={user.id} className={`group hover:bg-slate-50/80 transition-all duration-300 ${user.isBanned ? 'bg-red-50/20' : ''}`}>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm border ${
                      user.role === Role.ADMIN ? 'bg-indigo-600 text-white border-indigo-500' : 
                      user.role === Role.RECRUITER ? 'bg-purple-100 text-purple-600 border-purple-100' :
                      'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-tight">
                        {user.name || "Anonymous User"}
                        {user.id === 'current-user-id' && <span className="ml-2 text-[9px] bg-slate-100 px-1.5 py-0.5 rounded uppercase">You</span>}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mt-1">
                        <Mail size={12} className="opacity-60" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <button 
                    onClick={() => handleRoleChange(user.id, user.role)}
                    disabled={loadingId === user.id}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                      user.role === Role.ADMIN ? 'bg-indigo-100 text-indigo-700' :
                      user.role === Role.RECRUITER ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ShieldCheck size={12} />
                    {user.role}
                  </button>
                </td>
                <td className="px-8 py-6">
                  {user.isBanned ? (
                    <span className="inline-flex items-center gap-1.5 text-rose-600 text-[10px] font-black uppercase tracking-widest bg-rose-50 px-2.5 py-1.5 rounded-full">
                      <Lock size={12} />
                      Banned / Restricted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2.5 py-1.5 rounded-full">
                      <Unlock size={12} />
                      Active / Verified
                    </span>
                  )}
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={14} className="opacity-40" />
                      <span className="text-xs font-bold">{new Date(user.createdAt).toLocaleDateString()}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter mt-1">Global ID: {user.id.slice(0, 8)}...</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleToggleBan(user.id, user.isBanned)}
                      disabled={loadingId === user.id}
                      className={`p-2.5 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 ${
                        user.isBanned 
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white' 
                        : 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white'
                      }`}
                      title={user.isBanned ? "Unban User" : "Ban User"}
                    >
                      {user.isBanned ? <Unlock size={18} strokeWidth={2.5} /> : <Lock size={18} strokeWidth={2.5} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      disabled={loadingId === user.id}
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                      title="Delete User"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center bg-slate-50/50">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
               <User className="text-slate-300" size={40} />
            </div>
            <h4 className="text-lg font-black text-slate-800">No users matched your search</h4>
            <p className="text-sm text-slate-500 font-medium mt-1">Clear the search bar or try a different term.</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-100">
         <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Integrity Verified</p>
            <div className="flex gap-2">
               <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
               <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
         </div>
      </div>
    </div>
  );
}
