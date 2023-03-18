import app from './app';
import express from "express";
import env from './util/validateEnv'
import mongoose from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const port = env.PORT;
app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
})
mongoose.connect(env.MONGO_URI)
     .then(() => {
          console.log("MONGOOSE CONNECTED");
          app.listen(port, () => {
               console.log("server running at port " + port);
          });
     })
     .catch(console.error);
