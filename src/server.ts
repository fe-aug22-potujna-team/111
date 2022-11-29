import express from 'express';
import cors from 'cors';
import * as goodController from "./controllers/goods";
import * as colorsController from "./controllers/colors";
import serverless from 'serverless-http';

const router = express.Router();

const app = express();

app.use(cors());

router.get('/', (req, res) => {
    res.json({
        'hello': 'hello',
    })
})

router.get('/goods/', goodController.getAll)
router.get('/goods/:goodId', goodController.getOne)
router.post('/goods/', goodController.add);
router.delete('/goods/:goodId', goodController.remove);

router.get('/colors/', colorsController.getAll);
router.get('/colors/:colorId', colorsController.getOne);

app.use('/.netlify/functions/server', router);

export const handler = serverless(app);