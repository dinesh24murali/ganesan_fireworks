import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { brand } from '../../constants/AppConstants';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar style={{ padding: '.45rem 1rem' }} color="secondary" light expand="md">
      <NavbarBrand>{brand}</NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/crackers">Crackers</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/customers">Customers</Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Sales
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link className="nav-link" to="/sales">View Sales</Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="nav-link" to="/add-sales">Add Sales</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
