'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BiRefresh } from 'react-icons/bi';

export default function AktipKembali(data) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(usersID) {
    setIsMutating(true);
    try {
      const res = await fetch('http://localhost:3000/api/users', {
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
          status_langganan: 'Aktive',
          tanggal_registrasi: data.tanggal_registrasi,
          nik: data.nik,
        }),
      });
      if (res.ok) {
        setIsMutating(false);
        router.push('/user');
      }
    } catch (error) {
      console.error('Error', error);
    }

    try {
      await fetch(`http://localhost:3000/api/data_pelanggan_tidak_aktif?id=${usersID}`, {
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
      <button className="btn btn-info btn-xs" onClick={handleChange}>
        <BiRefresh size={15} />
      </button>
      <input checked={modal} onChange={handleChange} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Aktifkan Kembali {data.nama_pelanggan} ?</h3>

          <div className="modal-action">
            <button className="btn " type="button" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button className="btn btn-info" type="button" onClick={() => handleDelete(data._id)}>
                Save
              </button>
            ) : (
              <button className="btn loading" type="button">
                Deleting....
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
