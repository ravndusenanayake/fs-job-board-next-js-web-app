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
    errorMap: () => ({ message: 'Please select a valid job type.' }),
  }),
  status: z.enum(['Published', 'Draft', 'Closed'], {
    errorMap: () => ({ message: 'Please select a valid status.' }),
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
