import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import categoriesRoutes from "../modules/categories/adapters/categories.routes"
import productsRoutes from "../modules/products/adapters/products.routes"
import discountsRoutes from "../modules/discounts/adapters/discount.routes"
import usersRoutes from "../modules/users/adapters/users.routes"
import * as dotenv from 'dotenv';
import orderRoutes from "../modules/orders/adapters/order.routes"
import providersRoutes from "../modules/providers/adapters/providers.routes"

dotenv.config()

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

app.use(`/${API}/categories`,categoriesRoutes)
app.use(`/${API}/products`,productsRoutes)
app.use(`/${API}/discounts`,discountsRoutes)
app.use(`/${API}/providers`,providersRoutes)
app.use(`/${API}/orders`,orderRoutes)
app.use(`/${API}/users`,usersRoutes)

app.get('*',(req: Request, res: Response)=>res.status(404).send('Not Found'))

export default app;
