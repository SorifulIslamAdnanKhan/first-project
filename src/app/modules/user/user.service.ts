import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object

  const userData: Partial<TUser> = {};

  // if password is not given, use default password

  userData.password = password || (config.default_password as string);

  // set student role

  userData.role = 'student';

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // check admissionSemester exist or not
    if (!admissionSemester) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Admission Semester is not found!',
      );
    }

    // set generated id

    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction 1)

    const newUser = await User.create([userData], { session }); // array

    // create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user!');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // referrance _id

    // create a student (transaction 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const UserService = {
  createStudentIntoDB,
};
