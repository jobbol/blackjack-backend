import express from 'express';
import contentType from 'content-type';
import getRawBody  from 'raw-body';
import bodyParser from 'body-parser';

import folderImport from '../utils/folder-import.mjs';
import configGet  from '../utils/config-get.mjs';
const { restPort } = configGet("./config/server.json", {restPort: 8101});

const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

//Limit max request bodies to prevent DoS.
app.use(function (req, res, next) {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1kb',
      encoding: contentType.parse(req).parameters.charset
    }, function (err, string) {
      if (err) return next(err)
      req.text = string
      next()
    })
});


//Limit max request bodies to prevent DoS.
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));




export default function ({global}) {
    app.get('/', (req, res) => {
        res.send('hello world');
    });
    app.listen(restPort)
}

const routes = folderImport('./rest/routes');
console.log(routes);


//Prevent errors from bubbling up to user.
//Error handler must always be defined after all routes, and app.use calls.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('{error: An error has occured.}');
 });
