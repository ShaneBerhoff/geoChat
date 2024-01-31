/* currently not used
const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chatController');

router.post('/message', async (req, res) => {
    try {
        await sendMessage(req.body);
        res.status(200).send('Message sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

module.exports = router;
*/