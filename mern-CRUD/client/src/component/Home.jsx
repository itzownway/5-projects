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

  const [studentList, setStudentList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setStudents((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // on click of submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append fields correctly
      for (let key in students) {
        if (key === "image" && !students.image) continue;
        if (key === "_id" && !students._id) continue; // skip empty id
        formData.append(key, students[key]);
      }

      let response;

      if (!isUpdating) {
        //  ADD NEW STUDENT
        response = await studentBaseUrl.post("/addstudent", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // UPDATE EXISTING STUDENT
        formData.append("Id", students._id); // ensure backend gets Id
        response = await studentBaseUrl.put("/updatestudent", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const data = response.data;

      if (data?.Success) {
        alert(isUpdating ? "Student updated!" : "Student added!");
      } else {
        alert("Failed: " + data?.Message);
      }

      // Reset everything
      setIsUpdating(false);
      setStudents({
        _id: "",
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

      getAllStudentsList();
    } catch (error) {
      console.error("Error in form submit:", error);
      alert("Error: " + error.message);
    }
  };

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

  // update student
  const handleUpdateStudent = (data) => {
    setStudents({
      _id: data._id, //very important
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      passOutYear: data.passOutYear,
      work: data.work,
      place: data.place,
      image: data.image,
      socialLink: data.socialLink,
      message: data.message,
    });
    setIsUpdating(true);
  };

  return (
    <div className="w-full px-6 py-8 min-h-[calc(100vh-60px)] flex flex-col items-center gap-8">
      {/* Input Section */}
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-md flex flex-wrap gap-6">
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

        <div className="w-[48%]">
          <label htmlFor="image" className="block mb-1 font-medium">
            Upload Your Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full border rounded-lg px-3 py-2"
            name="image"
            onChange={handleChange}
          />
        </div>

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
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleUpdateStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteStudent(student._id)}
                  >
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
