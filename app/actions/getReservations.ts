import prisma from "@app/lib/prismadb";

interface Params {
  propertyId?: string;
  userId?: string;
}

export default async function getReservations(params: Params) {
  try {
    const { propertyId, userId } = params;

    const query: any = {};
        
    if (propertyId) {
      query.propertyId = propertyId;
    };

    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        property: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      property: {
        ...reservation.property
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};
