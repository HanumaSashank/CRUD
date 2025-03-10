import React, { useEffect, useState } from 'react';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors from the Flask backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/instructors')
      .then((response) => response.json())
      .then((data) => setInstructors(data))
      .catch((error) => console.error('Error fetching instructors:', error));
  }, []);

  // Function to delete an instructor
  const deleteInstructor = (instructorId) => {
    fetch(`http://127.0.0.1:5000/instructors/${instructorId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Instructor deleted:', data);
        // Remove the deleted instructor from the list
        setInstructors(instructors.filter((instructor) => instructor.InstructorID !== instructorId));
        alert('Instructor deleted successfully!');
      })
      .catch((error) => console.error('Error deleting instructor:', error));
  };

  return (
    <div>
      <h2>Instructors</h2>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor.InstructorID}>
            {instructor.Name} - Department: {instructor.Department}
            <button onClick={() => deleteInstructor(instructor.InstructorID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;