import React from 'react';
import StudentList from './components/StudentList';
import InstructorList from './components/InstructorList';
import AddStudentForm from './components/AddStudentForm';
import AddInstructorForm from './components/AddInstructorForm';
import CourseList from './components/CourseList';

function App() {
  return (
    <div>
      <h1>University Management System</h1>
      <AddStudentForm />
      <StudentList />
      <AddInstructorForm />
      <InstructorList />
      <CourseList />
    </div>
  );
}

export default App;