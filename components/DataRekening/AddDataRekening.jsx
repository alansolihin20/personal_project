'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddDataRekening = () => {
  const [namaRekening, setNamaRekening] = useState('');
  const [atasNama, setAtasNama] = useState('');
  const [noRekening, setNoRekening] = useState('');
  const [tampilInvoice, setTampilInvoice] = useState('');
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaRekening || !atasNama || !noRekening || !tampilInvoice) {
      alert('Error');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/data_rekening', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namaRekening: namaRekening,
          atasNama: atasNama,
          noRekening: noRekening,
          tampilInvoice: tampilInvoice,
        }),
      });

      if (res.ok) {
        setNamaRekening('');
        setAtasNama(false);
        setNoRekening('');
        setTampilInvoice('');
        setIsMutating(false);
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
          <h3 className="font-bold text-lg">Add Data Rekening</h3>
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

export default AddDataRekening;
