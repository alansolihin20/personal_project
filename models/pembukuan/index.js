import mongoose from 'mongoose';

const pembukuan = new mongoose.Schema({
  namaPembayaran: String,
  pemasukan: String,
  pengeluaran: String,
  total: String,
});

const Pembukuan = mongoose.models.Pembukuan || mongoose.model('Pembukuan', pembukuan);

export default Pembukuan;
