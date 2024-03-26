import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';
import Tipe from '@/models/tipe_pembayaran';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { nama_pelanggan, alamat_pelanggan, tlp, harga, pembayaran_terakhir, status_langganan, tanggal_registrasi, nik, paket } = await request.json();
    await connectMongoDB();
    await User.create({ nama_pelanggan, alamat_pelanggan, tlp, harga, pembayaran_terakhir, status_langganan, tanggal_registrasi, nik, paket });
    return NextResponse.json({ message: 'Data Succes' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error Add Data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();

  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
}
