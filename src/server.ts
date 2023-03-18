import app from './app';
import express from "express";
import env from './util/validateEnv'
import mongoose from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const port = env.PORT;

mongoose.connect(env.MONGO_URI)
     .then(() => {
          console.log("MONGOOSE CONNECTED");
          app.listen(port, () => {
               console.log("server running at port " + port);
          });
     })
     .catch(console.error);
