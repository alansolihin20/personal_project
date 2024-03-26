'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AddData = () => {
  const [nama_pelanggan, setNama_pelanggan] = useState('');
  const [alamat_pelanggan, setAlamat_pelanggan] = useState('');
  const [tlp, setTlp] = useState('');
  const [nik, setNik] = useState('');
  const [harga, setHarga] = useState('');
  const [pembayaran_terakhir, setPembayaran_terakhir] = useState('');
  const [status_langganan, setStatus_langganan] = useState('');
  const [tanggal_registrasi, setTanggal_registrasi] = useState('');
  const [paket, setPaket] = useState('');
  const [modal, setModal] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama_pelanggan || !paket || !alamat_pelanggan || !tlp || !nik || !tanggal_registrasi) {
      alert('Error');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama_pelanggan: nama_pelanggan,
          alamat_pelanggan: alamat_pelanggan,
          paket: paket,
          tlp: tlp,
          harga: harga,
          pembayaran_terakhir: 'Belum Ada Pembayaran',
          status_langganan: 'Aktive',
          tanggal_registrasi: tanggal_registrasi,
          nik: nik,
        }),
      });

      if (res.ok) {
        setIsMutating(false);
        setNama_pelanggan('');
        setAlamat_pelanggan('');
        setPaket('');
        setTlp('');
        setNik('');
        setHarga('');
        setStatus_langganan('');
        setTanggal_registrasi('');
        router.refresh();
        setModal(false);
      }
    } catch (error) {}
  };

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

  formatToRupiah(harga);

  return (
    <div>
      <button className="btn btn-info" onClick={handleChange}>
        Add New
      </button>
      <input checked={modal} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add User</h3>
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
              <label className="label font-bold">No Tlp/WA</label>
              <input value={tlp} onChange={(e) => setTlp(e.target.value)} type="number" className="w-full text input input-bordered" placeholder="No Tlp/WA" />
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
};

export default AddData;
