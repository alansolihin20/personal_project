'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserEdit } from 'react-icons/fa';

const UpdateDataTipe = (data) => {
  const [namaTipe, setNamaTipe] = useState(data.namaTipe);
  const [harga, setHarga] = useState(data.harga);
  const [keteranganTipe, setKeteranganTipe] = useState(data.keteranganTipe);
  const [jenisPembayaran, setJenisPembayaran] = useState(data.jenisPembayaran);
  const [profile, setProfile] = useState(data.profile);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/tipe_pembayaran/${data._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newNamaTipe: namaTipe,
          newHarga: harga,
          newJenisPembayaran: jenisPembayaran,
          newKeteranganTipe: keteranganTipe,
          newProfile: profile,
        }),
      });

      if (!res.ok) {
        throw Error('Failed to Update Data');
      }
      setIsMutating(false);
      router.refresh();
      setModal(false);
    } catch (error) {}
  };

  return (
    <div>
      <button className="btn btn-info btn-xs" onClick={handleChange}>
        <FaUserEdit size={15} />
      </button>
      <input checked={modal} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Data Tipe Pembayaran</h3>
          <form onSubmit={handleSubmit}>
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
              <input value={jenisPembayaran} onChange={(e) => setJenisPembayaran(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Jenis Pembayaran" />
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

export default UpdateDataTipe;
