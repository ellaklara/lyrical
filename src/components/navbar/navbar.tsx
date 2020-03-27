import React, { FC } from 'react';
import './navbar.css'
import Navcard from './navcard/navcard';

import Home from '../../assets/icons/home-outline.svg'
import Search from '../../assets/icons/search-outline.svg'
import { NavLink } from 'react-router-dom';
const Navbar: FC<{}> = (props) => {
    return (
        <div className='navbar-container'>
            <NavLink to='/'>
                <div className='navbar-header'>
                    <span className='logo'>lyrical.</span>
                </div>
            </NavLink>
            <div className='navbar-content'>
                <i data-eva="github"></i>
                <Navcard><img src={Home}/><div>My library</div></Navcard>
                <NavLink to='/'>
                    <Navcard><img src={Search}/><div>Search</div></Navcard>
                </NavLink>
            </div>
            <div className='navbar-footer'>
                Wow
            </div>
        </div>
    );
}

export default Navbar;