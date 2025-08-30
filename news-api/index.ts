import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
