'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { MdOutlinePersonAddDisabled } from 'react-icons/md';

export default function DeleteData(data) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(usersID) {
    setIsMutating(true);
    try {
      const res = await fetch('http://localhost:3000/api/data_pelanggan_tidak_aktif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama_pelanggan: data.nama_pelanggan,
          alamat_pelanggan: data.alamat_pelanggan,
          paket: data.paket,
          tlp: data.tlp,
          harga: data.harga,
          pembayaran_terakhir: data.pembayaran_terakhir,
          status_langganan: 'Dismentle',
          tanggal_registrasi: data.tanggal_registrasi,
          nik: data.nik,
        }),
      });
      if (res.ok) {
        setIsMutating(false);
        router.push('/user/data-pelanggan-tidak-aktif');
      }
    } catch (error) {
      console.error('Error', error);
    }

    try {
      await fetch(`http://localhost:3000/api/users?id=${usersID}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting data', error);
    }

    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-error btn-xs" onClick={handleChange}>
        <MdOutlinePersonAddDisabled size={15} />
      </button>
      <input checked={modal} onChange={handleChange} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to Disable {data.nama_pelanggan} ?</h3>

          <div className="modal-action">
            <button className="btn " type="button" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button className="btn-error btn" type="button" onClick={() => handleDelete(data._id)}>
                Disabled
              </button>
            ) : (
              <button className="btn loading" type="button">
                Disable....
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
