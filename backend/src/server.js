import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;
app.listen(port, () =>
console.log(`Mr Peach is listening on port ${port}!`),
);

app.get('/', async (req, res) => {

    try {

        res.status(200).json({
            status: "SUCCESS",
        });   

    } catch (ex) {

        console.log(ex)
        
        res.status(500).json({
            status: "ERROR"
        });

    }
});