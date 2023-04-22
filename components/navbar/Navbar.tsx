import Link from "next/link";
import React from "react";
// icons
import { FiPlus, FiTrash2, FiSettings, FiDatabase } from "react-icons/fi";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav>
      <Link href="/" className="logo">
        KR Drive
      </Link>

      <Search />

      <div className="links">
        <Link href="/new" className="link">
          <FiPlus />
          New
        </Link>
        <Link href="/media/bin" className="link">
          <FiTrash2 />
          Bin
        </Link>
        <Link href="/storage" className="link">
          {/* Show only files and their size */}
          <FiDatabase />
          Storage
        </Link>
        <Link href="/settings" className="link">
          <FiSettings />
          Settings
        </Link>
      </div>
    </nav>
  );
}
