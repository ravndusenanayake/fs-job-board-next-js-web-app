"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Tag,
  FileText,
  Loader2,
  X,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import styles from "./PostJobForm.module.css";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  id?: string;
  title: string;
  location: string;
  type: string;
  status: "Published" | "Draft" | "Closed";
  salaryRange: string;
  tags: string[];
  description: string;
}

interface FormErrors {
  title?: string;
  location?: string;
  type?: string;
  status?: string;
  salaryRange?: string;
  tags?: string;
  description?: string;
  _global?: string;
}

const INITIAL_FORM: FormData = {
  title: "",
  location: "",
  type: "",
  status: "Published",
  salaryRange: "",
  tags: [],
  description: "",
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

// ─── Client-side Validation ─────────────────────────────────────────────────
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Job title is required.";
  } else if (data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  } else if (data.title.trim().length > 100) {
    errors.title = "Title must be 100 characters or fewer.";
  }

  if (!data.location.trim()) {
    errors.location = "Location is required.";
  } else if (data.location.trim().length < 2) {
    errors.location = "Location must be at least 2 characters.";
  }

  if (!data.type) {
    errors.type = "Please select a job type.";
  }

  if (data.tags.length === 0) {
    errors.tags = "At least one skill or tag is required.";
  }

  if (!data.description.trim()) {
    errors.description = "Job description is required.";
  } else if (data.description.trim().length < 50) {
    errors.description = `Description must be at least 50 characters (${data.description.trim().length}/50).`;
  } else if (data.description.trim().length > 5000) {
    errors.description = "Description must be 5000 characters or fewer.";
  }

  return errors;
}

// ─── Component ──────────────────────────────────────────────────────────────
interface PostJobFormProps {
  initialData?: FormData;
  isEdit?: boolean;
}

export default function PostJobForm({ initialData, isEdit = false }: PostJobFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialData || INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStatusChange = (status: "Published" | "Draft" | "Closed") => {
    setForm((prev) => ({ ...prev, status }));
  };

  const commitTag = () => {
    const value = tagInput.trim().replace(/,+$/, "").trim();
    if (!value) { setTagInput(""); return; }
    if (value.length > 30) { return; } // silently ignore too-long tags
    if (form.tags.length >= 10) return;
    if (form.tags.map(t => t.toLowerCase()).includes(value.toLowerCase())) {
      setTagInput("");
      return;
    }
    const newTags = [...form.tags, value];
    setForm((prev) => ({ ...prev, tags: newTags }));
    setTagInput("");
    if (errors.tags) setErrors((prev) => ({ ...prev, tags: undefined }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitTag();
    } else if (e.key === "Backspace" && !tagInput && form.tags.length > 0) {
      const newTags = form.tags.slice(0, -1);
      setForm((prev) => ({ ...prev, tags: newTags }));
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Commit any pending tag text
    const pendingTag = tagInput.trim();
    let finalTags = form.tags;
    if (pendingTag) {
      finalTags = [...form.tags, pendingTag];
      setForm((prev) => ({ ...prev, tags: finalTags }));
      setTagInput("");
    }

    const dataToValidate = { ...form, tags: finalTags };
    const clientErrors = validateForm(dataToValidate);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      // Scroll to first error
      const firstErrorField = document.querySelector("[data-field-error]");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const url = isEdit ? `/api/jobs/${form.id}` : "/api/jobs";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToValidate),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          // Map Zod field errors back to our error state
          const mapped: FormErrors = {};
          for (const [field, messages] of Object.entries(data.errors)) {
            mapped[field as keyof FormErrors] = (messages as string[])[0];
          }
          setErrors(mapped);
        } else {
          setErrors({ _global: data.message || "Something went wrong. Please try again." });
        }
        return;
      }

      // Success → redirect with success flag
      router.push(`/recruiter-dashboard/manage-jobs?success=${isEdit ? 'updated' : '1'}`);
      router.refresh();
    } catch {
      setErrors({ _global: "A network error occurred. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Derived ──────────────────────────────────────────────────────────────
  const descLen = form.description.length;
  const titleLen = form.title.length;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Global Error Banner */}
      {errors._global && (
        <div className={styles.errorBanner} role="alert">
          <AlertCircle size={18} />
          <span>{errors._global}</span>
        </div>
      )}

      <div className={styles.formCard}>
        {/* ── Section 1: Basic Info ──────────────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Briefcase size={16} />
            </div>
            <div>
              <div className={styles.sectionTitle}>Basic Information</div>
              <div className={styles.sectionSubtitle}>Core details that define the position</div>
            </div>
          </div>

          <div className={`${styles.formGrid} ${styles.formGrid2}`}>
            {/* Title */}
            <div className={`${styles.field} ${styles.fullWidth}`} data-field-error={errors.title || undefined}>
              <label className={styles.label} htmlFor="job-title">
                Job Title <span className={styles.required}>*</span>
              </label>
              <input
                id="job-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                autoFocus
                maxLength={100}
              />
              <div className={styles.fieldFooter}>
                {errors.title ? (
                  <span className={styles.errorMessage}>
                    <AlertCircle size={13} /> {errors.title}
                  </span>
                ) : (
                  <span className={styles.helperText}>Be specific to attract the right candidates.</span>
                )}
                <span className={`${styles.charCount} ${titleLen > 90 ? styles.charCountWarn : ""}`}>
                  {titleLen}/100
                </span>
              </div>
            </div>

            {/* Location */}
            <div className={styles.field} data-field-error={errors.location || undefined}>
              <label className={styles.label} htmlFor="job-location">
                Location <span className={styles.required}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <MapPin
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  id="job-location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Colombo, Sri Lanka"
                  className={`${styles.input} ${errors.location ? styles.inputError : ""}`}
                  style={{ paddingLeft: "2.25rem" }}
                />
              </div>
              {errors.location && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={13} /> {errors.location}
                </span>
              )}
            </div>

            {/* Job Type */}
            <div className={styles.field} data-field-error={errors.type || undefined}>
              <label className={styles.label} htmlFor="job-type">
                Job Type <span className={styles.required}>*</span>
              </label>
              <select
                id="job-type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`${styles.select} ${errors.type ? styles.selectError : ""}`}
              >
                <option value="">Select a type…</option>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.type && (
                <span className={styles.errorMessage}>
                  <AlertCircle size={13} /> {errors.type}
                </span>
              )}
            </div>

            {/* Salary Range */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="job-salary">
                Salary Range{" "}
                <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id="job-salary"
                name="salaryRange"
                type="text"
                value={form.salaryRange}
                onChange={handleChange}
                placeholder="e.g. $60,000 – $80,000 / year"
                className={styles.input}
                maxLength={50}
              />
              <span className={styles.helperText}>Listings with salary ranges get more applications.</span>
            </div>
          </div>
        </div>

        {/* ── Section 2: Tags / Skills ──────────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Tag size={16} />
            </div>
            <div>
              <div className={styles.sectionTitle}>Skills & Tags</div>
              <div className={styles.sectionSubtitle}>
                Press Enter or comma to add a tag
              </div>
            </div>
          </div>

          <div className={styles.field} data-field-error={errors.tags || undefined}>
            <label className={styles.label}>
              Skills / Technologies <span className={styles.required}>*</span>
            </label>
            <div
              className={`${styles.tagInputWrapper} ${errors.tags ? styles.tagInputWrapperError : ""}`}
              onClick={() => tagInputRef.current?.focus()}
            >
              {form.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    className={styles.tagRemove}
                    onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                    aria-label={`Remove ${tag}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <input
                ref={tagInputRef}
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={commitTag}
                placeholder={form.tags.length === 0 ? "e.g. React, Node.js, TypeScript…" : ""}
                className={styles.tagInput}
                disabled={form.tags.length >= 10}
              />
            </div>
            <div className={styles.fieldFooter}>
              {errors.tags ? (
                <span className={styles.errorMessage}>
                  <AlertCircle size={13} /> {errors.tags}
                </span>
              ) : (
                <span className={styles.helperText}>Add relevant skills and technologies (max 10).</span>
              )}
              <span className={`${styles.charCount} ${form.tags.length >= 10 ? styles.charCountWarn : ""}`}>
                {form.tags.length}/10
              </span>
            </div>
          </div>
        </div>

        {/* ── Section 3: Description ────────────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FileText size={16} />
            </div>
            <div>
              <div className={styles.sectionTitle}>Job Description</div>
              <div className={styles.sectionSubtitle}>
                Describe responsibilities, requirements, and benefits
              </div>
            </div>
          </div>

          <div className={styles.field} data-field-error={errors.description || undefined}>
            <label className={styles.label} htmlFor="job-description">
              Description <span className={styles.required}>*</span>
            </label>
            <textarea
              id="job-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={
                "Describe the role in detail:\n\n• What will the candidate do day-to-day?\n• What skills and experience are required?\n• What does your company offer? (benefits, culture, perks)"
              }
              className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              rows={10}
              maxLength={5000}
            />
            <div className={styles.fieldFooter}>
              {errors.description ? (
                <span className={styles.errorMessage}>
                  <AlertCircle size={13} /> {errors.description}
                </span>
              ) : (
                <span className={styles.helperText}>Minimum 50 characters. Be thorough to attract quality candidates.</span>
              )}
              <span className={`${styles.charCount} ${
                descLen > 0 && descLen < 50 ? styles.charCountWarn : 
                descLen > 4500 ? styles.charCountWarn : ""
              }`}>
                {descLen > 0 && descLen < 50 ? `${descLen}/50 min` : `${descLen}/5000`}
              </span>
            </div>
          </div>
        </div>

        {/* ── Section 4: Status ─────────────────────────────────────── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <ChevronRight size={16} />
            </div>
            <div>
              <div className={styles.sectionTitle}>Publication Status</div>
              <div className={styles.sectionSubtitle}>Choose whether to publish immediately or save as a draft</div>
            </div>
          </div>

          <div className={styles.statusGroup}>
            <button
              type="button"
              className={`${styles.statusOption} ${form.status === "Published" ? styles.statusOptionActive : ""}`}
              onClick={() => handleStatusChange("Published")}
            >
              <div className={styles.statusOptionLabel}>
                <span className={`${styles.statusDot} ${styles.dotPublished}`} />
                Publish Now
              </div>
              <div className={styles.statusOptionDesc}>
                Immediately visible to all job seekers
              </div>
            </button>
            <button
              type="button"
              className={`${styles.statusOption} ${form.status === "Draft" ? styles.statusOptionActive : ""}`}
              onClick={() => handleStatusChange("Draft")}
            >
              <div className={styles.statusOptionLabel}>
                <span className={`${styles.statusDot} ${styles.dotDraft}`} />
                Save as Draft
              </div>
              <div className={styles.statusOptionDesc}>
                Hidden from public — you can publish later
              </div>
            </button>
            <button
              type="button"
              className={`${styles.statusOption} ${form.status === "Closed" ? styles.statusOptionActive : ""}`}
              onClick={() => handleStatusChange("Closed")}
            >
              <div className={styles.statusOptionLabel}>
                <span className={`${styles.statusDot} ${styles.dotClosed}`} />
                Closed
              </div>
              <div className={styles.statusOptionDesc}>
                Job is no longer accepting applications
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer / Actions ─────────────────────────────────────── */}
      <div className={styles.formFooter}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => router.push("/recruiter-dashboard/manage-jobs")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          id="submit-post-job"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className={styles.submitBtnSpinner} />
              {isEdit ? "Updating…" : "Posting…"}
            </>
          ) : (
            <>
              {isEdit ? "Update Job" : (form.status === "Draft" ? "Save as Draft" : "Post Job")}
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
