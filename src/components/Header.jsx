import React from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'
import { FileText } from 'lucide-react'
import { Button } from '../components/ui/button'


const Header = () => {
  const location = useLocation()
  return (
    <header className='flex justify-between items-center px-15 pt-4'>
      <div className='max-w-[70px]'>
        <Link to='/'><img src={logo} alt="logo" /></Link>
      </div>

      <div className='ml-13'>
        <nav className='bg-gray-700 p-2 rounded-md'>
          <ul className='flex gap-3'>
            <li><NavLink to='/' className={`${location.pathname === '/' ? 'bg-gray-600 text-gray-400' : 'text-white'} flex items-center gap-2 hover:bg-gray-600 rounded-[5px] hover:text-gray-300 p-2 transition-all active:bg-gray-400`}><Home /></NavLink></li>
            <span className='w-[2px] h-10 bg-gray-500'></span>
            <li><NavLink to='/own' className={`${location.pathname === '/own' ? 'bg-gray-600 text-gray-400' : ' text-white'} flex items-center gap-2 hover:text-gray-300 hover:bg-gray-600 rounded-[5px] p-2 transition-all active:bg-gray-400`}><FileText /></NavLink></li>
          </ul>
        </nav>
      </div>

      <div className='flex gap-3'>
        <Button variant={'secondary'} className='cursor-pointer hover:bg-gray-600 transition-all'>Login</Button>
        <Button variant={'secondary'} className='cursor-pointer hover:bg-gray-600 transition-all'>Sign Up</Button>
      </div>
    </header>
  )
}

export default Header