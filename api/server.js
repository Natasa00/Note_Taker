const express = require("express");
const fs = require("fs");
const { uuid } = require("uuidv4");

const app = express();
const port = 3000;

// middleware to parse json body
app.use(express.json());

app.get("/api/notes", function (req, res, next) {
  try {
    // read the db
    const data = fs.readFileSync("./api/db/db.json", "utf8");
    // return all notes
    res.send(data);
  } catch (err) {
    next(err);
  }
});

app.post("/api/notes", function (req, res, next) {
  const newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  try {
    const data = fs.readFileSync("./api/db/db.json", "utf8");
    const existingNotes = JSON.parse(data);
    existingNotes.push(newNote);
    fs.writeFileSync(
      "./api/db/db.json",
      JSON.stringify(existingNotes, null, 2)
    );
    res.send(newNote);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Notes API listening on port ${port}`);
});
