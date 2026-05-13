import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar - Fixed to Left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top Navigation / Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold text-gray-800 tracking-tight">Super Admin Portal</h1>
             <span className="hidden md:inline px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded tracking-wider">Production</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-xs font-bold text-gray-800">Master Admin</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">System Root</p>
               </div>
               <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-indigo-200 shadow-lg">
                  A
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Region */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
          <footer className="px-8 py-6 text-center text-xs text-gray-400 border-t border-gray-100">
             &copy; 2026 FS Job Board Management System • Internal Use Only
          </footer>
        </main>
      </div>
    </div>
  );
}
