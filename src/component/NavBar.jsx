import { Button, Navbar } from "flowbite-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BiSolidCartAdd } from "react-icons/bi";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import { key } from "localforage";
import { list } from "postcss";
import { GoSearch } from "react-icons/go";
export default function NavBar() {


    const location = useLocation();
    const pathname = location?.pathname;
    // console.log("pathname: ", pathname);
    const [navbarlist, setnavbarlist] = useState([
      { name: "Sport", path: "/eventHome" },
      { name: "mapSport", path: "/map" },
      { name: "mapsS", path: "/maps" },
      { name: "maps3", path: "/maps3" },
    ]);

  return (
    <>
      <Navbar fluid rounded className=" ">
        <Navbar.Brand href="https://flowbite-react.com">
          {/* <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <div className="flex items-center md:order-2 ">
          <div className=" relative">
            <p className=" absolute -top-4 right-3 text-cyan-900"></p>
            <Link to={`/cart`}>
              <BiSolidCartAdd className=" mr-5" />
            </Link>
          </div>

          <div className=" ml-10 flex">
            <GoSearch className="" />
            <input type="search" className="  w-[150px] h-[30px] rounded-lg mr-40"></input>
          </div>

          <Button>Get started</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {navbarlist.map((list, index) => {
            return (
              <Navbar.Link
                as={Link}
                to={list.path}
                active={pathname === list.path}
                key={index}
              >
                <p>{list.name}</p>
              </Navbar.Link>
            );
          })}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
