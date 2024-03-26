'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

const AddPelangganLunas = (data) => {
  const [bulan, setBulan] = useState('');
  const [metodePembayaran, setMetodePembayaran] = useState('');
  const [dataBank, setDataBank] = useState('');
  const [nominalHarusDibayar, setNominalHarusDibayar] = useState('');
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  useEffect(() => {
    const fetchTipe = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/data_rekening');
        if (res.ok) {
          const dataBank = await res.json();
          setDataBank(dataBank);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchTipe();
  }, []);

  const dataFetchBank = dataBank && dataBank.banks;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resBayar = await fetch('http://localhost:3000/api/data_sudah_bayar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama_pelanggan: data.nama_pelanggan,
          alamat_pelanggan: data.alamat_pelanggan,
          tlp: data.tlp,
          nominalHarusDibayar: data.harga,
          metodePembayaran: metodePembayaran,
          bulan: bulan,
          statusPembayaran: 'Lunas',
          waktu: new Date().toISOString(),
        }),
      });

      if (resBayar.ok) {
        try {
          const resUser = await fetch(`http://localhost:3000/api/users/${data._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              newPembayaran_terakhir: bulan,
            }),
          });
          if (resUser.ok) {
            setBulan('');
          }
        } catch (error) {
          console.error('error', error);
        }

        setIsMutating(false);
        setBulan('');
        setMetodePembayaran('');
        setNominalHarusDibayar('');
        setModal(false);
        router.push('/data-sudah-bayar');
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button className="btn btn-xs" onClick={handleChange}>
        <FaMoneyBillTransfer size={15} />
      </button>
      <input checked={modal} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Pelanggan Lunas</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama Pelanggan</label>
              <input value={`Nama : ${data.nama_pelanggan} Paket : ${data.paket} ${data.harga} `} type="text" className="w-full text input input-bordered" placeholder="Nama Pelanggan" disabled />
            </div>
            <div className="form-control">
              <label className="label font-bold">Untuk Pembayaran Bulan</label>
              <input value={bulan} onChange={(e) => setBulan(e.target.value)} type="month" className="w-full text input input-bordered" placeholder="Bulan" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Metode Pembayaran</label>
              <select className="select select-bordered w-full " value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)}>
                <option value="" disabled>
                  Metode Pembayaran
                </option>

                <option value="Cash/Tunai">Cash/Tunai</option>
                {dataFetchBank &&
                  dataFetchBank.map((bankFetch) => (
                    <option key={bankFetch._id} value={bankFetch.namaTipe}>
                      {bankFetch.namaRekening} {bankFetch.atasNama} {bankFetch.noRekening}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-bold">nominalHarusDibayar</label>
              <input value={data.harga} onChange={(e) => setNominalHarusDibayar(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Bulan" />
            </div>

            <div className="modal-action">
              <button className="btn " type="button" onClick={handleChange} onSubmit={handleSubmit}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-warning" type="submit">
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

export default AddPelangganLunas;
