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
                <NavLink to='/'>
                    <Navcard><img alt='search' src={Search}/><div>Search</div></Navcard>
                </NavLink>
                <NavLink to='/library'>
                    <Navcard><img alt='library' src={Home}/><div>Library</div></Navcard>
                </NavLink>
            </div>
            <div className='navbar-footer'>

            </div>
        </div>
    );
}

export default Navbar;