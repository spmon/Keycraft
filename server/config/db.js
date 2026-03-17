import mongoose from "mongoose";

async function connect() {
  if (!process.env.DB_CONNECTION) {
    console.log("no connection!");
    return;
  }
  await mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("connected to the database");
    return; 
  })
  .catch((err) => {
    console.log(err);
    return;
  })
}

export {
  connect,
}