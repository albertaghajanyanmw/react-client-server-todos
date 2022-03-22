// TODO notification
const { sendNotification } = require('../services/firebase');

module.exports.addMessage = async (req, res) => {
  try {
    // const data = await messagesModel.create( todo );
    const tokens = [];
    await sendNotification("Test-title", "Test-body", tokens);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};