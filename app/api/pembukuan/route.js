import connectMongoDB from '@/lib/mongodb';
import Pembukuan from '@/models/pembukuan';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { namaPembayaran, pemasukan, pengeluaran, total } = await request.json();
    await connectMongoDB();
    await Pembukuan.create({ namaPembayaran, pemasukan, pengeluaran, total });
    return NextResponse.json({ message: 'Add Data Succes' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error Add Data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const Pembukuans = await Pembukuan.find();
  return NextResponse.json({ Pembukuans });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Pembukuan.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
}
