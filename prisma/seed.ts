import prisma from '../src/prisma';

async function main() {
  console.log('🌱 Seeding database with Prisma...');

  // Limpar tabelas
  await prisma.postCategory.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: '123456',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
    ],
  });

  // Seed Categories
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'Inovação' },
      { id: 2, name: 'Escola' },
    ],
  });

  // Seed BlogPosts
  await prisma.blogPost.createMany({
    data: [
      {
        id: 1,
        title: 'Post do Ano',
        content: 'Melhor post do ano',
        userId: 1,
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:51.000Z'),
      },
      {
        id: 2,
        title: 'Vamos que vamos',
        content: 'Foguete não tem ré',
        userId: 1,
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:51.000Z'),
      },
    ],
  });

  // Seed PostsCategories
  await prisma.postCategory.createMany({
    data: [
      { postId: 1, categoryId: 1 },
      { postId: 2, categoryId: 2 },
    ],
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
