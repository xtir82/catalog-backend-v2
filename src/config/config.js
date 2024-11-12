import dotenv from "dotenv";
import program from "../utils/commander.js";

const { mode } = program.opts();

dotenv.config({
    path: mode === "production" ? "./.env.production" : "./.env.dev"
});

const configObject = {
    mongo_uri: process.env.MONGODB_URI
}

export default configObject;