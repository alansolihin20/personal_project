import connectMongoDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Bank from '@/models/data-rekening';

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const bank = await Bank.findOne({ _id: id });
  return NextResponse.json({ bank }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const { newNamaRekening: namaRekening, newAtasnama: atasNama, newNoRekening: noRekening, newTampilInvoice: tampilInvoice } = await request.json();
  try {
    await connectMongoDB();
    const updateBank = await Bank.findByIdAndUpdate(id, { namaRekening, atasNama, noRekening, tampilInvoice });
    if (!updateBank) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User Updated' }, { status: 200 });
  } catch (error) {
    console.error('Error Updating Data', error);
    return NextResponse.json({ message: 'Failed To update Data' }, { status: 500 });
  }
}
