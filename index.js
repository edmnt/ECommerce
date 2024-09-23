import { app } from "./app.js";
import { readFile } from 'fs/promises';
import { creatingServices } from "./routes/createService.js";
import { startDatabase } from "./settings/initDatabase.js";
import { _CFG } from "./app.js";
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
import fs from "fs"

const json = JSON.parse(
  await readFile(
    new URL('./services.json', import.meta.url)
  )
);

// const options = {
//   definition: {
//       openapi: '3.0.0',
//       info: {
//           title:'E Commerce App',
//           version: '1.0.0',
//           description: "Backend API project for e-commerce"
//       },
//       servers: [
//           {
//               url: `http://localhost:${_CFG.PORT}`
//           }
//       ]
//   },
//   apis: ["./routes/*.js"]
// }

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(_CFG.PORT, ()=>{
  console.log("Server is listening the port.");
});

await startDatabase();
await creatingServices(json);