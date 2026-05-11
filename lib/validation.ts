import { z } from 'zod';

export const PostJobSchema = z.object({
  title: z
    .string({ message: 'Job title is required.' })
    .min(3, 'Title must be at least 3 characters.')
    .max(100, 'Title must be 100 characters or fewer.'),
  location: z
    .string({ message: 'Location is required.' })
    .min(2, 'Location must be at least 2 characters.'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
    message: 'Please select a valid job type.',
  }),
  status: z.enum(['Published', 'Draft', 'Closed'], {
    message: 'Please select a valid status.',
  }),
  salaryRange: z.string().max(50, 'Salary range is too long.').optional().or(z.literal('')),
  tags: z
    .array(z.string().trim().min(1, 'Tags cannot be empty.').max(30, 'Each tag must be 30 characters or fewer.'))
    .min(1, 'At least one skill/tag is required.')
    .max(10, 'Maximum 10 tags allowed.'),
  description: z
    .string({ message: 'Description is required.' })
    .trim()
    .min(50, 'Description must be at least 50 characters.')
    .max(5000, 'Description must be 5000 characters or fewer.'),
});

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["USER", "RECRUITER"], {
    message: "Please select a valid role.",
  }),
});
