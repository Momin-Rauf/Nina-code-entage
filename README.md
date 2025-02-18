# Full Stack Development Task at Ninja Code

## Introduction

The Enatega multi-vendor food delivery solution is designed to provide a user-friendly platform for the food delivery and logistics business. It allows multiple restaurants to list their services and deliver to different locations, similar to popular platforms like Foodpanda and Uber Eats.

## Date and Time of Submission
- **Date**: 18/2/25 
- **Name**: Muhammad Momin Rauf

## Project Details

The Enatega platform allows users to search for nearby restaurants, select their delivery location, and view restaurant details dynamically. The platform is built using modern technologies and follows a modular component structure for better scalability.

## Tools and Technologies
- **Next.js 14**
- **PrimeReact**
- **Apollo Client**
- **GraphQL** (for querying restaurant data)
- **OpenCage API** (for location services)

## Components Overview

### 1. Header Component
| **Feature** | **Details** |
|-------------|-------------|
| **Hooks** | `useState` |
| **Logic** | - Manages selected location using `useState`.<br>- Renders navigation elements like Logo, Login button, and Cart icon. |

```javascript
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
