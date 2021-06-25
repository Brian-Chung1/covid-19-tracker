import prisma from '../../../lib/prisma';
import { validateNewsCursor } from '../../../utils/validateNewsCursor';

export default async (req, res) => {
  const { method } = req;
  const { type } = req.query;

  if (method === 'GET') {
    const articleTypes = ['nytimes', 'cnn', 'latimes', 'all'];

    const articleQuery = type[0];
    const cursor = type[1];

    if (
      !articleQuery ||
      !cursor ||
      type.length > 2 ||
      !validateNewsCursor(cursor)
    ) {
      return res.status(404).json({ error: 'Invalid search query' });
    }

    if (!articleTypes.includes(articleQuery)) {
      return res.status(404).json({ error: 'Invalid search parameter' });
    }

    const skip = cursor === '0' ? 0 : parseInt(cursor) * 10;
    const take = 10;

    if (articleQuery === 'all') {
      const articles = await prisma.article.findMany({
        skip: skip,
        take: take,
      });
      return res.status(200).json(articles);
    } else {
      const articles = await prisma.article.findMany({
        skip: skip,
        take: take,
        where: {
          type: articleQuery,
        },
      });
      return res.status(200).json(articles);
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
