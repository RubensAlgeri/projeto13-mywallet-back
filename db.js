import { MongoClient } from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

const db = mongoClient.db(process.env.BANCO);
console.log(chalk.bold.blue("Banco de dados MongoDB conectado!"));
export default db;