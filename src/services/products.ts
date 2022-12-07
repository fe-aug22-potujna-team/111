import fs from 'fs';
import {Product} from '../types/Product';
import {SortType} from '../types/SortType';
import {ProductsPerPage} from "../types/ProductsPerPage";

const ALL_PHONES_PATH = 'src/api/phones.json';
const EXTEND_PHONES_PATH = 'src/api/phones/';

const readJsonFile = async (path: string): Promise<Product[] | null> => {
  const data = fs.readFileSync(path, 'utf-8');

  return JSON.parse(data);
}

export const getProductsByQuery = async (
    sort: SortType,
    page = 1,
    perPage: ProductsPerPage = ProductsPerPage.TwentyFour
) => {
  let products = await readJsonFile(ALL_PHONES_PATH);
  const productsQuantity = products && products.length;

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

export const getProductById = async (productId: string) => {
  let product = await readJsonFile(`${EXTEND_PHONES_PATH}${productId}.json`)

  return product
}

export const getNewest = async () => {
  let products = await readJsonFile(ALL_PHONES_PATH);
  const length = products && products.length

  if (products) {
    products = [...products]
        .sort((productA: Product, productB: Product) => (
            productB.year - productA.year
        ))
  }

  if (products && length !== null && length > 8) {
    return products.slice(0, 8);
  }

  if (products && length !== null && length > 8) {
    return products
  }

  return null
}

export const getBestPrice = async () => {
  let products = await readJsonFile(ALL_PHONES_PATH);
  const length = products && products.length

  if (products) {
    products = [...products]
        .sort((productA: Product, productB: Product) => (
            (productB.fullPrice - productB.price)
            - (productA.fullPrice - productA.price)
        ))
  }

  if (products && length !== null && length > 8) {
    return products.slice(0, 8);
  }

  if (products && length !== null && length > 8) {
    return products
  }

  return null
}

