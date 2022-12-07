import {Request, Response} from 'express';
import {SortType} from "../types/SortType";
import {ProductsPerPage} from "../types/ProductsPerPage";
import * as productsServices from '../services/products';

export const getAll = async (req: Request, res: Response) => {
  const sort = req.query.sortType as SortType || SortType.Newest;
  const page = Number(req.query.page) || 1;
  const perPage = req.query.perPage || ProductsPerPage.Sixteen;

  const productsData = await productsServices.getProductsByQuery(
      sort.toLowerCase() as SortType,
      page,
      perPage as ProductsPerPage,
  );

  res.send(productsData);
}

export const getById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = await productsServices.getProductById(productId)

    res.send(productData);
  } catch (err) {
    res.sendStatus(404)
  }

}
