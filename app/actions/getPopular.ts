import prisma from "@app/lib/prismadb";

const getPopular = async () => {
  try {
    const properties = await prisma.property.findMany({
      take: 4,
      orderBy: {
        views: 'desc',
      },
    })

    return properties;
  } catch (error: any) {
    throw new Error(error)
  }
};

export default getPopular;
