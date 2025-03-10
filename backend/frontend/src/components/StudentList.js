import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Fetch students from the Flask backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  // Function to delete a student
  const deleteStudent = (studentId) => {
    fetch(`http://127.0.0.1:5000/students/${studentId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Student deleted:', data);
        // Remove the deleted student from the list
        setStudents(students.filter((student) => student.StudentID !== studentId));
        alert('Student deleted successfully!');
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.StudentID}>
            {student.Name} - Credits: {student.CreditsEarned}
            <button onClick={() => deleteStudent(student.StudentID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;