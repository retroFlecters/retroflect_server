const entries = [
  { id: 1, gratitude: "I'm grateful for popcorns." },
  { id: 2, gratitude: "I'm grateful for working on codings." }
];

module.exports.getAll = (req, res) => {
  res.status(200).json(entries);
};

module.exports.create = (req, res) => {
  const { gratitude } = req.body;
  entries.push({ id: Math.random().toString(), gratitude });
  res.status(201).json(entries[entries.length - 1]);
};
