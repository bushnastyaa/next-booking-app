import prisma from "@app/lib/prismadb";

interface IParams {
  id?: string;
}

const getProperty = async (params: IParams) => {
  const propertyId = params.id;

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        user: true
      }
    });
  
    if (!property) {
      return null;
    }

    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: { views: { increment: 1 } }
    })

    return {
      ...property,
      user: {
        ...property.user,
        createdAt: property.user.createdAt.toString(),
        updatedAt: property.user.updatedAt.toString(),
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getProperty;
