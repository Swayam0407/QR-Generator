/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import { writeFile } from "node:fs";
import inquirer from "inquirer";
import qr from "qr-image";
import { createWriteStream } from "fs";

// Define the questions
const questions = [
  {
    type: "input",
    name: "name",
    message: "Enter URL: ",
  },
];


inquirer
  .prompt(questions)
  .then((answers) => {
    // Use user feedback for... whatever!!

    const url = answers.name;

    writeFile("message.txt", url, "utf8", (err) => {
      if (err) throw err;
    });

    // Create a QR code image and save it as an SVG file
    const qrPng = qr.image(url, { type: "png" });
    qrPng.pipe(createWriteStream("url.png"));

    // Generate a QR code image synchronously as a string
    const PngString = qr.imageSync(url, { type: "png" });

    console.log(`successfully generated QR for: ${url}`); // Optional: log the SVG string to the console
  
})
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt could not be rendered in the current environment");
    } else {
      console.error("An error occurred:", error);
    }
    
  });





