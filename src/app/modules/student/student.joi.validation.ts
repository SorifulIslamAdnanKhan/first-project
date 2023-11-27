import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-zA-Z]*$/)
    .messages({
      'any.required': 'First name is required',
      'string.base': 'First name must be a string',
      'string.empty': 'First name cannot be empty',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.base':
        'First name must start with a capital letter and contain only letters',
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'any.required': 'Last name is required',
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name cannot be empty',
      'string.pattern.base': 'Last name must contain only letters',
    }),
});

const gurdianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'any.required': 'Father name is required',
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name cannot be empty',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'any.required': 'Father occupation is required',
    'string.base': 'Father occupation must be a string',
    'string.empty': 'Father occupation cannot be empty',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father contact number is required',
    'string.base': 'Father contact number must be a string',
    'string.empty': 'Father contact number cannot be empty',
  }),
  motherName: Joi.string().trim().required().messages({
    'any.required': 'Mother name is required',
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name cannot be empty',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'any.required': 'Mother occupation is required',
    'string.base': 'Mother occupation must be a string',
    'string.empty': 'Mother occupation cannot be empty',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother contact number is required',
    'string.base': 'Mother contact number must be a string',
    'string.empty': 'Mother contact number cannot be empty',
  }),
});

const localGurdianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Local guardian name is required',
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name cannot be empty',
  }),
  occupation: Joi.string().trim().required().messages({
    'any.required': 'Local guardian occupation is required',
    'string.base': 'Local guardian occupation must be a string',
    'string.empty': 'Local guardian occupation cannot be empty',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
    'string.base': 'Local guardian contact number must be a string',
    'string.empty': 'Local guardian contact number cannot be empty',
  }),
  address: Joi.string().trim().required().messages({
    'any.required': 'Local guardian address is required',
    'string.base': 'Local guardian address must be a string',
    'string.empty': 'Local guardian address cannot be empty',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID cannot be empty',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Invalid gender value',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().trim().required().email().messages({
    'any.required': 'Email is required',
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number cannot be empty',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number cannot be empty',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required',
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address cannot be empty',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required',
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address cannot be empty',
  }),
  gurdian: gurdianValidationSchema.required().messages({
    'any.required': 'Guardian details are required',
  }),
  localGurdian: localGurdianValidationSchema.required().messages({
    'any.required': 'Local guardian details are required',
  }),
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
