import db from "../db.js";
import { ObjectId } from "mongodb";

export async function getRecords(req, res) {

    const { user } = res.locals;

    delete user.password;

    const records = await db.collection("records").find({ id: user._id }).toArray();

    res.send(records);
}

export async function postRecord(req, res) {

    const { user } = res.locals;

    delete user.password;

    await db.collection('records').insertOne({ ...req.body, id: user._id })
    res.sendStatus(201)
}

export async function updateRecord(req, res) {
    const newRecord = req.body;
    const id = req.params;
    console.log({newRecord}, {id})

    const { user } = res.locals;

    await db.collection('records').updateOne({
        _id: new ObjectId(id)
    }, {
        $set: newRecord
    });

    res.sendStatus(200);
}

export async function deleteRecord(req, res) {

    const { user } = res.locals;

    await db.collection('records').deleteOne({ _id: user.userId });

    res.sendStatus(200);
}