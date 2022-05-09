import db from "../db.js";
import { ObjectId } from "mongodb";

export async function getRecords(req, res) {

    const { user } = res.locals;

    delete user.password;

    const records = await db.collection("records").find({ id: user._id }).toArray();

    const entradas = records.filter(item => item.type === 'entrada')
    const saidas = records.filter(item => item.type === 'saída')
    let saldo = 0;
    let balance;
    entradas.map(item => item.value = (item.value.replace(',', '.')))
    saidas.map(item => item.value = item.value.replace(',', '.'))
    entradas.forEach(item => saldo += 1 * item.value)
    saidas.forEach(item => saldo -= 1 * item.value)
    if (saldo < 0) balance = { balance: (saldo * -1).toFixed(2), type: "saída" };
    if (saldo > 0) balance = { balance: (saldo).toFixed(2), type: "entrada" }
    res.send({records, balance});
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

    await db.collection('records').updateOne({
        _id: new ObjectId(id)
    }, {
        $set: newRecord
    });

    res.sendStatus(200);
}

export async function deleteRecord(req, res) {
    const id = req.params;

    await db.collection('records').deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(200);
}