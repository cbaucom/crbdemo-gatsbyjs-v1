import React, { Component } from 'react'
import Link from 'gatsby-link'

import CrbaucomAvatar from '../../assets/img/crbaucom-64.svg';
import Logo from '../../components/icons/Logo';

class Header extends Component {

  render() {
    return(
      <nav className="Header navbar navbar-default navbar-fixed-top">
        <Link to={'/'} className="logo">
          <Logo />
          {/* <img src={CrbaucomAvatar} /> */}
        </Link>
        <nav className="Navigation">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to={'/projects'}>Projects</Link>
            </li>
            <li>
              <Link to={'/blog'}>Blog</Link>
            </li>
            <li>
              <Link to={'/videos'}>Videos</Link>
            </li>
          </ul>
        </nav>
      </nav>
    )
  }

}

export default Header
