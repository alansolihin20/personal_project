'use client';

import { useEffect } from 'react';
import { useState } from 'react';

export const FetchData = () => {
  const [lunas, setLunas] = useState('');

  useEffect(() => {
    const fetchLunas = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/data_sudah_bayar');
        if (res.ok) {
          const dataLunas = await res.json();
          setLunas(dataLunas);
        }
      } catch (error) {
        console.error('error', error);
      }
    };
  }, []);

  const dataFetch = lunas && lunas.lunas;
};

export default dataFetch;
