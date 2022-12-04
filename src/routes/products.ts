import express from 'express';
import * as goodController from '../controllers/products';

export const router = express.Router();

router.get('/', goodController.getAll)

