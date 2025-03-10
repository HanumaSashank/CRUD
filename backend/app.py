from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS  # Import CORS


# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Umbc%404589@localhost/IA_AD'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

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
    students = Student.query.all()
    return jsonify([{'StudentID': s.StudentID, 'Name': s.Name, 'CreditsEarned': s.CreditsEarned} for s in students])

# Add a new student
@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    new_student = Student(StudentID=data['StudentID'], Name=data['Name'], CreditsEarned=data['CreditsEarned'])
    db.session.add(new_student)
    db.session.commit()
    return jsonify({'message': 'Student added successfully!'})

# Delete a student
@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get(student_id)
    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Student deleted successfully!'})
    else:
        return jsonify({'message': 'Student not found!'}), 404

# Get all instructors
@app.route('/instructors', methods=['GET'])
def get_instructors():
    instructors = Instructor.query.all()
    return jsonify([{'InstructorID': i.InstructorID, 'Name': i.Name, 'Department': i.Department} for i in instructors])

# Add a new instructor
@app.route('/instructors', methods=['POST'])
def add_instructor():
    data = request.get_json()
    new_instructor = Instructor(InstructorID=data['InstructorID'], Name=data['Name'], Department=data['Department'])
    db.session.add(new_instructor)
    db.session.commit()
    return jsonify({'message': 'Instructor added successfully!'})

# Delete an instructor
@app.route('/instructors/<int:instructor_id>', methods=['DELETE'])
def delete_instructor(instructor_id):
    instructor = Instructor.query.get(instructor_id)
    if instructor:
        db.session.delete(instructor)
        db.session.commit()
        return jsonify({'message': 'Instructor deleted successfully!'})
    else:
        return jsonify({'message': 'Instructor not found!'}), 404

# Get all instructors
@app.route('/courses', methods=['GET'])
def get_courses():
    Courses = Course.query.all()
    return jsonify([{'CourseID': i.CourseID, 'Name': i.CourseTitle, 'Department': i.InstructorID, 'Credits:' : i.Credits} for i in Courses])

# # Get all instructors
# @app.route('/courses', methods=['GET'])
# def get_courses():
#     Courses = Course.query.all()
#     return jsonify([{'CourseID': i.CourseID, 'Name': i.CourseTitle, 'Department': i.InstructorID, 'Credits:' : i.Credits} for i in Courses])

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)