import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { Nav, NavItem } from 'react-bootstrap';
import 'bulma/css/bulma.min.css';
import { Navbar, Button } from 'react-bulma-components';

//import NavbarBrand from './NavbarBrand';

import { default as api } from '../api';
import { parseDate, isNotificationsActive, usePolling } from '../utils';
import { getMessageToken } from '../firebase';
import Store from '../utils/store';

import logo from '../assets/img/brand/logo.svg';
import sygnet from '../assets/img/brand/sygnet.svg';

const brandFull = { src: logo, width: 89, height: 25, alt: 'Policumbent Logo' };
const brandMinimized = {
  src: sygnet,
  width: 30,
  height: 30,
  alt: 'Policumbent Logo',
};

const Header = () => {
  const [bike, setBike] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);

  // polling over configuration change
  const [, setPolling] = usePolling(() => updateBlinker(), 1000);

  const updateBlinker = () => {
    const data = Store.get('blinker');

    if (data) {
      setBike(data.bikeName);
      setShow(data.show);
    }
  };

  useEffect(() => {
    api
      .getConfig()
      .then((data) => {
        setBike(data.bikeName);
        setShow(parseDate(data.date, data.startTime) < Date.now());
      })
      .catch((e) => console.error(e));

    Store.remove('blinker');
    setPolling(true);
  }, [setPolling]);

  return (
    <React.Fragment>
      <Navbar className="nav is-light" fixed="top">
        <Navbar.Container align="left">
        <Navbar.Item
        className={`mx-auto ${isNotificationsActive() ? null : 'pr-5'} logo`}
        renderAs='a'
        href="#"
        //full={brandFull}
        //minimized={brandMinimized}
      /><img src={logo} width={brandFull.width} height={brandFull.height}/><Navbar.Item/>
        <Navbar.Item className="ml-3 mr-auto">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
        </Navbar.Item>
        <Navbar.Item className="mr-auto">
          {isNotificationsActive() ? null : (
            <Button className="button is-light is-small" onClick={() => getMessageToken()}>
              Notifiche
            </Button>
          )}
        </Navbar.Item>
      {/* </Navbar> */}</Navbar.Container>
      
      {/* <Navbar color="link" fixed="top"> */}
      <Navbar.Container align="right">
        {show ? (
          <Navbar.Item className="mr-2 ml-auto">
            <div className="blink px-1">{bike} on the road</div>
          </Navbar.Item>
        ) : null}

        <Navbar.Item className="mr-3 ml-auto">
          <Link to="/credits" className="nav-link">
            Credits
          </Link>
        </Navbar.Item>
        <Navbar.Item className="ml-auto mr-3">
          <Link to={api.isLogged() ? '/logout' : '/login'} className="nav-link">
            {api.isLogged() ? 'Logout' : 'Login'}
          </Link>
        </Navbar.Item>
        </Navbar.Container>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
