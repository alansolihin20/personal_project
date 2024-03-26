import connectMongoDB from '@/lib/mongodb';
import Lunas from '@/models/pelanggan_lunas';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const lunas = await Lunas.findOne({ _id: id });
  return NextResponse.json({ lunas }, { status: 200 });
}
