import { Request, Response } from 'express';
import * as goodsService from '../services/products';

export const getAll = async (req: Request, res: Response) => {
  const goods = await goodsService.getAll();

  res.send(goods);
}
