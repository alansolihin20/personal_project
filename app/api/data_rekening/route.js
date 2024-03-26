import connectMongoDB from '@/lib/mongodb';
import Bank from '@/models/data-rekening';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { namaRekening, atasNama, noRekening, tampilInvoice } = await request.json();
    await connectMongoDB();
    await Bank.create({ namaRekening, atasNama, tampilInvoice, noRekening });
    return NextResponse.json({ message: 'Data Succes' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error Add Data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const banks = await Bank.find();
  return NextResponse.json({ banks });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Bank.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
}
