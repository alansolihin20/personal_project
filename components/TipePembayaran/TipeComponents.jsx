import ExportToExcelButton from '../ExportToExcel/ExportExcel';
import AddDataTipe from './Addtipe';
import DeleteDataTipe from './DeleteTipe';
import UpdateDataTipe from './UpdateTipe';

import getTipe from './getTipe';

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

const TipeComponents = async () => {
  const { tipes } = await getTipe();

  return (
    <div className="p-6">
      <div className="flex flex-row gap-5">
        <AddDataTipe />
        <ExportToExcelButton data={tipes} filename={tipes} />
      </div>

      <h1 className="text-2xl font-bold py-6">Data Tipe Pembayaran</h1>
      <div className="border  max-w-screen ">
        <div className="overflow-x-auto shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Id</th>
                <th>Nama Tipe</th>
                <th>Harga</th>
                <th>Keterangan Tipe</th>
                <th>Jenis Pembayaran</th>
                <th>Profile</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tipes.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.idTipe}</td>
                  <td>{data.namaTipe}</td>
                  <td>{formatToRupiah(data.harga)}</td>
                  <td>{data.keteranganTipe}</td>
                  <td>{data.jenisPembayaran}</td>
                  <td>{data.profile}</td>
                  <td className="flex flex-row gap-2">
                    <UpdateDataTipe {...data} />
                    <DeleteDataTipe {...data} />
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

export default TipeComponents;
