//express parameters
import express from 'express';
const app = express();

app.use(express.json());

app.post('/hello', (req, res) => {
    console.log(req.body);
    res.send(`Hello ${req.body.name}!`);
});

app.get('/hello/:name', (req, res) => {
    const{name}= req.params;
    res.send(`Hello ${name}!!`);
});

app.listen(8000, () =>{
    console.log('Server is listening port 8000');
});