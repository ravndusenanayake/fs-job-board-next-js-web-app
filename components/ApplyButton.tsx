"use client";

import React, { useState } from "react";
import ApplyModal from "./ApplyModal";

interface ApplyButtonProps {
  jobId: string;
  jobTitle: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ApplyButton({ jobId, jobTitle, className = "btn-primary", children = "Apply Now" }: ApplyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setIsModalOpen(true)}>
        {children}
      </button>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        jobId={jobId} 
        jobTitle={jobTitle} 
      />
    </>
  );
}
