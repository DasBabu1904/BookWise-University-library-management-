
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
  const pathname=usePathname()
  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href={"/"}><Image src={"./icons/logo.svg"} alt="logo" width={40} height={40}/></Link>
      <ul className='flex flex-row items-center gap-5'>

        <li>
          <Link href={"/library"} className={pathname==='/library'?"text-gray-950":"text-gray-500"}> Library</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header