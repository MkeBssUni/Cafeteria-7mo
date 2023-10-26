import express, {Application, Request, Response} from 'express';
import cors from 'cors';

const API = "SICAF";
const PORT= 3001;

const app:Application = express();
app.set('port', PORT);

app.use(cors({
    credentials: true,
    origin:'*'
}))

app.use(express.json({limit: '60mb'}));
app.use(express.urlencoded({extended: false}))
app.use(express.static('documents'));

app.get(`/${API}/test`,(req: Request, res: Response)=>res.send("SICAF"))

app.get('*',(req: Request, res: Response)=>res.status(404).send('Not Found'))

export default app;


