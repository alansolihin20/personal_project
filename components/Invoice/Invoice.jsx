'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { format } from 'date-fns';
import React from 'react';
import { Company } from '@/public/img';
import terbilang from 'angka-menjadi-terbilang';
import Link from 'next/link';
import Router from 'next/router';

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

const Invoice = (data) => {
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
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
              <h3 className="font-bold text-xs">Date : {dateFns(data.waktu)}</h3>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold p-3 border-b border-t">BUKTI PEMBAYARAN</h1>
          <div className="p-2 flex flex-col gap-1 justify-start items-start border-b">
            <p>Nama : {data.nama_pelanggan} </p>
            <p>Tlp : {data.tlp}</p>
            <p>Alamat : {data.alamat_pelanggan}</p>
            <p>Waktu : {dateFnss(data.waktu)}</p>
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
                  <td>{formatToRupiah(data.nominalHarusDibayar)}</td>
                  <td>{formatToRupiah(data.nominalHarusDibayar)}</td>
                </tr>
                <tr>
                  <td colSpan={4}>GRAND TOTAL : </td>
                  <td>{formatToRupiah(data.nominalHarusDibayar)}</td>
                </tr>

                <tr className="border-none">
                  <td colSpan={1}>Terbilang</td>
                  <td colSpan={3} className="italic">
                    {terbilang(data.nominalHarusDibayar)}
                  </td>
                </tr>
                <tr className="border-none">
                  <td colSpan={1}>Metode Pembayaran</td>
                  <td colSpan={3}>{data.metodePembayaran}</td>
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
                  pathname: 'invoice',
                  query: {
                    nama_pelanggan: data.nama_pelanggan,
                    tlp: data.tlp,
                    waktu: data.waktu,
                    alamat_pelanggan: data.alamat_pelanggan,
                    nominalHarusDibayar: data.nominalHarusDibayar,
                    metodePembayaran: data.metodePembayaran,
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

export default Invoice;
