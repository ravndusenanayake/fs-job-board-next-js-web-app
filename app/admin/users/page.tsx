import prisma from '@/lib/prisma';
import UsersTable from './UsersTable';

export const metadata = {
  title: 'Global User Management | Super Admin',
};

export default async function AdminUsersPage() {
  // Fetch all users ordered by newest first
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Global Users</h2>
          <p className="text-slate-500 font-medium mt-2 max-w-md">
            Manage permissions, roles, and platform access for all registered members across the system.
          </p>
        </div>
        <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-50">
           <div className="text-center px-4 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Members</p>
              <p className="text-2xl font-black text-indigo-600 leading-tight">{users.length}</p>
           </div>
           <div className="text-center px-4 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Flagged / Banned</p>
              <p className="text-2xl font-black text-rose-500 leading-tight">{users.filter(u => u.isBanned).length}</p>
           </div>
           <div className="text-center px-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">New This Week</p>
              <p className="text-2xl font-black text-emerald-500 leading-tight">
                 {users.filter(u => {
                   const oneWeekAgo = new Date();
                   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                   return new Date(u.createdAt) > oneWeekAgo;
                 }).length}
              </p>
           </div>
        </div>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
