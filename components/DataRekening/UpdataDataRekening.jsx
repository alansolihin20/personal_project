'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserEdit } from 'react-icons/fa';

const UpdateDataRekening = (data) => {
  const [namaRekening, setNamaRekening] = useState(data.namaRekening);
  const [atasNama, setAtasNama] = useState(data.atasNama);
  const [noRekening, setNoRekening] = useState(data.noRekening);
  const [tampilInvoice, setTampilInvoice] = useState(data.noRekening);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/data_rekening/${data._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newNamaRekening: namaRekening,
          newAtasNama: atasNama,
          newNoRekening: noRekening,
          newTampilInvoice: tampilInvoice,
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
          <h3 className="font-bold text-lg">Update Data Rekening</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama Rekening</label>
              <input value={namaRekening} onChange={(e) => setNamaRekening(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Nama Rekening" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Atas Nama</label>
              <input value={atasNama} onChange={(e) => setAtasNama(e.target.value)} type="text" className="w-full text input input-bordered" placeholder="Atas Nama" />
            </div>
            <div className="form-control">
              <label className="label font-bold">NO Rekening</label>
              <input value={noRekening} onChange={(e) => setNoRekening(e.target.value)} type="number" className="w-full text input input-bordered" placeholder="NO Rekening" />
            </div>

            <div className="form-control">
              <label className="label font-bold">Tampil Invoice ?</label>
              <select className="select select-bordered w-full " value={tampilInvoice} onChange={(e) => setTampilInvoice(e.target.value)}>
                <option value="" disabled>
                  Tampil Invoice
                </option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>

            <div className="modal-action">
              <button className="btn " type="button" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button className="btn btn-accent " type="submit">
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

export default UpdateDataRekening;
