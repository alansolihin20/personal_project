import { MdDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { MdManageAccounts } from 'react-icons/md';

const dataNavigate = [
  {
    id: 'dashboard',
    label: 'Dashboard',

    icons: <MdDashboard size={20} />,
    dataPath: [
      {
        id: 'dasboard-page',
        pathName: '/',
        labelName: 'Dashboard',
      },
    ],
  },
  {
    id: 'kelola-data',
    label: 'Kelola Data',

    icons: <MdManageAccounts size={20} />,
    dataPath: [
      { id: 'user', labelName: 'Data Pelanggan', pathName: '/user' },
      {
        id: 'tipe-pembayaran',
        pathName: '/pembayaran',
        labelName: 'Tipe Pembayaran',
      },
      {
        id: 'pelanggan-lunas',
        pathName: '/data-sudah-bayar',
        labelName: 'Pelanggan Lunas',
      },
      {
        id: 'pelanggan-belum-lunas',
        pathName: '/data-belum-bayar',
        labelName: 'Pelanggan Belum Lunas',
      },
      {
        id: 'data-rekening',
        pathName: '/data-rekening',
        labelName: 'Data Rekening Bank',
      },
    ],
  },
  {
    id: 'transaksi',
    label: 'Transaksi',

    icons: <GiTakeMyMoney size={20} />,
    dataPath: [
      {
        id: 'Pembukuan',
        pathName: '/pembukuan',
        labelName: 'Pembukuan',
      },
      {
        id: 'pemasukan',
        pathName: '/pemasukan',
        labelName: 'Pemasukan',
      },
      {
        id: 'pengeluaran',
        pathName: '/pengeluaran',
        labelName: 'Pengeluaran',
      },
    ],
  },
];

export default dataNavigate;
