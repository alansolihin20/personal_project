import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoArrowBack } from 'react-icons/io5';
import dataNavigate from './data';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <GiHamburgerMenu size={30} />
          </label>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200 pt-20 text-base-content">
            <div className="flex flex-col justify-start items-start gap-5">
              {dataNavigate.map((menuItems) => (
                <div className="flex flex-row justify-center items-center gap-3 min-h-full bg-base-200 text-base-content cursor-pointer" key={menuItems.id}>
                  {menuItems.icons}
                  <Link className="text-xl" href={menuItems.path}>
                    {menuItems.label} {menuItems.dropdown}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn btn-default drawer-button mt-2 ml-28 ">
                <IoArrowBack size={30} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
