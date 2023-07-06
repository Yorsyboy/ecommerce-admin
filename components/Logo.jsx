import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href={"/"} className="flex gap-1">
        <span className="">Ecommerce</span>
      </Link>
  )
}
