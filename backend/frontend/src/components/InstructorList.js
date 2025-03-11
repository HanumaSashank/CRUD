import React, { useEffect, useState } from 'react';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors from the Flask backend
  const fetchInstructors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/instructors');
      if (!response.ok) throw new Error('Failed to fetch instructors');
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      alert('Failed to fetch instructors. Please try again.');
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // // Function to delete an instructor
  // const deleteInstructor = async (instructorId) => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:5000/instructors/${instructorId}`, {
  //       method: 'DELETE',
  //     });
  //     if (!response.ok) throw new Error('Failed to delete instructor');
  //     const data = await response.json();
  //     console.log('Instructor deleted:', data);
  //     // Refresh the instructor list
  //     fetchInstructors();
  //     alert('Instructor deleted successfully!');
  //   } catch (error) {
  //     console.error('Error deleting instructor:', error);
  //     alert('Failed to delete instructor. Please try again.');
  //   }
  // };

  return (
    <div>
      <h2>Instructors</h2>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor.InstructorID}>
            {instructor.Name} - Department: {instructor.Department}
            {/* <button onClick={() => deleteInstructor(instructor.InstructorID)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;