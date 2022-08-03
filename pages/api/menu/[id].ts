// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import {Product} from '../../types';
import allMenus from './data.json'

export type ProductResponse = {
  products: Array<Product>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>
) {
  const id = req.query.id as string;

  const selectedMenu = allMenus.menus.find(m => m.id == parseInt(id));

  res.status(200).json(selectedMenu ?? {products: []});
}
