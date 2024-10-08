

import prisma from "@/app/hooks/prisma";

export async function POST(req: Request) {
  try {
    const { email, fullName, department, faculty, course, receipt, faceData} = await req.json();

    // Check if required fields are provided
    if (!email || !fullName || !department || !faculty || !course || !receipt) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      // If no user exists, return error
      return new Response(JSON.stringify({ error: 'Account not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the existing user with new details
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        fullName,
        department,
        faculty,
        course,
        receipt,
        faceData,
      },
    });

    // Return success response with updated user data
    return new Response(JSON.stringify({ message: 'Account updated successfully', user: updatedUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating account:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
