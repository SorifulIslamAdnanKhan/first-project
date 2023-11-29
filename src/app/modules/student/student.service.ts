import { Student } from './student.model';

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
  getAllStudentsFrmDB,
  getSingleStudentsFrmDB,
  deleteStudentsFrmDB,
};
