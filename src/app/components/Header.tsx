'use client';

import Image from 'next/image';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

const locations = [
  { label: 'Berlin, Germany', value: 'berlin' },
  { label: 'Paris, France', value: 'paris' },
  { label: 'New York, USA', value: 'newyork' },
];

export default function Header() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={120} height={40} />
      </div>

    

      {/* Actions */}
      <div className="flex items-center gap-6 border-l border-gray-300 pl-6">
        <button className="flex items-center gap-2 text-black font-semibold hover:text-gray-600">
          <FaUser size={18} />
          <span className="uppercase">Login</span>
        </button>
       
        <BsBag size={24} className="cursor-pointer text-black hover:text-gray-600" />
      </div>
    </header>
  );
}
