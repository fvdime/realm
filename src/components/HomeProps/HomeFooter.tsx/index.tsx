import Link from 'next/link'
import React from 'react'

const HomeFooter = () => {
  return (
    <div>   
      <footer className="bg-neutral-950">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="flex items-center">
                <span className="self-center text-xl font-bold whitespace-nowrap text-white">Realm</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h2 className="mb-6 text-xs font-semibold uppercase text-neutral-200">Company</h2>
                <ul className="text-neutral-300 font-medium text-xs">
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">About Us</Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">plans</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-xs font-semibold uppercase text-neutral-200">Community</h2>
                <ul className="text-neutral-300 font-medium text-xs">
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">Guidelines</Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">Support</Link>
                  </li>
                 </ul>
              </div>
              <div>
                <h2 className="mb-6 text-xs font-semibold uppercase text-neutral-200">Legal</h2>
                <ul className="text-neutral-300 font-medium text-xs">
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">Terms of Use</Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-xs font-semibold uppercase text-neutral-200">Resources</h2>
                <ul className="text-neutral-300 font-medium text-xs">
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">Code Source</Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/" className="hover:text-neutral-400">Contact</Link>
                  </li>
                </ul>
              </div>
              </div>
            </div>
            <hr className="my-6 sm:mx-auto border-neutral-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-xs text-center text-gray-400">© 2023 <a href="/" className="hover:underline">Realm™</a>. All Rights Reserved.
                </span>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default HomeFooter