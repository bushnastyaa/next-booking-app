import { NextResponse } from "next/server";

import prisma from "@app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { 
    propertyId,
    startDate,
    endDate,
    totalPrice
   } = body;

   if (!propertyId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const reservation = await prisma.property.update({
    where: {
      id: propertyId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(reservation);
};
