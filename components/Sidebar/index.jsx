'use client';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoArrowBack } from 'react-icons/io5';
import dataNavigate from './data';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div>
      <div className="drawer ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <GiHamburgerMenu size={30} />
          </label>
        </div>
        <div className="drawer-side z-50 ">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 min-h-full bg-base-200 pt-20 text-base-content">
            <div className="flex flex-col justify-start items-start ">
              {dataNavigate.map((menuItems) => (
                <div className="flex flex-row justify-start items-start gap-2 min-h-full w-full bg-base-200 text-base-content cursor-pointer rounded-xl" key={menuItems.id}>
                  <div className="collapse collapse-arrow ">
                    <input type="checkbox" />
                    <div className="collapse-title  text-lg font-medium w-full rounded-sm ">
                      <div className="flex items-start justify-start ">
                        <div className="flex items-center justify-center gap-2 ">
                          {menuItems.icons}
                          {menuItems.label}
                        </div>
                      </div>
                    </div>
                    <div className="collapse-content ">
                      {menuItems.dataPath &&
                        menuItems.dataPath.map((path) => (
                          <div className="w-full ml-5  p-2 hover:bg-base-300 rounded-xl" key={path.id}>
                            <Link href={path.pathName}>{path.labelName}</Link>
                          </div>
                        ))}
                    </div>
                  </div>
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
