from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS  # Import CORS
import logging


# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Umbc%404589@localhost/IA_AD'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Configure logging
# logging.basicConfig(level=logging.DEBUG)

# Define the Student model
class Student(db.Model):
    StudentID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    CreditsEarned = db.Column(db.Integer)

# Define the Course model
class Course(db.Model):
    CourseID = db.Column(db.Integer, primary_key=True)
    CourseTitle = db.Column(db.String(100), nullable=False)
    InstructorID = db.Column(db.Integer, db.ForeignKey('instructor.InstructorID'))
    Credits = db.Column(db.Integer)

# Define the Instructor model
class Instructor(db.Model):
    InstructorID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Department = db.Column(db.String(100))

# Define the Enrollment model
class Enrollment(db.Model):
    StudentID = db.Column(db.Integer, db.ForeignKey('student.StudentID'), primary_key=True)
    CourseID = db.Column(db.Integer, db.ForeignKey('course.CourseID'), primary_key=True)
    Grade = db.Column(db.String(2))

# Create the database tables
with app.app_context():
    db.create_all()

# Test route
@app.route('/')
def home():
    return "Welcome to the Flask Backend!"


# Get all students
@app.route('/students', methods=['GET'])
def get_students():
    try:
        students = Student.query.all()
        return jsonify([{'StudentID': s.StudentID, 'Name': s.Name, 'CreditsEarned': s.CreditsEarned} for s in students])
    except Exception as e:
        logging.error(f"Error fetching students: {e}")
        return jsonify({'message': 'Failed to fetch students'}), 500

# Add a new student
@app.route('/students', methods=['POST'])
def add_student():
    try:
        data = request.get_json()
        new_student = Student(StudentID=data['StudentID'], Name=data['Name'], CreditsEarned=data['CreditsEarned'])
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Student added successfully!'})
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding student: {e}")
        return jsonify({'message': 'Failed to add student'}), 500

# Delete a student
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        student = Student.query.get(student_id)
        if student:
            # Delete all enrollments for the student
            Enrollment.query.filter_by(StudentID=student_id).delete()
            db.session.delete(student)
            db.session.commit()
            return jsonify({'message': 'Student deleted successfully!'})
        else:
            return jsonify({'message': 'Student not found!'}), 404
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting student: {e}")
        return jsonify({'message': 'Failed to delete student'}), 500

# Get all instructors
@app.route('/instructors', methods=['GET'])
def get_instructors():
    try:
        instructors = Instructor.query.all()
        return jsonify([{'InstructorID': i.InstructorID, 'Name': i.Name, 'Department': i.Department} for i in instructors])
    except Exception as e:
        logging.error(f"Error fetching instructors: {e}")
        return jsonify({'message': 'Failed to fetch instructors'}), 500

# Add a new instructor
@app.route('/instructors', methods=['POST'])
def add_instructor():
    try:
        data = request.get_json()
        new_instructor = Instructor(InstructorID=data['InstructorID'], Name=data['Name'], Department=data['Department'])
        db.session.add(new_instructor)
        db.session.commit()
        return jsonify({'message': 'Instructor added successfully!'})
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding instructor: {e}")
        return jsonify({'message': 'Failed to add instructor'}), 500

# # Delete an instructor
# @app.route('/instructors/<int:instructor_id>', methods=['DELETE'])
# def delete_instructor(instructor_id):
#     try:
#         instructor = Instructor.query.get(instructor_id)
#         if instructor:
#             # Reassign or delete courses taught by the instructor
#             courses = Course.query.filter_by(InstructorID=instructor_id).all()
#             for course in courses:
#                 # Option 1: Reassign the course to another instructor
#                 # course.InstructorID = new_instructor_id
#                 # Option 2: Delete the course
#                 db.session.delete(course)
#             db.session.delete(instructor)
#             db.session.commit()
#             return jsonify({'message': 'Instructor deleted successfully!'})
#         else:
#             return jsonify({'message': 'Instructor not found!'}), 404
#     except Exception as e:
#         db.session.rollback()
#         logging.error(f"Error deleting instructor: {e}")
#         return jsonify({'message': 'Failed to delete instructor'}), 500

# Get all courses
@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        courses = Course.query.all()
        return jsonify([{'CourseID': c.CourseID, 'CourseTitle': c.CourseTitle, 'InstructorID': c.InstructorID, 'Credits': c.Credits} for c in courses])
    except Exception as e:
        logging.error(f"Error fetching courses: {e}")
        return jsonify({'message': 'Failed to fetch courses'}), 500

# Get enrollment details for a student
@app.route('/enrollments/<int:student_id>', methods=['GET'])
def get_enrollments(student_id):
    try:
        enrollments = Enrollment.query.filter_by(StudentID=student_id).all()
        return jsonify([{'CourseID': e.CourseID, 'Grade': e.Grade} for e in enrollments])
    except Exception as e:
        logging.error(f"Error fetching enrollments: {e}")
        return jsonify({'message': 'Failed to fetch enrollments'}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)