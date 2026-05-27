import { NextResponse } from 'next/server';

export async function GET() {
  const dummyUsers = [
    { id: "1", name: "Alina Premium User", email: "premium@alina.com" }
  ];
  
  return NextResponse.json({
    success: true,
    data: dummyUsers
  });
}