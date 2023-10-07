import getCurrentUser from "@app/actions/getCurrentUser";
import prisma from "@app/lib/prismadb";

const getFavorites = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }
 
  try {
    const favorites = await prisma.property.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavorites;
