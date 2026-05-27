import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: "Login successful (Mock API)",
      user: {
        id: "1",
        name: "Alina User",
        email: body.email || "user@alina.com",
        role: "user"
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}