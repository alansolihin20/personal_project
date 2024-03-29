import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nama_pelanggan: String,
    alamat_pelanggan: String,
    tlp: String,
    harga: String,
    pembayaran_terakhir: String,
    status_langganan: String,
    tanggal_registrasi: String,
    nik: String,
    paket: String,
  },
  { timestamps: true } // Masukkan opsi timestamps di sini
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
