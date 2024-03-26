import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newNama_pelanggan: nama_pelanggan,
    newAlamat_pelanggan: alamat_pelanggan,
    newTlp: tlp,
    newNik: nik,
    newHarga: harga,
    newPembayaran_terakhir: pembayaran_terakhir,
    newStatus_langganan: status_langganan,
    newTanggal_registrasi: tanggal_registrasi,
    newPaket: paket,
  } = await request.json();
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { nama_pelanggan, alamat_pelanggan, tlp, nik, harga, pembayaran_terakhir, status_langganan, tanggal_registrasi, paket });
  return NextResponse.json({ message: 'User Updated' }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const {
    newNama_pelanggan: nama_pelanggan,
    newAlamat_pelanggan: alamat_pelanggan,
    newTlp: tlp,
    newNik: nik,
    newHarga: harga,
    newPembayaran_terakhir: pembayaran_terakhir,
    newStatus_langganan: status_langganan,
    newTanggal_registrasi: tanggal_registrasi,
    newPaket: paket,
  } = await request.json();
  try {
    connectMongoDB();
    const updateUser = await User.findByIdAndUpdate(id, { nama_pelanggan, alamat_pelanggan, tlp, nik, harga, pembayaran_terakhir, status_langganan, tanggal_registrasi, paket }, { new: true });
    if (!updateUser) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User Updated' }, { user: updateUser }, { status: 200 });
  } catch (error) {
    console.error('Error Updating Data', error);
    return NextResponse.json({ message: 'Failed To update User' }, { status: 500 });
  }
}
