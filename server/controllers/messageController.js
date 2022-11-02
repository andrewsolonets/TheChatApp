const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.aggregate([
      {
        $match: {
          users: {
            $all: [from, to],
          },
        },
      },
      {
        $project: {
          _id: 0,
          sender: 1,
          message: 1,
          sent: {
            time: { $dateToString: { format: "%H:%M", date: "$updatedAt" } },
            date: { $dateToString: { format: "%d/%m", date: "$updatedAt" } },
          },
        },
      },
    ]);

    // const messages = await Messages.find({
    //   users: {
    //     $all: [from, to],
    //   },
    // }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        sent: msg.sent,
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    next(err);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully" });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    next(err);
  }
};
