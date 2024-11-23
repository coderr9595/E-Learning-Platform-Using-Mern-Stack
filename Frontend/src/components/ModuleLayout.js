import React, { useState } from 'react';
import Chatbot from './Chatbot'; 

const ModuleLayout = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true); 

    const modules = [
        { id: 1, title: 'Module 1', content: 'Content for Module 1' },
        { id: 2, title: 'Module 2', content: 'Content for Module 2' },
        { id: 3, title: 'Module 3', content: 'Content for Module 3' },
        { id: 4, title: 'Module 4', content: 'Content for Module 4' },
    ];

    const handleModuleClick = (module) => {
        setSelectedModule(module);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible); 
    };

    return (
        <div className="flex h-screen relative">
            
            <div className={`transition-all duration-300 ${sidebarVisible ? 'w-1/4' : 'w-20'} bg-gray-200 p-4`}>
                {sidebarVisible && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Modules</h2>
                        <ul>
                            {modules.map((module) => (
                                <li
                                    key={module.id}
                                    className="cursor-pointer mb-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
                                    onClick={() => handleModuleClick(module)}
                                >
                                    {module.title}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <button
                onClick={toggleSidebar}
                className={`absolute top-4 transition-all duration-300 ${sidebarVisible ? 'left-80' : 'left-4'} p-2 bg-blue-500 text-white rounded`}
                style={{ zIndex: 100 }} 
            >
                {sidebarVisible ? '✖' : '☰'} 
            </button>

            
            <div className={`flex-1 overflow-y-auto p-4 ${sidebarVisible ? 'ml-0' : 'ml-20'}`} style={{ maxHeight: 'calc(100vh - 2rem)' }}>
                {selectedModule ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">{selectedModule.title}</h2>
                        <p>{selectedModule.content}</p>
                    </>
                ) : (
                    <p className="text-lg text-gray-600">Please select a module to view its content.</p>
                )}
            </div>

            
            <div className="w-1/4 bg-gray-100 p-4">
                <Chatbot />
            </div>
        </div>
    );
};

export default ModuleLayout;
