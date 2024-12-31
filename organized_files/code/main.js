import fs from "fs";
import path from "path";
import { fileTypes } from "./utility.js";

const commands = process.argv.slice(2);
const commandType = commands[0];
const dirpath = commands[1];

switch (commandType) {
  case "help":
    helpFn();
    break;
  case "tree":
    treeFn();
    break;
  case "organize":
    organizeFn();
    break;
  default:
    console.log("INVALID COMMAND PASSED");
}

const helpFn = () => {
  console.log("this is a help function");
};
const treeFn = () => {};

function organizeFn() {
  if (!dirpath) {
    console.log("Undefined path");
    return;
  }
  let doesExits = fs.existsSync(dirpath);
  if (doesExits) {
    const d_path = path.join(dirpath, "organized_files");
    if (!fs.existsSync(d_path)) {
      fs.mkdirSync(d_path);
    }
    let childNames = fs.readdirSync(dirpath);
    for (let indx in childNames) {
      const file = childNames[indx];
      const src_path = path.join(dirpath, file);
      if (fs.lstatSync(src_path).isFile()) {
        const file_ext = path.extname(file).slice(1);
        for (let types in fileTypes) {
          const types_set = fileTypes[types];
          if (types_set.has(file_ext)) {
            const folder_to_be_made = path.join(d_path, types);
            if (!fs.existsSync(folder_to_be_made)) {
              fs.mkdirSync(folder_to_be_made);
            }
            const dest_path = path.join(folder_to_be_made, file);
            fs.copyFileSync(src_path, dest_path);
            fs.rmSync(src_path);
          }
        }
      }
    }
  }
}
