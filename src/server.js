
import express from 'express';
import { MongoClient } from 'mongodb';



const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    
    const db =client.db('react-blog-db'); // use react-blog-db
    const article = await db.collection('articles').findOne({name});
    
    if (article) {
        res.json(article);
    }else {
        res.sendStatus(404);
    }

    res.json(article);
});

app.put('/api/articles/:name/upvote',async (req, res) => {
    const { name } = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({name}, {
        $inc:{ upvotes: 1 },
    });

    const article = await db.collection('articles').findOne({name});
    
    if (article){
        article.upvotes += 1;
        res.send(`The ${name} articles now has ${article.upvotes} upvotes`);
    } else{
        res.send('That article doesn\'t exist');
    }
    
});

app.post('/api/articles/:name/comments',(req, res) => {
    const {name} = req.params;
    const {postedBy, text} =req.body;

    const article = articlesInfo.find(a => a.name === name);
    article.comments.push({ postedBy, text });

    if (article){
        article.comments.push({ postedBy, text});
        res.send(article.comments);
    }else {
        res.send('That article doesn\'t exist');
    }
});

app.listen(8000, () =>{
    console.log('Server is listening port 8000');
});