const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/async.catch');
const ChatController = require('../controllers/chat.controller');
const { verifyAuth } = require('../middlewares/auth.verify');

router.use(catchAsync(verifyAuth));

router.post('/create', catchAsync(ChatController.createNewChat));
router.post('/newMessage', catchAsync(ChatController.addMessage));
router.put('/update', catchAsync(ChatController.updateSchema));
router.delete('/delete', catchAsync(ChatController.deleteChat));
router.get('/history/:chatId', catchAsync(ChatController.loadHistory));

module.exports = router;