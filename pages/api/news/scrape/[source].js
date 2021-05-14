import {
  fetchNYTimes,
  fetchLATimes,
  fetchCNN,
} from '../../../../utils/webscrape';
import verifyAuth from '../../../../utils/middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(400).json({ error: 'Only POST requests allowed' });
  }

  const { source } = req.query;
  const articleTypes = ['nytimes', 'cnn', 'latimes'];

  if (!articleTypes.includes(source)) {
    return res.status(404).json({ error: 'Invalid search parameter' });
  }

  let data;

  if (source === 'nytimes') {
    data = await fetchNYTimes();
  } else if (source === 'cnn') {
    data = await fetchCNN();
  } else if (source === 'latimes') {
    data = await fetchLATimes();
  }

  try {
    await prisma.article.createMany({
      data,
      skipDuplicates: true,
    });
  } catch (e) {
    throw e;
  }

  await prisma.$disconnect();

  return res.status(201).end();
};

export default verifyAuth(handler);
