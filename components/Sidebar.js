import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className={`order-none md:order-first`}>
        <div
          className={`${
            router.pathname === "/dashboard"
              ? "flex md:block"
              : "hidden md:block"
          } w-4/5 md:w-48 md:min-h-screen m-auto md:m-0 pt-0 pb-5 md:p-0 md:bg-white flex-wrap`}
        >
          <div className="w-1/2 smlocation.pa:w-1/4 md:w-full flex-none p-1 md:px-2">
            <Link href="/edit-delete">
              <div
                className={`${
                  router.pathname === "/edit-delete"
                    ? "md:border-b-2 md:border-purple-800"
                    : "md:border-b-2 md:border-gray-200"
                } rounded-md md:rounded-none shadow-lg md:shadow-none text-center md:text-left bg-white p-3 h-full flex flex-col cursor-pointer`}
              >
                <img
                  src="/undraw_eddel.svg"
                  alt="grocery"
                  className="block m-auto md:hidden"
                />
                <span
                  className={`${
                    router.pathname === "/edit-delete"
                      ? "text-black"
                      : "text-gray-600"
                  } block pt-3 md:pt-0 mt-auto md:mt-0 text-sm sm:text-base tracking-wider`}
                >
                  Edit/Delete Product
                </span>
              </div>
            </Link>
          </div>

          <div className="w-1/2 sm:w-1/4 md:w-full flex-none p-1 md:px-2">
            <Link href="/add">
              <div
                className={`${
                  router.pathname === "/add"
                    ? "md:border-b-2 md:border-purple-800"
                    : "md:border-b-2 md:border-gray-200"
                } rounded-md md:rounded-none shadow-lg md:shadow-none text-center md:text-left bg-white p-3 h-full flex flex-col cursor-pointer`}
              >
                <img
                  src="/undraw_add.svg"
                  alt="mom & kids"
                  className="block m-auto md:hidden"
                />
                <span
                  className={`${
                    router.pathname === "/add" ? "text-black" : "text-gray-600"
                  } block pt-3 md:pt-0 mt-auto md:mt-0 text-sm sm:text-base tracking-wider`}
                >
                  Add Product
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
