import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';
import { stripHtml } from "string-strip-html"
import dotenv from "dotenv"
dotenv.config()

export async function signUp(req, res) {
    const {password} = req.body;
    const username = stripHtml(req.body.username).result.trim();
    const email = stripHtml(req.body.email).result.trim();
    const passwordHash = bcrypt.hashSync(password, parseInt(process.env.HASH));

    await db.collection('users').insertOne({username, email, password: passwordHash })

    res.sendStatus(201);
}

export async function signIn(req, res) {
    const email = stripHtml(req.body.email).result.trim();
    const {password} = req.body;

    const user = await db.collection('users').findOne({ email });
    const name = user.username;

    if (user && bcrypt.compareSync(password, user.password)) {

        const token = uuid();
        await db.collection('sessions').insertOne({ token, userId: user._id });
        const info = {token, name}
        res.send(info);
        
    } else {
        res.sendStatus(401);
    }
}