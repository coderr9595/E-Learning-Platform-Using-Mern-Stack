import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, fromUser: true },
      ]);
      const userMessage = inputValue;
      setInputValue('');
      setLoading(true); 

      try {
        
        const response = await fetch('http://localhost:5000/generate-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: userMessage }),
        });

        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        
        const data = await response.json();
        
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.answer, fromUser: false },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to get response from the server.', fromUser: false },
        ]);
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center p-4">Chatbot</h2>

      <div className="flex-1 p-2" style={{ maxHeight: '560px', overflowY: 'auto' }}>
        <div className="flex flex-col space-y-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-xs text-sm ${
                msg.fromUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="p-2 rounded-lg max-w-xs text-sm bg-gray-300 text-black self-start">
              Generating...
            </div>
          )}
        </div>
      </div>

      <div className="p-2 border-t">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>

      <div className="p-2 text-xs text-gray-600 text-center border-t">
        <p>
          Disclaimer: Responses are generated based on the information available and may not always be accurate.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
