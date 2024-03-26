import AktipKembali from './AktipKembali';
import DeleteData from './DeleteData';

const getUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/data_pelanggan_tidak_aktif', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed To Fetch User');
    }

    return res.json();
  } catch (error) {
    console.log('Error Loading User', error);
  }
};

const PelangganTidakAktip = async () => {
  const { users } = await getUser();
  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold py-6">Data Pelanggan Tidak Aktip</h1>
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
                  <td>{data.pembayaran_terakhir}</td>
                  <td>{data.status_langganan}</td>
                  <td>{data.tanggal_registrasi}</td>
                  <td className="flex w-32  flex-wrap gap-2">
                    <DeleteData {...data} />
                    <AktipKembali {...data} />
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

export default PelangganTidakAktip;
