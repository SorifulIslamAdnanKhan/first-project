import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
      message:
        'First name must start with a capital letter and contain only letters',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const createGurdianValidationSchema = z.object({
  fatherName: z.string().min(1).trim(),
  fatherOccupation: z.string().min(1).trim(),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1).trim(),
  motherOccupation: z.string().min(1).trim(),
  motherContactNo: z.string().min(1),
});

const createLocalGurdianValidationSchema = z.object({
  name: z.string().min(1).trim(),
  occupation: z.string().min(1).trim(),
  contactNo: z.string().min(1),
  address: z.string().min(1).trim(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
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
      gurdian: createGurdianValidationSchema,
      localGurdian: createLocalGurdianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
      message:
        'First name must start with a capital letter and contain only letters',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGurdianValidationSchema = z.object({
  fatherName: z.string().min(1).trim().optional(),
  fatherOccupation: z.string().min(1).trim().optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).trim().optional(),
  motherOccupation: z.string().min(1).trim().optional(),
  motherContactNo: z.string().min(1).optional(),
});

const updateLocalGurdianValidationSchema = z.object({
  name: z.string().min(1).trim().optional(),
  occupation: z.string().min(1).trim().optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).trim().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).trim().optional(),
      permanentAddress: z.string().min(1).trim().optional(),
      gurdian: updateGurdianValidationSchema.optional(),
      localGurdian: updateLocalGurdianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
