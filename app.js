// const fs = require("fs");
// var validator = require("validator");

// //fs.writeFileSync("notes.txt", "My name is Abhishek");

// //challange 1

// fs.appendFileSync("notes.txt", "this data  is appended");

const notes = require("./notes.js");

// const print = str();
// console.log(print);
// console.log(validator.isEmail("foobar.com"));
// console.log(validator.isLowercase("Str"));

const chalk = require("chalk");
//const getNotes = require("./notes.js");
const yargs = require("yargs");
const { demandOption } = require("yargs");

// console.log(chalk.green.bold.inverse("Hello World!"));
// console.log(process.argv[2]);

const command = process.argv[2];

// if (command === "add") {
//   console.log("adding the comment");
// } else if (command === "remove") {
//   console.log("remove the comment");
// }

// console.log(process.argv);
// console.log(yargs.argv);

yargs.version("1.1.0");

//create a add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "print the title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//create a remove command
yargs.command({
  command: "remove",
  describe: "remove a new note",
  builder: {
    title: {
      describe: "This is for removing the note",
      damendOption: true,
      type: "string",
    },
  },
  handler(argv) {
    //console.log(`remove the note ` + argv.title);
    notes.removeNote(argv.title);
  },
});

//create a list command
yargs.command({
  command: "list",
  describe: "listing a note",
  handler() {
    notes.listNotes();
    //console.log("listing a note!");
  },
});

//create a read command
yargs.command({
  command: "read",
  describe: "read note",
  builder: {
    title: {
      describe:
        "This is for reading the note it will tell wheather it is present or not",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log("reading notes!");
    notes.readNotes(argv.title);
  },
});

//add, remove , read, list
//console.log(yargs.argv);
yargs.parse();
