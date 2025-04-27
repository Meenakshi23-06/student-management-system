const { getDB } = require('./db');

async function createCourse(course) {
  const db = getDB();
  const result = await db.collection('courses').insertOne(course);
  return result;
}

async function getAllCourses() {
  const db = getDB();
  return await db.collection('courses').find().toArray();
}

async function searchCourses(searchTerm) {
  const db = getDB();
  return await db.collection('courses').find({
    $text: { $search: searchTerm }
  }).toArray();
}

async function updateCourse(courseId, updates) {
  const db = getDB();
  const result = await db.collection('courses').updateOne(
    { _id: courseId },
    { $set: updates }
  );
  return result;
}

async function deleteCourse(courseId) {
  const db = getDB();
  const result = await db.collection('courses').deleteOne({ _id: courseId });
  return result;
}

module.exports = {
  createCourse,
  getAllCourses,
  searchCourses,
  updateCourse,
  deleteCourse
};
