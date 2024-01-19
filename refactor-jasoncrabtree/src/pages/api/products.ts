import { getDBProducts } from '@/utils/data-loading';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  products?: {};
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const productData = getDBProducts();

    res.status(200).json({
      message: 'Products successfully loaded',
      products: productData,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to load products',
    });
  }
}
