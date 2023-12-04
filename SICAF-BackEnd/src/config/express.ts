import * as dotenv from 'dotenv'
import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import categoriesRoutes from "../modules/categories/adapters/categories.routes"
import productsRoutes from "../modules/products/adapters/products.routes"
import discountsRoutes from "../modules/discounts/adapters/discount.routes"
import orderRoutes from "../modules/orders/adapters/order.routes"
import providersRoutes from "../modules/providers/adapters/providers.routes"

dotenv.config()

const API = process.env.API;
const PORT= process.env.PORT;

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

app.use(`/${API}/categories`,categoriesRoutes)
app.use(`/${API}/products`,productsRoutes)
app.use(`/${API}/discounts`,discountsRoutes)
app.use(`/${API}/orders`,orderRoutes)
app.use(`/${API}/providers`,providersRoutes)

app.get('*',(req: Request, res: Response)=>res.status(404).send('Not Found'))

export default app;


