import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@app/lib/prismadb";

interface Params {
  id?: string;
}

export async function DELETE(
  req: Request, 
  { params }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const reservationId = params.id;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { property: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
};
