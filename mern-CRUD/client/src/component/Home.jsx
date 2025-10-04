import React, { useState, useEffect } from "react";
import studentBaseUrl from "../axiosInstance";

const Home = () => {
  const [students, setStudents] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    passOutYear: "",
    work: "",
    place: "",
    image: "",
    socialLink: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setStudents((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   try {
  //     const data = await studentBaseUrl.post("/addstudent", students);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error adding student:", error);
  //   }
  // };

  // on click of submit button
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      if (
        !students.firstName ||
        !students.lastName ||
        !students.email ||
        !students.gender ||
        !students.passOutYear
      ) {
        return alert("Please fill all required fields");
      }

      const formData = new FormData();
      for (let key in students) {
        formData.append(key, students[key]);
      }

      const { data } = await studentBaseUrl.post("/addstudent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data?.Success) {
        alert("Student added successfully with ID: " + data.Id);
        setStudents({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          passOutYear: "",
          work: "",
          place: "",
          image: "",
          socialLink: "",
          message: "",
        });
      }
      console.log("Student added:", data);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const [studentList, setStudentList] = useState([]);

  // get all students lists
  const getAllStudentsList = async () => {
    try {
      const { data } = await studentBaseUrl.get("/studentlists");
      setStudentList(data?.StudentList || []);
      console.log("All students:", data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // study about this
  useEffect(() => {
    getAllStudentsList();
  }, []);

  const handleDeleteStudent = async (id) => {
    try {
      const { data } = await studentBaseUrl.delete("/deletestudent", {
        data: { Id: id },
      });
      if (data?.Success) {
        alert("Student deleted successfully");
        getAllStudentsList(); // Refresh the list after deletion
      }
      console.log("Delete response:", data);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  console.log("students:", students);

  return (
    <div className="w-full px-6 py-8 min-h-[calc(100vh-60px)] flex flex-col items-center gap-8">
      {/* Input Section */}
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-md flex flex-wrap gap-6">
        {/* First Name */}
        <div className="w-[48%]">
          <label htmlFor="firstName" className="block mb-1 font-medium">
            Enter First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="w-full border rounded-lg px-3 py-2"
            name="firstName"
            value={students.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="w-[48%]">
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Enter Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="w-full border rounded-lg px-3 py-2"
            name="lastName"
            value={students.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="w-[48%]">
          <label htmlFor="email" className="block mb-1 font-medium">
            Enter Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
            name="email"
            value={students.email}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className="w-[48%]">
          <span className="block mb-1 font-medium">Gender</span>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={students.gender === "male"}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={students.gender === "female"}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {/* Pass Out Year */}
        <div className="w-[48%]">
          <label htmlFor="passOutYear" className="block mb-1 font-medium">
            Pass Out Year
          </label>
          <input
            type="date"
            id="passOutYear"
            name="passOutYear"
            value={students.passOutYear}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* What You Do */}
        <div className="w-[48%]">
          <label htmlFor="work" className="block mb-1 font-medium">
            What You Do
          </label>
          <input
            type="text"
            id="work"
            placeholder="Your profession"
            className="w-full border rounded-lg px-3 py-2"
            name="work"
            value={students.work}
            onChange={handleChange}
          />
        </div>

        {/* Current Place */}
        <div className="w-[48%]">
          <label htmlFor="place" className="block mb-1 font-medium">
            Current Place
          </label>
          <input
            type="text"
            id="place"
            placeholder="City / Location"
            className="w-full border rounded-lg px-3 py-2"
            name="place"
            value={students.place}
            onChange={handleChange}
          />
        </div>

        {/* Upload Image */}
        <div className="w-[48%]">
          <label htmlFor="image" className="block mb-1 font-medium">
            Upload Your Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full border rounded-lg px-3 py-2"
            name="image"
            // value={students.image}
            onChange={handleChange}
          />
        </div>

        {/* Social Link */}
        <div className="w-[48%]">
          <label htmlFor="socialLink" className="block mb-1 font-medium">
            Social Link
          </label>
          <input
            type="url"
            id="socialLink"
            placeholder="https://"
            className="w-full border rounded-lg px-3 py-2"
            name="socialLink"
            value={students.socialLink}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="w-full">
          <label htmlFor="message" className="block mb-1 font-medium">
            Your Message
          </label>
          <textarea
            id="message"
            rows="4"
            placeholder="Write your message here..."
            className="w-full border rounded-lg px-3 py-2"
            name="message"
            value={students.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">First Name</th>
              <th className="border px-3 py-2">Last Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Gender</th>
              <th className="border px-3 py-2">Pass Out Year</th>
              <th className="border px-3 py-2">What You Do</th>
              <th className="border px-3 py-2">Current Place</th>
              <th className="border px-3 py-2">Image</th>
              <th className="border px-3 py-2">Social Link</th>
              <th className="border px-3 py-2">Message</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr key={student.id}>
                <td className="border px-3 py-2">{student.firstName}</td>
                <td className="border px-3 py-2">{student.lastName}</td>
                <td className="border px-3 py-2">{student.email}</td>
                <td className="border px-3 py-2">{student.gender}</td>
                <td className="border px-3 py-2">{student.passOutYear}</td>
                <td className="border px-3 py-2">{student.work}</td>
                <td className="border px-3 py-2">{student.place}</td>
                <td className="border px-3 py-2">
                  {student.image ? (
                    <img
                      src={`${studentBaseUrl.defaults.baseURL}/uploads/${student.image}`}
                      alt={`no image`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                {/* <td className="border px-3 py-2">[Image]</td> */}
                {/* <td className="border px-3 py-2">
                <a
                  href="https://linkedin.com"
                  className="text-blue-600 underline"
                >
                  Link
                </a>
              </td> */}
                <td className="border px-3 py-2">
                  {student.socialLink ? (
                    <a
                      href={
                        student.socialLink.startsWith("http")
                          ? student.socialLink
                          : `https://${student.socialLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Link
                    </a>
                  ) : (
                    "No Link"
                  )}
                </td>
                <td className="border px-3 py-2">{student.message}</td>
                <td className="border px-3 py-2 text-center">
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteStudent(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
