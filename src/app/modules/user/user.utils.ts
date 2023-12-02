import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findlastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// need: year, semesterCode, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findlastStudentId();
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030

  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6); // 0001
  }

  let incementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incementId = `${payload.year}${payload.code}${incementId}`;
  return incementId;
};
