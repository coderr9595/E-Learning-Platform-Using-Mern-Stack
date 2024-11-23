const axios = require("axios");


function cleanText(text) {
  
  return text.replace(/[^\w\s]/g, '').trim();
}


function limitWords(text, wordLimit) {
  const words = text.split(/\s+/); 
  return words.slice(0, wordLimit).join(' '); 
}


const generateAnswer = async (req, res) => {
  const { question } = req.body;
 

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }
    
  try {
    
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GENERATIVE_LANGUAGE_API_KEY}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    const generatedAnswer = response.data.candidates[0].content.parts[0].text;

    
    const cleanedAnswer = cleanText(generatedAnswer);

   
    const limitedAnswer = limitWords(cleanedAnswer, 70);

    res.json({ answer: limitedAnswer });
  } catch (error) {
    if (error.response) {
      console.error("Error generating answer:", error.response.data);
      return res.status(500).json({ error: error.response.data });
    } else {
      console.error("Error generating answer:", error.message);
      return res.status(500).json({ error: "Failed to generate answer" });
    }
  }
};

module.exports = {
  generateAnswer,
};
