"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { Search, Eye, ArrowUpDown, ArrowUp, ArrowDown, Check, ChevronDown, Edit2, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import JobDetailsModal from './JobDetailsModal';
import styles from './JobsTable.module.css';

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  postedAt: string | Date;
  recruiter: {
    companyName: string;
    companyLogoColor?: string | null;
  };
  tags: string[];
  status: string;
}

interface JobsTableProps {
  data: Job[];
  stats: {
    total: number;
    published: number;
    drafts: number;
    closed: number;
  };
  totalItems: number;
  totalPages: number;
  currentPage: number;
  currentQuery: string;
  currentType: string;
  currentStatus: string;
  currentSort: string;
}

const columnHelper = createColumnHelper<Job>();

export default function JobsTable({ data, stats }: JobsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'postedAt', desc: true }]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Use actual data
  const tableData = useMemo(() => data, [data]);

  // Global Stats from Props
  const { total: totalJobs, published: publishedJobs, drafts: draftJobs, closed: closedJobs } = stats;

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Job Role',
        cell: info => {
          const job = info.row.original;
          const initial = job.recruiter?.companyName?.charAt(0) || 'C';
          const color = job.recruiter?.companyLogoColor || 'var(--primary)';
          return (
            <div className={styles.jobCell}>
              <div className={styles.jobLogo} style={{ backgroundColor: color }}>
                {initial}
              </div>
              <div>
                <div className={styles.jobTitle}>{info.getValue()}</div>
                <div className={styles.jobCompany}>{job.recruiter?.companyName}</div>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: info => info.getValue(),
        filterFn: (row, id, filterValue) => {
          if (!filterValue) return true;
          return row.getValue(id) === filterValue;
        },
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('postedAt', {
        header: 'Date Posted',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue() as string;
          let statusClass = styles.statusActive; // Published
          if (status === 'Draft') statusClass = styles.statusDraft;
          if (status === 'Closed') statusClass = styles.statusClosed;

          return (
            <span className={`${styles.statusPill} ${statusClass}`}>
              {status}
            </span>
          );
        },
        filterFn: (row, id, filterValue) => {
          if (!filterValue || filterValue === 'All Statuses') return true;
          return row.getValue(id) === filterValue;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <div className={styles.actionsContainer}>
            <button
              className={styles.actionBtn}
              onClick={() => setSelectedJob(info.row.original)}
              title="View Details"
            >
              <Eye size={18} />
            </button>
            <button
              className={`${styles.actionBtn} ${styles.editBtn}`}
              onClick={() => router.push(`/recruiter-dashboard/manage-jobs/${info.row.original.id}/edit`)}
              title="Edit Job"
            >
              <Edit2 size={18} />
            </button>
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={() => setJobToDelete(info.row.original)}
              title="Delete Job"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setTypeFilter(val);
    table.getColumn('type')?.setFilterValue(val === 'All Types' ? '' : val);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    table.getColumn('status')?.setFilterValue(status === 'All Statuses' ? '' : status);
    setIsStatusOpen(false);
  };

  const types = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship'];
  const statuses = ['All Statuses', 'Published', 'Draft', 'Closed'];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total</span>
            <span className={styles.statValue}>{totalJobs}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statLabel} ${styles.statLabelPublished}`}>Published</span>
            <span className={styles.statValue}>{publishedJobs}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statLabel} ${styles.statLabelDrafts}`}>Drafts</span>
            <span className={styles.statValue}>{draftJobs}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statLabel} ${styles.statLabelClosed}`}>Closed</span>
            <span className={styles.statValue}>{closedJobs}</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Search by title, company, location..."
                className={styles.searchInput}
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
              />
            </div>

            {/* Custom Status Dropdown */}
            <div className={styles.customDropdown} ref={statusRef}>
              <button
                className={styles.filterSelect}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                style={{ minWidth: '140px', textAlign: 'left', position: 'relative' }}
              >
                {statusFilter}
              </button>

              {isStatusOpen && (
                <div className={styles.dropdownMenu}>
                  {statuses.map(s => (
                    <div
                      key={s}
                      className={`${styles.dropdownItem} ${statusFilter === s ? styles.dropdownItemActive : ''}`}
                      onClick={() => handleStatusChange(s)}
                    >
                      {statusFilter === s && <Check size={14} />}
                      <span style={{ marginLeft: statusFilter === s ? 0 : '1.3rem' }}>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select
              className={styles.filterSelect}
              value={typeFilter}
              onChange={handleTypeChange}
              style={{ minWidth: '120px' }}
            >
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.showingText}>
          Showing <strong>{table.getRowModel().rows.length}</strong> of <strong>{tableData.length}</strong> jobs
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? styles.sortableHeader
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ArrowUp size={14} />,
                              desc: <ArrowDown size={14} />,
                            }[header.column.getIsSorted() as string] ?? (
                                header.column.getCanSort() ? <ArrowUpDown size={14} className={styles.sortPlaceholder} /> : null
                              )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className={styles.noResults}>
                    No jobs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {table.getPageCount() > 1 && (
          <div className={styles.pagination}>
            <div className={styles.pageInfo}>
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
              <strong>{table.getPageCount()}</strong>
            </div>
            <div className={styles.pageControls}>
              <button
                className={styles.pageBtn}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <button
                className={styles.pageBtn}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>


      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <div className={styles.confirmHeader}>
              <div className={styles.warningIcon}>
                <AlertTriangle size={24} />
              </div>
              <h3>Delete Job Posting?</h3>
            </div>
            <p className={styles.confirmText}>
              Are you sure you want to delete <strong>{jobToDelete.title}</strong>? 
              This action cannot be undone and all associated applications will be permanently removed.
            </p>
            <div className={styles.confirmActions}>
              <button 
                className={styles.cancelBtn} 
                onClick={() => setJobToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmDeleteBtn} 
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    const res = await fetch(`/api/jobs/${jobToDelete.id}`, { method: 'DELETE' });
                    if (res.ok) {
                      router.refresh();
                      setJobToDelete(null);
                    } else {
                      alert('Failed to delete job. Please try again.');
                    }
                  } catch (error) {
                    console.error('Delete error:', error);
                    alert('An error occurred. Please try again.');
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    Deleting...
                  </>
                ) : 'Delete Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
