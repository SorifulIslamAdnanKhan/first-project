import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
      message:
        'First name must start with a capital letter and contain only letters',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .trim()
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must contain only letters',
    }),
});

const gurdianValidationSchema = z.object({
  fatherName: z.string().min(1).trim(),
  fatherOccupation: z.string().min(1).trim(),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1).trim(),
  motherOccupation: z.string().min(1).trim(),
  motherContactNo: z.string().min(1),
});

const localGurdianValidationSchema = z.object({
  name: z.string().min(1).trim(),
  occupation: z.string().min(1).trim(),
  contactNo: z.string().min(1),
  address: z.string().min(1).trim(),
});

const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1).trim(),
  permanentAddress: z.string().min(1).trim(),
  gurdian: gurdianValidationSchema,
  localGurdian: localGurdianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
