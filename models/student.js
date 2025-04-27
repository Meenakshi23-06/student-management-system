const { getDB } = require('./db');

async function createStudent(student) {
  const db = getDB();
  const result = await db.collection('students').insertOne({
    ...student,
    enrolledCourses: student.enrolledCourses || [],
    createdAt: new Date()
  });
  return result;
}

async function getAllStudents() {
  const db = getDB();
  return await db.collection('students').find().toArray();
}

async function getStudentWithCourses(studentId) {
  const db = getDB();
  return await db.collection('students').aggregate([
    {
      $match: { _id: studentId }
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'enrolledCourses',
        foreignField: '_id',
        as: 'courses'
      }
    }
  ]).toArray();
}

async function updateStudent(studentId, updates) {
  const db = getDB();
  const result = await db.collection('students').updateOne(
    { _id: studentId },
    { $set: updates }
  );
  return result;
}

async function deleteStudent(studentId) {
  const db = getDB();
  const result = await db.collection('students').deleteOne({ _id: studentId });
  return result;
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentWithCourses,
  updateStudent,
  deleteStudent
};
