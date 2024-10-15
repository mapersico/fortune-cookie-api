import { AppInstance } from "./src/app";

const PORT = parseInt(process.env["PORT"] || "", 10) || 3000;


AppInstance.start(PORT);
