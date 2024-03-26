import connectMongoDB from '@/lib/mongodb';
import Tipe from '@/models/tipe_pembayaran';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const { newIdTipe: idTipe, newNamaTipe: namaTipe, newHarga: harga, newKeteranganTipe: keteranganTipe, newJenisPembayaran: jenisPembayaran, newProfile: profile } = await request.json();
  await connectMongoDB();
  await Tipe.findByIdAndUpdate(id, { idTipe, namaTipe, harga, keteranganTipe, jenisPembayaran, profile });
  return NextResponse.json({ message: 'User Updated' }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const tipe = await Tipe.findOne({ _id: id });
  return NextResponse.json({ tipe }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const { newIdTipe: idTipe, newNamaTipe: namaTipe, newHarga: harga, newKeteranganTipe: keteranganTipe, newJenisPembayaran: jenisPembayaran, newProfile: profile } = await request.json();
  try {
    await connectMongoDB();
    const updateTipe = await Tipe.findByIdAndUpdate(id, { idTipe, namaTipe, harga, keteranganTipe, jenisPembayaran, profile });
    if (!updateTipe) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User Updated' }, { status: 200 });
  } catch (error) {
    console.error('Error Updating Data', error);
    return NextResponse.json({ message: 'Failed To update Data' }, { status: 500 });
  }
}
