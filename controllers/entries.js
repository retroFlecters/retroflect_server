const Entry = require("../models/entry");

module.exports.getAll = async (req, res) => {
  const entries = await Entry.find({ user: req.body.user.id });
  entries.sort((a, b) => a.entryDate - b.entryDate); // sort accending
  res.status(200).json(entries.map(entry => entry.toJSON()));
};

module.exports.create = async (req, res) => {
  const { entryDate, diary, user } = req.body;
  const entry = await Entry.create({ entryDate, diary, user: user.id });
  res.status(201).json(entry.toJSON());
};
