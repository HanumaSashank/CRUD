import React, { useState } from 'react';

const AddInstructorForm = () => {
  const [formData, setFormData] = useState({
    InstructorID: '',
    Name: '',
    Department: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to add instructor');
      const data = await response.json();
      console.log('Instructor added:', data);
      alert('Instructor added successfully!');
      // Clear the form
      setFormData({ InstructorID: '', Name: '', Department: '' });
    } catch (error) {
      console.error('Error adding instructor:', error);
      alert('Failed to add instructor. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Instructor</h2>
      <input
        type="number"
        placeholder="Instructor ID"
        value={formData.InstructorID}
        onChange={(e) => setFormData({ ...formData, InstructorID: e.target.value })}
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
        type="text"
        placeholder="Department"
        value={formData.Department}
        onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
        required
      />
      <button type="submit">Add Instructor</button>
    </form>
  );
};

export default AddInstructorForm;