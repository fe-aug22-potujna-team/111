import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as productRouter } from './routes/products';

const router = express.Router();
const API_PATH = '/.netlify/functions/server'
const app = express();

app.use(cors());

app.use(`${API_PATH}/products`, productRouter);

export const handler = serverless(app);

// For development testing:

// app.use('/products', productRouter);
// app.use(express.static('dist'))
//
// app.listen(5000, () => {
//   console.log('Server started');
// });
