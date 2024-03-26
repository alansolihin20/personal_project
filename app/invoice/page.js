'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { format } from 'date-fns';
import React from 'react';
import { Company } from '@/public/img';
import terbilang from 'angka-menjadi-terbilang';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useRouter } from 'next/navigation';

function dateFns(isoString) {
  return format(new Date(isoString), 'dd MMMM yyyy');
}

function dateFnss(isoString) {
  return format(new Date(isoString), "dd MMMM yyyy 'Pukul' hh:mm:ss aa");
}

const formatToRupiah = (amount) => {
  // Mengubah nilai menjadi bilangan desimal dan mengatur jumlah digit desimal maksimum ke 0
  let formattedAmount = parseFloat(amount).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  // Menghapus karakter koma jika ada
  formattedAmount = formattedAmount.replace(',', '');

  return formattedAmount;
};

const InvoiceComponents = () => {
  const router = useRouter();

  console.log(router);

  const [modal, setModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  function handleChange() {
    setModal(!modal);
  }
  const { nama_pelanggan, waktu, tlp, alamat_pelanggan, nominalHarusDibayar, metodePembayaran } = router.query;

  useEffect(() => {
    if ((!nama_pelanggan, !waktu, !tlp, !alamat_pelanggan, !nominalHarusDibayar, !metodePembayaran)) {
      return;
    }
    const fetchSomething = async () => {
      const res = await fetch('http://localhost:3000/api/data_sudah_bayar');
    };
    fetchSomething();
  });

  return (
    <div>
      <button className="btn btn-xs" onClick={handleChange}>
        <FaFileInvoiceDollar size={15} />
      </button>
      <input checked={modal} onChange={handleChange} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box  w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}>
              ✕
            </button>
          </form>
          <div className="p-2 flex flex-row gap-3 justify-between items-center">
            <div className="flex  items-center flex-row gap-2">
              <h1 className="text-xl font-bold">Dons Net</h1>
              <Image src={Company} alt="company" style={{ width: '30px', height: '30px' }}></Image>
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-lg">Invoice</h3>
              <h3 className="font-bold text-xs">Date : {dateFns(waktu)}</h3>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold p-3 border-b border-t">BUKTI PEMBAYARAN</h1>
          <div className="p-2 flex flex-col gap-1 justify-start items-start border-b">
            <p>Nama : {nama_pelanggan} </p>
            <p>Tlp : {tlp}</p>
            <p>Alamat : {alamat_pelanggan}</p>
            <p>Waktu : {dateFnss(waktu)}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>DESCRIPTION</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <th className="font">Pembayaran Internet</th>
                  <td>1</td>
                  <td>{formatToRupiah(nominalHarusDibayar)}</td>
                  <td>{formatToRupiah(nominalHarusDibayar)}</td>
                </tr>
                <tr>
                  <td colSpan={4}>GRAND TOTAL : </td>
                  <td>{formatToRupiah(nominalHarusDibayar)}</td>
                </tr>

                <tr className="border-none">
                  <td colSpan={1}>Terbilang</td>
                  <td colSpan={3} className="italic">
                    {terbilang(nominalHarusDibayar)}
                  </td>
                </tr>
                <tr className="border-none">
                  <td colSpan={1}>Metode Pembayaran</td>
                  <td colSpan={3}>{metodePembayaran}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center p-10 ">
              <h1 className="font-bold text-xl mb-3">LUNAS</h1>
              <p>Terima kasih sudah melakukan pembayaran tepat waktu! </p>
            </div>

            {/* <div className="text-end">
              <Link
                href={{
                  pathname: '/invoice',
                  query: {
                    nama_pelanggan: nama_pelanggan,
                    tlp: tlp,
                    alamat_pelanggan: alamat_pelanggan,
                    nominalHarusDibayar: nominalHarusDibayar,
                    metodePembayaran: metodePembayaran,
                    waktu: waktu,
                  },
                }}
                className="btn"
              >
                Print
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

InvoiceComponents.getInitialProps = async ({ query }) => {
  const { nama_pelanggan, waktu, tlp, alamat_pelanggan, nominalHarusDibayar, metodePembayaran } = query;
  return { nama_pelanggan, waktu, tlp, alamat_pelanggan, nominalHarusDibayar, metodePembayaran };
};

export default InvoiceComponents;
