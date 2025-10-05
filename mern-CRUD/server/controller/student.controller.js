const Student = require("../model/student.model"); // remove destructuring

// add student
const handleAddStudentController = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;

    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.gender ||
      !body.passOutYear
    ) {
      return res.status(400).json({
        Message: "Please fill all required fields",
        Success: false,
      });
    }

    // Remove _id if sent by mistake
    delete body._id;
    delete body.Id;

    const addStudent = await Student.create({
      ...body,
      image: file ? file.filename : "",
    });

    return res.status(201).json({
      Message: "Student added successfully",
      Success: true,
      Id: addStudent._id,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

// get all students
const handleStudentListController = async (req, res) => {
  try {
    const studentLists = await Student.find(); // Correct way with Mongoose
    return res.status(200).json({
      Message: "Student list fetched",
      Success: true,
      TotalCount: studentLists.length,
      StudentList: studentLists,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

// delete student
const handleStudentDeleteController = async (req, res) => {
  const body = req.body;
  try {
    const deletedStudent = await Student.deleteOne({ _id: body.Id });
    console.log("deletedStudent:", deletedStudent);
    if (deletedStudent.deletedCount > 0) {
      return res
        .status(200)
        .json({ Message: "Student deleted successfully", Success: true });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

// update student
const handleStudentUpdateController = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;

    const studentId = body.Id || body._id;

    if (!studentId) {
      return res.status(400).json({
        Message: "Missing student Id",
        Success: false,
      });
    }

    const updatedFields = { ...body };
    if (file) updatedFields.image = file.filename;

    delete updatedFields._id;
    delete updatedFields.Id;

    const updatedStudent = await Student.updateOne(
      { _id: studentId },
      { $set: updatedFields }
    );

    if (updatedStudent.modifiedCount > 0) {
      return res
        .status(200)
        .json({ Message: "Student updated successfully", Success: true });
    } else {
      return res
        .status(200)
        .json({ Message: "No changes made", Success: true });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

module.exports = {
  handleAddStudentController,
  handleStudentListController,
  handleStudentDeleteController,
  handleStudentUpdateController,
};
