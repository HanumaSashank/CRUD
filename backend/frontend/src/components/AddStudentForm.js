import React, { useState } from 'react';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    StudentID: '',
    Name: '',
    CreditsEarned: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to add student');
      const data = await response.json();
      console.log('Student added:', data);
      alert('Student added successfully!');
      // Clear the form
      setFormData({ StudentID: '', Name: '', CreditsEarned: '' });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="number"
        placeholder="Student ID"
        value={formData.StudentID}
        onChange={(e) => setFormData({ ...formData, StudentID: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.Name}
        onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Credits Earned"
        value={formData.CreditsEarned}
        onChange={(e) => setFormData({ ...formData, CreditsEarned: e.target.value })}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;