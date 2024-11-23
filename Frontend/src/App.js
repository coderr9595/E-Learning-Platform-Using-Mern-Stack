import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Help from './components/Help';
import CourseList from './components/CourseList';
import { CartProvider } from './context/CartContext';
import MyLearning from './components/MyLearning';
import About from './components/About'
import SystemCheck from './components/SystemCheck'
import Chatbot from './components/Chatbot';
import ModuleLayout from './components/ModuleLayout';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-learning" element={<MyLearning/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/help" element={<Help />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/systemcheck" element={<SystemCheck/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
        <Route path="/modulelayout" element={<ModuleLayout/>}/>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </CartProvider>
    </AuthProvider>
  );
};

export default App;
