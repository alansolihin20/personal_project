'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';

const DashboardComponents = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [pelangganLunas, setPelangganLunas] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:3000/api/users');
      if (res.ok) {
        const data = await res.json();

        setTotalUsers(data.users.length);
      }
    };
    fetchUser();
  });

  useEffect(() => {
    // Lakukan sesuatu setelah totalUsers berubah
  }, [totalUsers]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:3000/api/data_sudah_bayar');
      if (res.ok) {
        const data = await res.json();

        setPelangganLunas(data.lunas.length);
      }
    };
    fetchUser();
  });

  useEffect(() => {
    // Lakukan sesuatu setelah totalUsers berubah
  }, [pelangganLunas]);

  return (
    <div className="p-20 max-sm:p-5">
      <div className="flex flex-wrap justify-between items-center gap-5 ">
        <div className="stats shadow text-primary-content max-sm:w-full w-80 h-48 ">
          <Link href={'/user'} className="stat ">
            <div className="stat-figure text-primary">
              <FaUsers size={40} />
            </div>
            <div className="stat-title">Data Pelanggan</div>
            <div className="stat-value text-primary">{totalUsers}</div>
          </Link>
        </div>
        <div className="stats shadow max-sm:w-full w-80 h-48">
          <Link href={'/data-sudah-bayar'} className="stat   ">
            <div className="stat-figure text-secondary">
              <FaMoneyBillTrendUp size={40} />
            </div>

            <div className="stat-title max-md:break-words">Data Pelanggan Sudah Lunas</div>

            <div className="stat-value text-secondary">{pelangganLunas}</div>
          </Link>
        </div>
        <div className="stats shadow max-sm:w-full text-primary-content w-80 h-48">
          <Link href={'/user'} className="stat  ">
            <div className="stat-figure text-primary">
              <FaUsers size={40} />
            </div>
            <div className="stat-title">Data Pelanggan</div>
            <div className="stat-value text-primary">{totalUsers}</div>
          </Link>
        </div>
        <div className="stats shadow max-sm:w-full text-primary-content w-80 h-48">
          <Link href={'/user'} className="stat  ">
            <div className="stat-figure text-primary">
              <FaUsers size={40} />
            </div>
            <div className="stat-title">Data Pelanggan</div>
            <div className="stat-value text-primary">{totalUsers}</div>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap  mt-10 w-full border  justify-between gap-10 max-sm:flex-col">
        <div className="stats shadow max-sm:w-fulltext-primary-content flex-1 w-3/5  h-72">
          <Link href={'/user'} className="stat  ">
            <div className="stat-figure text-primary">
              <FaUsers size={40} />
            </div>
            <div className="stat-title">Data Pelanggan</div>
            <div className="stat-value text-primary">{totalUsers}</div>
          </Link>
        </div>
        <div className="stats shadow max-sm:w-fulltext-primary-content w-2/4  h-72">
          <Link href={'/user'} className="stat  ">
            <div className="stat-figure text-primary">
              <FaUsers size={40} />
            </div>
            <div className="stat-title">Data Pelanggan</div>
            <div className="stat-value text-primary">{totalUsers}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponents;
