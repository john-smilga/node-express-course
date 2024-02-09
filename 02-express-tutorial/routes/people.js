const express = require("express");
const router = express.Router();
const {
  getPeople,
  gePostMan,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.get("/", getPeople);
router.post("/postman", gePostMan);

router.put("/:id", updatePerson);

router.delete("/delete/:id", deletePerson);

module.exports = router;
