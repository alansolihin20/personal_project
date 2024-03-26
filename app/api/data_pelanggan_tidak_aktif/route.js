import connectMongoDB from '@/lib/mongodb';
import UserNotActive from '@/models/pelanggan_tidak_aktif';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { nama_pelanggan, alamat_pelanggan, tlp, harga, pembayaran_terakhir, status_langganan, tanggal_registrasi, nik, paket } = await request.json();
    await connectMongoDB();
    await UserNotActive.create({ nama_pelanggan, alamat_pelanggan, tlp, harga, pembayaran_terakhir, status_langganan, tanggal_registrasi, nik, paket });
    return NextResponse.json({ message: 'Data Succes' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error Add Data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const users = await UserNotActive.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await UserNotActive.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
}
