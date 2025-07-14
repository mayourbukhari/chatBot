const axios = require('axios');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  async generateResponse(message) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': this.apiKey
          }
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        return response.data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate response from AI');
    }
  }
}

module.exports = new GeminiService();
