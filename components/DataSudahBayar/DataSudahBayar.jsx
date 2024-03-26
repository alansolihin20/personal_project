import React from 'react';
import getLunas from './getLunas';
import DeleteData from './Delete';
import { format } from 'date-fns';
import Invoice from '../Invoice/Invoice';

const DataSudahBayar = async () => {
  const { lunas } = await getLunas();

  function getMonth(isoDate) {
    const date = new Date(isoDate + '-01');
    const options = { month: 'long' };
    return date.toLocaleDateString('id-ID', options);
  }

  const formatToRupiah = (amount) => {
    // Mengubah nilai menjadi bilangan desimal dan mengatur jumlah digit desimal maksimum ke 0
    let formattedAmount = parseFloat(amount).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    });

    // Menghapus karakter koma jika ada
    formattedAmount = formattedAmount.replace(',', '');

    return formattedAmount;
  };

  function dateFns(isoString) {
    return format(new Date(isoString), "dd MMMM yyyy 'Pukul' hh:mm:ss aa");
  }
  return (
    <div className="p-6">
      <div className="flex flex-row gap-5">
        {/* <AddDataTipe />
    <ExportToExcelButton data={tipes} filename={tipes} /> */}
      </div>

      <h1 className="text-2xl font-bold py-6">Data Pelanggan Lunas</h1>
      <div className="border  max-w-screen ">
        <div className="overflow-x-auto shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pelanggan</th>
                <th>Alamat Pelanggan</th>
                <th>Tlp</th>
                <th>Nominal Harus Dibayar</th>
                <th>Metode Pembayaran</th>
                <th>Bulan</th>
                <th>Status Pembayaran</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {lunas.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.nama_pelanggan}</td>
                  <td>{data.alamat_pelanggan}</td>
                  <td>{data.tlp}</td>
                  <td>{formatToRupiah(data.nominalHarusDibayar)}</td>
                  <td>{data.metodePembayaran}</td>
                  <td>{getMonth(data.bulan)}</td>
                  <td>{data.statusPembayaran}</td>
                  <td>{dateFns(data.waktu)}</td>
                  <td className="flex flex-row gap-2">
                    <DeleteData {...data} />
                    <Invoice {...data} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataSudahBayar;
