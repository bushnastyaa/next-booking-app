import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@app/lib/prismadb";

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json(newUser, { status: 200 }) 
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
