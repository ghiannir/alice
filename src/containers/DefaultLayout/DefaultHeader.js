import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import PropTypes from 'prop-types'

// eslint-disable-next-line
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import dataService from "../../api";
const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}
const brandFull = { src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }
const brandMinimized = {
  src: sygnet,
  width: 30,
  height: 30,
  alt: 'CoreUI Logo',
}

class DefaultHeader extends Component {
  render() {
    const {
      children,
      // eslint-disable-next-line
      ...attributes
    } = this.props
    return (
      <React.Fragment>
        <Nav className="mr-auto" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </NavItem>
        </Nav>
        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand
          style={{ position: `absolute`, left: `50%`, marginLeft: `-77.5px` }}
          full={brandFull}
          minimized={brandMinimized}
        />
        <Nav className="ml-auto" navbar>
          <NavItem className="px-3">
            <Link to="/credits" className="nav-link">
              Credits
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to={dataService.isLogged() ? '/logout' : '/login'} className="nav-link">
              {dataService.isLogged() ? 'Logout' : 'Login'}
            </Link>
          </NavItem>
        </Nav>
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
      </React.Fragment>
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

export default DefaultHeader
