import React from 'react';
import {Link} from "react-router-dom";
import Table from "./Table/Table";


const mockData = [
    { id: 1, name: "Emily Chen", age: 28, occupation: "Software Engineer" },
    { id: 2, name: "Ryan Thompson", age: 32, occupation: "Marketing Manager" },
    { id: 3, name: "Sophia Patel", age: 25, occupation: "Data Analyst" },
    { id: 4, name: "Michael Lee", age: 41, occupation: "CEO" },
    { id: 5, name: "Olivia Brown", age: 29, occupation: "Graphic Designer" },
    { id: 6, name: "Alexander Hall", age: 38, occupation: "Sales Representative" },
    { id: 7, name: "Isabella Davis", age: 26, occupation: "Teacher" },
    { id: 8, name: "Ethan White", age: 35, occupation: "Lawyer" },
    { id: 9, name: "Lily Tran", age: 30, occupation: "Nurse" },
    { id: 10, name: "Julian Sanchez", age: 39, occupation: "Engineer" },
    { id: 11, name: "Ava Martin", age: 27, occupation: "Journalist" },
    { id: 12, name: "Benjamin Walker", age: 42, occupation: "Doctor" },
    { id: 13, name: "Charlotte Brooks", age: 31, occupation: "HR Manager" },
    { id: 14, name: "Gabriel Harris", age: 36, occupation: "IT Consultant" },
    { id: 15, name: "Hannah Taylor", age: 24, occupation: "Student" },
    { id: 16, name: "Jackson Brown", age: 40, occupation: "Business Owner" },
    { id: 17, name: "Kayla Lewis", age: 33, occupation: "Event Planner" },
    { id: 18, name: "Logan Mitchell", age: 37, occupation: "Architect" },
    { id: 19, name: "Mia Garcia", age: 29, occupation: "Artist" },
    { id: 20, name: "Natalie Hall", age: 34, occupation: "Teacher" },
    { id: 21, name: "Oliver Patel", age: 38, occupation: "Software Developer" },
    { id: 22, name: "Penelope Martin", age: 26, occupation: "Writer" },
    { id: 23, name: "Quinn Lee", age: 35, occupation: "Entrepreneur" },
    { id: 24, name: "Rachel Kim", age: 30, occupation: "Dentist" },
    { id: 25, name: "Samuel Jackson", age: 42, occupation: "Lawyer" },
    { id: 26, name: "Tessa Hall", age: 28, occupation: "Graphic Designer" },
    { id: 27, name: "Uma Patel", age: 39, occupation: "Marketing Manager" },
    { id: 28, name: "Vincent Brooks", age: 36, occupation: "IT Consultant" },
    { id: 29, name: "Walter White", age: 41, occupation: "Engineer" },
    { id: 30, name: "Xavier Sanchez", age: 33, occupation: "Sales Representative" },
    { id: 31, name: "Yvonne Martin", age: 29, occupation: "Teacher" },
    { id: 32, name: "Zoe Lee", age: 27, occupation: "Data Analyst" },
    { id: 33, name: "Abigail Brown", age: 34, occupation: "Nurse" },
    { id: 34, name: "Caleb Harris", age: 38, occupation: "Business Owner" },
    { id: 35, name: "Diana Taylor", age: 31, occupation: "Event Planner" },
    { id: 36, name: "Eleanor Walker", age: 40, occupation: "CEO" }
];


const TablePage = () => {
    return (
        <main className="p-8 flex flex-col items-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Table</h1>

            <section className="w-full max-w-2xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Build a Paginated Users Table</h2>
                <p className="text-blue-800 mb-4">
                    Given a list of users, build a users data table that displays users in a paginated format.
                </p>
                <div className="space-y-4">
                    <div>
                        <p className="font-medium text-blue-900 mb-2">Table requirements:</p>
                        <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                            <li>The users data table should display the following columns: Id, Name, Age, Occupation</li>
                            <li>Each row in the table represents a single user</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium text-blue-900 mb-2">Pagination requirements:</p>
                        <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                            <li>The pagination controls should allow the user to navigate to previous and next pages</li>
                            <li>The pagination controls should display the current page number and the total number of pages</li>
                            <li>The table should update dynamically when the user navigates to a different page</li>
                            <li>Provide an option to select the number of users displayed per page (e.g., 5, 10, 20)</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="w-full max-w-4xl overflow-x-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <Table data={mockData} />
            </div>

            <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
                ← Back to Home
            </Link>
        </main>
    );
};

export default TablePage;
