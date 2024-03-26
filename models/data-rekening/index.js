import mongoose from 'mongoose';

const dataRekening = new mongoose.Schema({
  namaRekening: String,
  atasNama: String,
  noRekening: String,
  tampilInvoice: String,
});

const Bank = mongoose.models.Bank || mongoose.model('Bank', dataRekening);

export default Bank;
