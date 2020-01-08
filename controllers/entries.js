const Entry = require("../models/entry");

module.exports.getAll = async (req, res) => {
  const entries = await Entry.find();
  res.status(200).json(entries.map(entry => entry.toJSON()));
};

module.exports.create = async (req, res) => {
  const { entryDate, diary } = req.body;
  const entry = await Entry.create({ entryDate, diary });
  res.status(201).json(entry.toJSON());
};
