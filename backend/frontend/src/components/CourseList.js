import React, { useEffect, useState } from 'react';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the Flask backend
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Failed to fetch courses. Please try again.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.CourseID}>
            {course.CourseTitle} - Instructor ID: {course.InstructorID} - Credits: {course.Credits}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;