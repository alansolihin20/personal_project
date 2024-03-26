'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddDataTipe = () => {
  const [idTipe, setIdTipe] = useState('');
  const [namaTipe, setNamaTipe] = useState('');
  const [harga, setHarga] = useState('');
  const [keteranganTipe, setKeteranganTipe] = useState('');
  const [jenisPembayaran, setJenisPembayaran] = useState('');
  const [profile, setProfile] = useState('');
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idTipe || !namaTipe || !harga || !keteranganTipe || !jenisPembayaran || !profile) {
      alert('Error');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/tipe_pembayaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idTipe: idTipe,
          namaTipe: namaTipe,
          harga: harga,
          keteranganTipe: keteranganTipe,
          jenisPembayaran: jenisPembayaran,
          profile: profile,
        }),
      });

      if (res.ok) {
        setIsMutating(false);
        setIdTipe('');
        setNamaTipe('');
        setHarga('');
        setKeteranganTipe('');
        setJenisPembayaran('');
        setProfile('');
        router.refresh();
        setModal(false);
      }
    } catch (error) {}
  };

  return (
    <div>
      <button className="btn btn-info" onClick={handleChange}>
        Add New
      </button>
      <input checked={modal} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Data</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">ID Tipe</label>
              <input value={idTipe} onChange={(e) => setIdTipe(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Id Tipe" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Nama Tipe</label>
              <input value={namaTipe} onChange={(e) => setNamaTipe(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Nama Tipe" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Harga</label>
              <input value={harga} onChange={(e) => setHarga(e.target.value)} type="number" className="w-full text input input-bordered" placeholder="Harga" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Keterangan Tipe</label>
              <input value={keteranganTipe} onChange={(e) => setKeteranganTipe(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Keterangan Tipe" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Jenis Pembayaran</label>
              <select className="select select-bordered w-full " value={jenisPembayaran} onChange={(e) => setJenisPembayaran(e.target.value)}>
                <option value="" disabled>
                  Jenis Pembayaran
                </option>
                <option value="Wajib Tiap Bulan">Wajib Tiap Bulan</option>
                <option value="Tidak Wajib Tiap Bulan">Tidak Wajib Tiap Bulan</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold">Profil</label>
              <input value={profile} onChange={(e) => setProfile(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Profil" />
            </div>

            <div className="modal-action">
              <button className="btn " type="button" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-ghost" type="submit">
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

export default AddDataTipe;
