import React, { useState } from 'react';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    StudentID: '',
    Name: '',
    CreditsEarned: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to add a new student
    fetch('http://127.0.0.1:5000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Student added:', data);
        alert('Student added successfully!');
      })
      .catch((error) => console.error('Error adding student:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="number"
        placeholder="Student ID"
        value={formData.StudentID}
        onChange={(e) => setFormData({ ...formData, StudentID: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.Name}
        onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Credits Earned"
        value={formData.CreditsEarned}
        onChange={(e) => setFormData({ ...formData, CreditsEarned: e.target.value })}
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;