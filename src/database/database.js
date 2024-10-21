import { connect } from "mongoose";

connect(process.env.MONGODB_URI, {dbName: "todo-list"})
    .then(() => console.log("Connected to the DB"))
    .catch((error) => console.log("Error to connect to DB"))
