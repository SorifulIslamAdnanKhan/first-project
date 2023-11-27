import { TStudent } from './student.interface';
import { Student } from '../student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exist!');
  }

  const result = await Student.create(studentData); // mongose built in ststic method

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exist!');
  // }

  // const result = await student.save(); // mongose built in instance method
  return result;
};

const getAllStudentsFrmDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFrmDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentsFrmDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFrmDB,
  getSingleStudentsFrmDB,
  deleteStudentsFrmDB,
};
