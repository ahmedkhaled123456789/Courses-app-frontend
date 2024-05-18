'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs";
import { ShoppingCart } from 'lucide-react'
import { CartContext } from '../_context/CartContext';
import CartApis from '../_utils/CartApis';
import Cart from '../_components/Cart'
function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState()
 	const [openCart, setOpenCart] = useState(false)
   const [menuOpen, setMenuOpen] = useState(false);

	const { cart, setCart } = useContext(CartContext)
	useEffect(() => {
		setIsLoggedIn(window?.location?.href.toString().includes('sign-in'))
	}, [])

	const { user } = useUser();
	useEffect(() => {
		user && getCartItems();
	}, [user])
	const getCartItems = async() => {
	await	CartApis.getUserCartItems(user?.primaryEmailAddress.emailAddress).then(async res => {
			console.log('response from cart items', res?.data?.data)
      console.log("aaaaa")

		await	res?.data?.data.forEach(citem => {
				setCart((oldCart) => [
					...oldCart,
					{
						id: citem.id,
						product: citem?.attributes?.products?.data[0]
					}
				])
			})

		})
	}
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
	return !isLoggedIn && (
		<header className="bg-white dark:bg-gray-900">
			<div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto shadow-md sm:px-6 lg:px-8">
				<Image src='/logo.svg' alt='logo' width={30} height={30} />

				<div className="flex items-center justify-end flex-1 md:justify-between">
					<nav aria-label="Global" className={`md:block  ${menuOpen ? "" : "hidden "}`}>
						<ul className={`flex ${
                  menuOpen
                    ? "flex-col gap-4 items-center absolute shadow-md top-14 px-11 py-3 bg-gray-100 z-50 "
                    : "items-center gap-6"
                } text-sm md:flex-row md:items-center`}>
							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="/"
								>
									Home
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="/"
								>
									Explore
								</a>
							</li>


							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="/about"
								>
									About Us
								</a>
							</li>

							<li>
								<a
									className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="/contact"
								>
									Contact Us
								</a>
							</li>

						</ul>
					</nav>

					<div className="flex items-center gap-4">
						{!user ?
							<div className="sm:flex sm:gap-4">
								<a
									className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary dark:hover:bg-primary"
									href="/sign-in"
								>
									Login
								</a>

								<a
									className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-primary/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 sm:block"
									href="/"
								>
									Register
								</a>
							</div>
							:
							<div className='flex items-center gap-5'>
								<h2 className='flex gap-1 cursor-pointer'>
									<ShoppingCart onClick={() => setOpenCart(!openCart)} />
									({cart?.length})</h2>
								<UserButton afterSignOutUrl="/" />
								{openCart && <Cart />}
							</div>

						}

						<button
							className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
              onClick={toggleMenu}
            >
							<span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header