import prisma from '../../../lib/prisma';

export default async (req, res) => {
  const { method } = req;
  const { type } = req.query;

  if (method === 'GET') {
    const articleTypes = ['nytimes', 'cnn', 'latimes', 'all'];

    if (!articleTypes.includes(type)) {
      return res.status(404).json({ error: 'Invalid search parameter' });
    }

    if (type === 'all') {
      const articles = await prisma.article.findMany({});
      return res.status(200).json(articles);
    } else {
      const articles = await prisma.article.findMany({
        where: {
          type: type,
        },
      });
      return res.status(200).json(articles);
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
