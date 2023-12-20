let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const gePostMan = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).json("Please provide the name").json({ error: true });
  }
  res.status(200).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user_id = people.findIndex((p) => p.id == id);
  people[user_id].name = "sammy james";
  res.status(201).json({ success: true, data: people });
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id == Number(req.params.id));
  if (!person) {
    return res.status(404).json({ error: "true", message: "person not found" });
  }
  const updatedPeople = people.filter((p) => p.id !== person.id);

  res.status(200).json({ success: true, data: updatedPeople });
};

module.exports = {
  getPeople,
  updatePerson,
  deletePerson,
  gePostMan,
};
