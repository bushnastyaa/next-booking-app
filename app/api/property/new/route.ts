import { NextRequest, NextResponse } from "next/server";
import prisma from "@app/lib/prismadb";
import getCurrentUser from "@app/actions/getCurrentUser";

export const POST = async (req: NextRequest) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  
  const body = await req.json();
  const { 
    name,
    category,
    location,
    address,
    imageSrc,
    title,
    desc,
    roomCount,
    bathroomCount,
    guestCount,
    price,
  } = body;

  try {
    const newProperty = await prisma.property.create({
      data: {
        name,
        category,
        location,
        address,
        imageSrc,
        title,
        desc,
        roomCount,
        bathroomCount,
        guestCount,
        userId: currentUser.id,
        price: parseInt(price, 10),
      }
    });

    return NextResponse.json(newProperty, { status: 200 }) 
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
