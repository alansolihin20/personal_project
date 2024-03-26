import mongoose from 'mongoose';

const pelangganLunas = new mongoose.Schema({
  nama_pelanggan: String,
  alamat_pelanggan: String,
  tlp: String,
  nominalHarusDibayar: String,
  bulan: { type: String, unique: true },
  statusPembayaran: String,
  metodePembayaran: String,
  waktu: String,
});

const Lunas = mongoose.models.Lunas || mongoose.model('Lunas', pelangganLunas);

export default Lunas;
