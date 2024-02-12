import { MdDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { BiAdjust } from 'react-icons/bi';

const dataNavigate = [
  {
    id: 'dashbaord',
    label: 'Dashboard',
    path: '/',
    icons: <MdDashboard size={25} />,
    dropdown: (
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1">
          Hover
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'user',
    label: 'User',
    path: '/user',
    icons: <FaUserFriends size={25} />,
  },
  {
    id: 'author',
    label: 'Author',
    path: '/author',
    icons: <BiAdjust size={25} />,
  },
];

export default dataNavigate;
