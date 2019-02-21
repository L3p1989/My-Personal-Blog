import * as path from "path";
import * as express from "express";
import apiRouter from "./routes";
import * as favIcon from "serve-favicon";

const app = express();

app.use(favIcon(path.join(__dirname, "../public/favicon.ico")));

let p = path.join(__dirname, "../public");
console.log(p);

app.use(express.static(p));
app.use(express.json());
app.use(apiRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
