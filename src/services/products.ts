import fs from 'fs';
import {Product} from '../types/Product';
import {SortType} from '../types/SortType';
import {ProductsPerPage} from "../types/ProductsPerPage";

const ALL_PHONES_PATH = 'src/api/phones.json';

const getAllProducts = async (path: string): Promise<Product[] | null> => {
  const products = fs.readFileSync(path, 'utf-8');

  return JSON.parse(products);
}

export const getProductsByQuery = async (
    sort: SortType,
    page = 1,
    perPage: ProductsPerPage = ProductsPerPage.TwentyFour
) => {
  let products = await getAllProducts(ALL_PHONES_PATH);
  const productsQuantity = 10

  if (!products) {
    return null;
  }

  products = [...products]
      .sort((productA, productB): number => {
        switch(sort) {
          case SortType.Newest:
            return productA.year - productB.year;

          case SortType.Alphabetically:
            return productA.name.localeCompare(productB.name);

          case SortType.Cheapest:
            return productA.price - productB.price;

          case SortType.Expensive:
            return productB.price - productA.price;

          default:
            return 0
        }
  });

  if (perPage !== ProductsPerPage.All) {
    const numPerPage = +perPage;
    const startIndex = (page - 1) * numPerPage;
    const endIndex = startIndex + numPerPage > products.length
      ? products.length
      : startIndex + numPerPage;

    products = products.slice(startIndex, endIndex);
  }

  return {
    products,
    length: productsQuantity,
  }
}

