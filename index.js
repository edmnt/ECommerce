import * as dotenv from "dotenv";
import { app } from "./app.js";
import { readFile } from 'fs/promises';
import { creatingServices } from "./routes/createService.js";
import { startDatabase } from "./settings/initDatabase.js";

dotenv.config();
const _CFG = Object.freeze({PORT: process.env.PORT ?? 3000});


const json = JSON.parse(
  await readFile(
    new URL('./services.json', import.meta.url)
  )
);

app.listen(_CFG.PORT, ()=>{
  console.log("Server is listening the port.");
});

await startDatabase();
await creatingServices(json);