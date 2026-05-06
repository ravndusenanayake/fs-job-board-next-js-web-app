"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CheckCircle, X } from "lucide-react";

interface SuccessBannerProps {
  message: string;
}

export default function SuccessBanner({ message }: SuccessBannerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      dismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    // Remove ?success=1 from URL cleanly without a full reload
    router.replace(pathname, { scroll: false });
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem 1.25rem",
        marginBottom: "1.5rem",
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        borderRadius: "0.625rem",
        color: "#065f46",
        fontSize: "0.9rem",
        fontWeight: 500,
      }}
    >
      <CheckCircle size={20} style={{ color: "#10b981", flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.25rem",
          borderRadius: "0.375rem",
          color: "#10b981",
          opacity: 0.7,
          transition: "opacity 0.15s",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
