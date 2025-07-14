const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const geminiService = require('../services/geminiService');

// POST /api/chat - Send message and get AI response
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get response from Gemini AI
    const aiResponse = await geminiService.generateResponse(message);

    // Save chat to database
    const chat = new Chat({
      message,
      response: aiResponse
    });

    await chat.save();

    res.json({
      message,
      response: aiResponse,
      timestamp: chat.timestamp
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
});

// GET /api/chat/history - Get chat history
router.get('/history', async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json(chats);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// DELETE /api/chat/history - Clear chat history
router.delete('/history', async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
});

module.exports = router;
