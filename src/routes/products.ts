import express from 'express';
import * as productController from '../controllers/products';

export const router = express.Router();

router.get('/newest', productController.getNewestProduct);
router.get('/discount', productController.getBestDiscountProducts);
router.get('/', productController.getAll)
router.get('/:productId', productController.getById)

