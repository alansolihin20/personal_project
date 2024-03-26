import connectMongoDB from '@/lib/mongodb';
import Tipe from '@/models/tipe_pembayaran';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { idTipe, namaTipe, harga, keteranganTipe, jenisPembayaran, profile } = await request.json();
    await connectMongoDB();
    await Tipe.create({ idTipe, namaTipe, keteranganTipe, harga, jenisPembayaran, profile });
    return NextResponse.json({ message: 'Data Succes' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error Add Data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const tipes = await Tipe.find();

  return NextResponse.json({ tipes });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Tipe.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
}
