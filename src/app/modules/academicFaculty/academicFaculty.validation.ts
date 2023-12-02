import { z } from 'zod';

const academicFacultyvalidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty must be a string',
  }),
});

export const AcademicFacultyvalidation = {
  academicFacultyvalidationSchema,
};
