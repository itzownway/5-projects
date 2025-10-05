const express = require("express");
const {
  handleAddStudentController,
  handleStudentListController,
  handleStudentDeleteController,
} = require("../controller/student.controller");

const multer = require("multer");
const router = express.Router();

// configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// http://localhost:3000/student/addstudent
// router.post('/addstudent', handleAddStudentController);
router.post("/addstudent", upload.single("image"), handleAddStudentController);
router.get("/studentlists", handleStudentListController);
router.delete("/deletestudent", handleStudentDeleteController);

module.exports = router;
