const Student = require("../model/student.model"); // remove destructuring

// add student
const handleAddStudentController = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file; // multer puts the uploaded file here

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

    // Correct way with Mongoose
    // const addStudent = await Student.create(body);

    const addStudent = await Student.create({
      ...body,
      image: file ? file.path : "", // save file path in DB
    });

    console.log("Student added ", addStudent);

    return res.status(201).json({
      Message: "Student added successfully",
      Success: true,
      Id: addStudent?._id,
      // Data: addStudent,
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

module.exports = {
  handleAddStudentController,
  handleStudentListController,
  handleStudentDeleteController,
};
