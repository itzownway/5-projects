const express = require("express");
const {
  handleAddStudentController,
  handleStudentListController,
  handleStudentDeleteController,
  handleStudentUpdateController,
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

router.post("/addstudent", upload.single("image"), handleAddStudentController);
router.get("/studentlists", handleStudentListController);
router.delete("/deletestudent", handleStudentDeleteController);
router.put('/updatestudent', upload.single("image"), handleStudentUpdateController);

module.exports = router;
