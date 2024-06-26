import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {  Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const navigation  = [
  { name: 'Wątki', href: '/watki',  requiredRole: null},
  { name: 'Dodaj wątek', href: '/dodaj-watek', requiredRole: null},
  { name: 'Usuń wątek', href: '/usun-watek', requiredRole: "Content Moderator"},
  { name: 'Pokaż użytkowników ', href: '/pokaz-uzytkownikow', requiredRole: 'Community Moderator'},
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const {user, authedPost, triggerUpdate} = useAuth();
  const navigate = useNavigate();
  const [navigationVariable, setNavigationVariable] = useState(navigation)


  const logout = async () => {
    try{
      const res = await authedPost('/api/auth/logout', {});

      if (res === null)
        throw new Error('error');

    }
    catch(error){

    }
    finally{
        await triggerUpdate();
        navigate("/login");
    }


  };



  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>

                <h1  style={{color:"white", marginLeft:'20px', marginTop:"5px"}}>Your new home</h1>

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {
                  user!==null?
                  <button className="outline-0 inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-base font-bold text-white " onClick={logout}> Log out</button>
                  :
                  <button className="outline-0 inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-base font-bold text-white " onClick={() => navigate('/login')}> Log in</button>

                }

              </div>
            </div>
          </div>
 </>
      )}
    </Disclosure>
  )
}
