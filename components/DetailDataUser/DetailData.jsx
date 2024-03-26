'use client';
import React from 'react';
import { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

const DetailData = (data) => {
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-succes btn-xs" onClick={handleChange}>
        <FaCircleInfo size={15} />
      </button>
      <input checked={modal} onChange={handleChange} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Detail Of {data.nama_pelanggan}?</h3>
          <p className=" mt-3">Name Pelanggan : {data.nama_pelanggan}</p>
          <p className="mt-2">Nik : {data.nik}</p>
          <p className="mt-2">NoHp : {data.tlp}</p>

          <div className="modal-action">
            <button className="btn " type="button" onClick={handleChange}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailData;
