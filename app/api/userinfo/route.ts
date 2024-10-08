import prisma from "@/app/hooks/prisma";
import { NextResponse } from "next/server";

// GET request to retrieve all users
export async function GET() {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    
    // Return the users in the response
    return NextResponse.json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}