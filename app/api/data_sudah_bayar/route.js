import Lunas from '@/models/pelanggan_lunas';
import connectMongoDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { nama_pelanggan, alamat_pelanggan, tlp, nominalHarusDibayar, bulan, statusPembayaran, waktu, metodePembayaran } = await request.json();
    await connectMongoDB();

    await Lunas.create({ nama_pelanggan, alamat_pelanggan, tlp, nominalHarusDibayar, bulan, statusPembayaran, waktu, metodePembayaran });
    return NextResponse.json({ message: 'Data Succes' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error Add Data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const lunas = await Lunas.find();
  return NextResponse.json({ lunas });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Lunas.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
}
