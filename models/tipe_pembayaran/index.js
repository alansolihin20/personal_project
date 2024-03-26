import mongoose from 'mongoose';

const tipePembayaran = new mongoose.Schema({
  idTipe: String,
  namaTipe: String,
  harga: String,
  keteranganTipe: String,
  jenisPembayaran: String,
  profile: String,
});

const Tipe = mongoose.models.Tipe || mongoose.model('Tipe', tipePembayaran);

export default Tipe;
