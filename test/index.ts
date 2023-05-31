import { PrismaClient, User } from '@prisma/client';
import { Template, PrismaQueryTemplates } from '../src/index';

const prisma = new PrismaClient();
const queryTemplates = new PrismaQueryTemplates(prisma);

const userTemplate: Template<User> = (selectQuery) => ({
  ...selectQuery,
});

async function getUserData() {
  const selectQuery = queryTemplates.createTemplate(userTemplate);

  const userData = await prisma.user.findMany(selectQuery);
  console.log(userData)
}

getUserData();
