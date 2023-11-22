import express from 'express';
import cors from 'cors';
import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url);


import folderImport from '../utils/folder-import.mjs';
import configGet  from '../utils/config-get.mjs';
const { restPort } = configGet("./config/server.json", {restPort: 8101});

const app = express();


//Limit max request bodies to prevent DoS.
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));

app.use(cors());

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.listen(restPort);




export default async function (params) {

  const { global } = params;
  params.expressApp = app;
  
  const routes = await folderImport(__dirname + '/routes');
  routes.map(route => route.default({app, global}));

  app.listen(restPort);

  //Prevent errors from bubbling up to user.
  //Error handler must always be defined after all routes, and app.use calls.
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('{error: An error has occured.}');
  });
}



