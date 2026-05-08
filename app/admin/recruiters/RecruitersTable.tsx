"use client";

import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Mail,
  Building,
  User,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react';
import { approveRecruiter, rejectRecruiter, deleteRecruiter } from './actions';

export default function RecruitersTable({ recruiters }: { recruiters: any[] }) {
  const [localRecruiters, setLocalRecruiters] = useState(recruiters);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecruiters = localRecruiters.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (id: string, action: 'approve' | 'reject' | 'delete') => {
    setLoadingId(id);
    try {
      if (action === 'approve') {
        await approveRecruiter(id);
        setLocalRecruiters(prev => prev.map(r => r.id === id ? { ...r, isVerified: true, verificationStatus: 'Approved' } : r));
      } else if (action === 'reject') {
        await rejectRecruiter(id);
        setLocalRecruiters(prev => prev.map(r => r.id === id ? { ...r, isVerified: false, verificationStatus: 'Rejected' } : r));
      } else if (action === 'delete') {
        if (confirm('Are you sure you want to delete this recruiter? This will also delete all their job postings.')) {
          await deleteRecruiter(id);
          setLocalRecruiters(prev => prev.filter(r => r.id !== id));
        }
      }
    } catch (error) {
      alert('Action failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, company or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
            />
         </div>
         <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Filter Status:</span>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 focus:outline-none">
               <option>All Recruiters</option>
               <option>Pending</option>
               <option>Approved</option>
               <option>Rejected</option>
            </select>
         </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Profile</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Verification Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-center">Jobs Posted</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Member Since</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredRecruiters.map((recruiter) => (
              <tr key={recruiter.id} className="group hover:bg-indigo-50/30 transition-all duration-300">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                        <Building size={24} strokeWidth={2.5} />
                      </div>
                      {recruiter.isVerified && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                           <ShieldCheck size={16} className="text-emerald-500" fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{recruiter.name}</p>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                          <Mail size={12} className="text-slate-300" />
                          <span>{recruiter.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-500/70">
                          <Building size={12} className="opacity-50" />
                          <span>{recruiter.companyName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1.5">
                    <span className={`inline-flex items-center justify-center gap-1.5 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      recruiter.verificationStatus === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      recruiter.verificationStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        recruiter.verificationStatus === 'Approved' ? 'bg-emerald-500' :
                        recruiter.verificationStatus === 'Rejected' ? 'bg-red-500' :
                        'bg-amber-500'
                      }`} />
                      {recruiter.verificationStatus}
                    </span>
                    {recruiter.isVerified && <p className="text-[9px] font-bold text-emerald-600 ml-1">✓ IDENTITY CONFIRMED</p>}
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="inline-flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-sm font-black text-slate-700 group-hover:bg-white group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all">
                    {recruiter._count.jobs}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-xs font-bold text-slate-500">{new Date(recruiter.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-[10px] font-bold text-slate-300 mt-0.5 uppercase tracking-tighter">Registered</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2">
                    {recruiter.verificationStatus !== 'Approved' && (
                      <button 
                        onClick={() => handleAction(recruiter.id, 'approve')}
                        disabled={loadingId === recruiter.id}
                        className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        title="Approve Profile"
                      >
                        <CheckCircle size={20} strokeWidth={2.5} />
                      </button>
                    )}
                    {recruiter.verificationStatus !== 'Rejected' && (
                      <button 
                        onClick={() => handleAction(recruiter.id, 'reject')}
                        disabled={loadingId === recruiter.id}
                        className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        title="Reject / Flag Profile"
                      >
                        <XCircle size={20} strokeWidth={2.5} />
                      </button>
                    )}
                    <div className="w-px h-6 bg-slate-100 mx-1" />
                    <button 
                      onClick={() => handleAction(recruiter.id, 'delete')}
                      disabled={loadingId === recruiter.id}
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                      title="Permanent Deletion"
                    >
                      <Trash2 size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRecruiters.length === 0 && (
          <div className="p-20 text-center bg-slate-50/50">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
               <User className="text-slate-300" size={40} />
            </div>
            <h4 className="text-lg font-black text-slate-800">No recruiters found</h4>
            <p className="text-sm text-slate-500 font-medium mt-1">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Table Pagination Placeholder */}
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
         <p className="text-xs font-bold text-slate-400">Showing {filteredRecruiters.length} of {localRecruiters.length} active recruiters</p>
         <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-slate-300 cursor-not-allowed">PREVIOUS</button>
            <div className="flex items-center gap-2">
               <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-xs font-black text-indigo-600">1</span>
            </div>
            <button className="text-xs font-bold text-slate-300 cursor-not-allowed">NEXT</button>
         </div>
      </div>
    </div>
  );
}
