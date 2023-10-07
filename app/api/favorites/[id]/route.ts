import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@app/actions/getCurrentUser";
import prisma from "@app/lib/prismadb";

export const POST = async (req: NextRequest, { params }: { params: { id: number } }) => {
  const propertyId = params.id;
  const currentUser = await getCurrentUser();

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (!currentUser) {
    return NextResponse.error();
  }
 
  try {
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(propertyId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }) => {
  const propertyId = params.id;
  const currentUser = await getCurrentUser();

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== propertyId);
  
    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
