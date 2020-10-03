const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => "Your notes...";

const addNote = (title, body) => {
  const notes = loadNotes();

  //const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("new node added");
  } else {
    console.log("Note title taken");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.JSON", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
//removenote function

const removeNote = (title) => {
  console.log("you are in the remove note command");
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => note.title !== title);
  //console.log(duplicateNotes);
  if (duplicateNotes.length === notes.length) {
    console.log(
      chalk.red.inverse(
        `the title dosent match with any of the existing titles`
      )
    );
  } else {
    console.log(chalk.green.inverse(`Note removed`));
  }

  saveNotes(duplicateNotes);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse.bold(`Your notes`));
  //var ret = '';
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const fid = notes.find((note) => note.title === title);
  //console.log(fid);
  if (fid) {
    console.log(
      `The title is ` +
        chalk.italic.green.inverse.bold(fid.title) +
        ` and the body is ` +
        chalk.white.inverse.bold(fid.body)
    );
  } else {
    console.log(chalk.red.inverse(`No note found`));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
