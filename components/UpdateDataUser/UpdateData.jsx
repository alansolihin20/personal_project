'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserEdit } from 'react-icons/fa';
import { useEffect } from 'react';

export default function UpdateData(data) {
  const [nama_pelanggan, setNama_pelanggan] = useState(data.nama_pelanggan);
  const [alamat_pelanggan, setAlamat_pelanggan] = useState(data.alamat_pelanggan);
  const [tlp, setTlp] = useState(data.tlp);
  const [nik, setNik] = useState(data.nik);
  const [paket, setPaket] = useState(data.paket);
  const [pembayaran_terakhir, setPembayaran_terakhir] = useState(data.pembayaran_terakhir);
  const [status_langganan, setStatus_langganan] = useState(data.status_langganan);
  const [tanggal_registrasi, setTanggal_registrasi] = useState(data.tanggal_registrasi);
  const [modal, setModal] = useState(false);
  const [harga, setHarga] = useState(data.harga);
  const [dataTipes, setDataTipes] = useState([]);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  useEffect(() => {
    const fetchTipe = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/tipe_pembayaran');
        if (res.ok) {
          const dataTipe = await res.json();
          setDataTipes(dataTipe);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchTipe();
  }, []);

  const dataFetch = dataTipes && dataTipes.tipes;

  const handlePaketChange = (e) => {
    const selectedPaket = e.target.value;
    setPaket(selectedPaket); // Menetapkan paket yang dipilih

    // Mencari harga yang sesuai dengan paket yang dipilih
    const selectedTipe = dataFetch.find((tipe) => tipe.namaTipe === selectedPaket);
    if (selectedTipe) {
      setHarga(selectedTipe.harga);
      // Menetapkan harga yang sesuai
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsMutating(true);
    const res = await fetch(`http://localhost:3000/api/users/${data._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        newNama_pelanggan: nama_pelanggan,
        newAlamat_pelanggan: alamat_pelanggan,
        newTlp: tlp,
        newNik: nik,
        newHarga: harga,
        newPaket: paket,
        newPembayaran_terakhir: pembayaran_terakhir,
        newStatus_langganan: status_langganan,
        newTanggal_registrasi: tanggal_registrasi,
      }),
    });

    if (!res.ok) {
      throw Error('Failed to update data');
    }
    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  const formatToRupiah = (harga) => {
    // Mengonversi harga ke string
    const hargaString = harga.toString();

    // Memisahkan angka menjadi kelompok tiga digit
    const parts = hargaString.split('.');
    const sisa = parts[0].length % 3;
    let rupiah = parts[0].substr(0, sisa);
    const ribuan = parts[0].substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    // Menambahkan koma desimal dan nilai desimal jika ada
    rupiah = parts[1] !== undefined ? rupiah + ',' + parts[1] : rupiah;

    // Mengembalikan nilai dalam format Rupiah
    return 'Rp ' + rupiah;
  };

  return (
    <div>
      <button className="btn btn-info btn-xs" onClick={handleChange}>
        <FaUserEdit size={15} />
      </button>
      <input checked={modal} onChange={handleChange} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Data {data.name}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama Pelanggan</label>
              <input value={nama_pelanggan} onChange={(e) => setNama_pelanggan(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Nama Pelanggan" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Alamat Pelanggan</label>
              <input value={alamat_pelanggan} onChange={(e) => setAlamat_pelanggan(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Alamat Pelanggan" />
            </div>
            <div className="form-control">
              <label className="label font-bold">No ID Identitas</label>
              <input value={nik} onChange={(e) => setNik(e.target.value)} type="number" className="w-full text input input-bordered" placeholder="No Id IDentitas" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Tlp</label>
              <input value={tlp} onChange={(e) => setTlp(e.target.value)} type="number" className="w-full text input input-bordered" placeholder="Tlp" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Langganan</label>
              <select className="select select-bordered w-full " value={paket} onChange={handlePaketChange}>
                <option value="" disabled>
                  Langganan
                </option>
                {dataFetch &&
                  dataFetch.map((tipeFetch) => (
                    <option key={tipeFetch._id} value={tipeFetch.namaTipe}>
                      {tipeFetch.namaTipe} {formatToRupiah(tipeFetch.harga)} {tipeFetch.jenisPembayaran}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Pembayaran Terakhir</label>
              <input value={pembayaran_terakhir} onChange={(e) => setPembayaran_terakhir(e.target.value)} type="month" className="w-full text input input-bordered" placeholder="Pembayaran Terakhir" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Status Langganan</label>
              <select className="select select-bordered w-full " value={status_langganan} onChange={(e) => setStatus_langganan(e.target.value)}>
                <option value="" disabled>
                  Status Langganan
                </option>
                <option value="Aktive">Aktive</option>
                <option value="Dismentle">Dismentle</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-bold">Tanggal Registrasi</label>
              <input value={tanggal_registrasi} onChange={(e) => setTanggal_registrasi(e.target.value)} type="date" className="w-full text input input-bordered" placeholder="Tanggal Registrasi" />
            </div>
            <div className="modal-action">
              <button className="btn " type="button" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-accent" type="submit">
                  Save
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Saving....
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
