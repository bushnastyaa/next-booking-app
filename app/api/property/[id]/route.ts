import { NextRequest, NextResponse } from "next/server";
import prisma from "@app/lib/prismadb";
import getCurrentUser from "@app/actions/getCurrentUser";

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
  const propertyId = params.id;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }
    
  try {
    const properties = await prisma.property.deleteMany({
      where: {
        id: propertyId,
        userId: currentUser.id
      }
    });

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
