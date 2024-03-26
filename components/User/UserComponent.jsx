import AddData from '../AddDataUser/AddData';
import AddPelangganLunas from '../DataSudahBayar/AddPelangganLunas';
import DeleteData from '../DeleteData/DeleteData';
import DetailData from '../DetailDataUser/DetailData';
import ExportToExcelButton from '../ExportToExcel/ExportExcel';
import UpdateData from '../UpdateDataUser/UpdateData';
import Link from 'next/link';

const getUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed To Fetch User');
    }

    return res.json();
  } catch (error) {
    console.log('Error Loading User', error);
  }
};

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

function getMonth(isoDate) {
  const date = new Date(isoDate + '-01');
  const options = { month: 'long' };
  return date.toLocaleDateString('id-ID', options);
}

const UserComponents = async () => {
  const { users } = await getUser();
  return (
    <div className="p-6 ">
      <div className="flex gap-5 max-sm:flex-col max-sm:gap-2">
        <AddData />
        <ExportToExcelButton data={users} filename={users} />
        <Link href={'/user/data-pelanggan-tidak-aktif'} className="btn btn-error">
          Pelanggan Tidak Aktip
        </Link>
      </div>

      <h1 className="text-2xl font-bold py-6">Data Pelanggan</h1>
      <div className="border  max-w-screen ">
        <div className="overflow-x-auto shadow-sm">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pelanggan</th>
                <th>Alamat Pelanggan</th>
                <th>No ID Identitas</th>
                <th>Paket</th>
                <th>Tlp</th>
                <th>Harga</th>
                <th>Pembayaran Terakhir</th>
                <th>Status Langganan</th>
                <th>Tanggal Registrasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            {users.map((data, index) => (
              <tbody key={data._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.nama_pelanggan}</td>
                  <td>{data.alamat_pelanggan}</td>
                  <td>{data.nik}</td>
                  <td>{data.paket}</td>
                  <td>{data.tlp}</td>
                  <td>{formatToRupiah(data.harga)}</td>
                  <td>{getMonth(data.pembayaran_terakhir)}</td>
                  <td>{data.status_langganan}</td>
                  <td>{data.tanggal_registrasi}</td>
                  <td className="flex w-32  flex-wrap gap-2">
                    <AddPelangganLunas {...data} />
                    <UpdateData {...data} />
                    <DetailData {...data} />
                    <DeleteData {...data} />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserComponents;
