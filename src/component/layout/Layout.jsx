import React from 'react'
import NavBar from '../NavBar'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  //max-w-screen-xl mx-auto
  return (
    <>
      <header>
        <NavBar />
        <main className=" ">
          <Outlet />
        </main>
      </header>
    </>
  );
}
