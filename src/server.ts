import app from './app';
import env from './util/validateEnv'
import mongoose from "mongoose";
const port = env.PORT;

mongoose.connect(env.MONGO_URI)
     .then(() => {
          console.log("MONGOOSE CONNECTED");
          app.listen(port, () => {
               console.log("server running at port " + port);
          });
     })
     .catch(console.error);
