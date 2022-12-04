import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

const phones_path = 'src/api/phones.json'

export const getAll = async () => {
  const phones_path = 'src/api/phones.json'
  // @ts-ignore
  const products = fs.readFileSync(phones_path, 'utf-8');

  // @ts-ignore
  return JSON.parse(products);
}

