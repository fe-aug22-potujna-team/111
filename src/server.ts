import express from 'express';
import cors from 'cors';
import { router as productRouter } from './routes/products';
import path from 'path';
import serverless from 'serverless-http';

const router = express.Router();
const API_SUBPATH = '/.netlify/functions/server'
const app = express();

app.use(cors());

app.use(`${API_SUBPATH}/products`, productRouter);

export const handler = serverless(app);

// For development testing:

// app.use('/products', productsRouter);
//
// app.listen(5000, () => {
//   console.log('Server started');
// });
