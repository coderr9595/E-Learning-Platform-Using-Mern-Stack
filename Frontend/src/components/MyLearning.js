import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const MyLearning = () => {
    const { user } = useAuth(); 
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchPurchasedCourses = useCallback(async () => {
        if (!user) return; 

        try {
            const response = await axios.get(`http://localhost:5000/api/purchased-courses/${user.id}`);
            setPurchasedCourses(response.data);
        } catch (err) {
            console.error('Error fetching purchased courses:', err);
            setError('Error fetching purchased courses');
        }
    }, [user]);
const handleStartLearning=()=>{
    navigate('/modulelayout');
}
    useEffect(() => {
        fetchPurchasedCourses(); 
    }, [fetchPurchasedCourses]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Learning</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {purchasedCourses.length === 0 ? (
                <p className="text-gray-500">No purchased courses found.</p>
            ) : (
                <ul className="space-y-4">
                    {purchasedCourses.map(course => (
                        <li key={course.courseId._id} className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="text-lg font-semibold">{course.courseId.title}</h3>
                            <p className="text-gray-700">{course.courseId.description}</p>
                            <button 
                    onClick={handleStartLearning} 
                    className="inline-block mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
                >
                    Start Learning
                </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyLearning;
