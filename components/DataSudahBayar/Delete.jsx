'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

export default function DeleteData(data) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(tipeID) {
    setIsMutating(true);
    await fetch(`http://localhost:3000/api/data_sudah_bayar?id=${tipeID}`, {
      method: 'DELETE',
    });
    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-error btn-xs" onClick={handleChange}>
        <MdDelete size={15} />
      </button>
      <input checked={modal} onChange={handleChange} type="checkbox" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete ?</h3>

          <div className="modal-action">
            <button className="btn " type="button" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button className="btn btn-error" type="button" onClick={() => handleDelete(data._id)}>
                Delete
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
