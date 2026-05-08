"use client";

import { useState } from 'react';
import { 
  EyeOff, 
  Trash2, 
  ExternalLink,
  MapPin,
  Clock,
  Eye,
  Briefcase,
  Search,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { unpublishJob, deleteJob, publishJob } from './actions';
import Link from 'next/link';

export default function JobsTable({ jobs }: { jobs: any[] }) {
  const [localJobs, setLocalJobs] = useState(jobs);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = localJobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.recruiter.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (id: string, action: 'unpublish' | 'delete' | 'publish') => {
    setLoadingId(id);
    try {
      if (action === 'unpublish') {
        await unpublishJob(id);
        setLocalJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Draft' } : j));
      } else if (action === 'publish') {
        await publishJob(id);
        setLocalJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Published' } : j));
      } else if (action === 'delete') {
        if (confirm('Are you sure you want to delete this job posting permanently?')) {
          await deleteJob(id);
          setLocalJobs(prev => prev.filter(j => j.id !== id));
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
      {/* Search Header */}
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by job title, company or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
            />
         </div>
         <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden">
                    {i}
                 </div>
               ))}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Active Moderators</p>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Opportunity Details</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Origin / Recruiter</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Visibility Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Timeline</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Moderation Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="group hover:bg-emerald-50/20 transition-all duration-300">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform duration-300">
                      <Briefcase size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <Link href={`/jobs/${job.id}`} target="_blank" className="text-sm font-black text-slate-800 hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
                        {job.title}
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                      </Link>
                      <div className="flex items-center gap-3 mt-1.5">
                         <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                            <MapPin size={12} className="text-slate-300" />
                            {job.location}
                         </span>
                         <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                            <Clock size={12} className="text-slate-300" />
                            {job.type}
                         </span>
                         {job.salaryRange && (
                           <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-500">
                              <DollarSign size={10} />
                              {job.salaryRange}
                           </span>
                         )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm">
                    <p className="font-black text-slate-800 tracking-tight">{job.recruiter.companyName}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase">{job.recruiter.name}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center justify-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      job.status === 'Published' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${job.status === 'Published' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      {job.status}
                    </span>
                    {job.status !== 'Published' && <p className="text-[9px] font-bold text-amber-600 ml-1 tracking-tight">PRIVATE DRAFT</p>}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-xs font-black text-slate-500">{new Date(job.postedAt).toLocaleDateString()}</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter mt-0.5">Live On Site</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2">
                    {job.status === 'Published' ? (
                      <button 
                        onClick={() => handleAction(job.id, 'unpublish')}
                        disabled={loadingId === job.id}
                        className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        title="Unpublish Posting"
                      >
                        <EyeOff size={20} strokeWidth={2.5} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleAction(job.id, 'publish')}
                        disabled={loadingId === job.id}
                        className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        title="Re-publish Posting"
                      >
                        <Eye size={20} strokeWidth={2.5} />
                      </button>
                    )}
                    <div className="w-px h-6 bg-slate-100 mx-1" />
                    <button 
                      onClick={() => handleAction(job.id, 'delete')}
                      disabled={loadingId === job.id}
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                      title="Hard Delete"
                    >
                      <Trash2 size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredJobs.length === 0 && (
          <div className="p-20 text-center bg-slate-50/50">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
               <AlertCircle className="text-slate-300" size={40} />
            </div>
            <h4 className="text-lg font-black text-slate-800">No job postings found</h4>
            <p className="text-sm text-slate-500 font-medium mt-1">Try another search term or check filters.</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
         <p className="text-xs font-black text-slate-400">Moderating {filteredJobs.length} active opportunities</p>
         <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
            DOWNLOAD REPORT (.CSV)
         </button>
      </div>
    </div>
  );
}
