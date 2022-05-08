import express from 'express';
import router from './routes/index.js';

const app = express();
app.use(express.json());

app.use(router);
const porta = process.env.PORTA
app.listen(porta, () => {
    console.log(`Server is listening on port ${porta}.`);
});