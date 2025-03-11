import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Fetch students from the Flask backend
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/students');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to fetch students. Please try again.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to delete a student
  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/students/${studentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete student');
      const data = await response.json();
      console.log('Student deleted:', data);
      // Refresh the student list
      fetchStudents();
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
  };

  // Function to view enrollment details
  const viewEnrollments = async (studentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/enrollments/${studentId}`);
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      const data = await response.json();
      alert(`Enrollments for Student ID ${studentId}:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      alert('Failed to fetch enrollments. Please try again.');
    }
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.StudentID}>
            {student.Name} - Credits: {student.CreditsEarned}
            <button onClick={() => deleteStudent(student.StudentID)}>Delete</button>
            <button onClick={() => viewEnrollments(student.StudentID)}>View Enrollments</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;