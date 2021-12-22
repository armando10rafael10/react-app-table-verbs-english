import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';

class ComponentMenu extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar bg="info" expand="md">
                    <Navbar.Brand href="#home">Verbs</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" bg="info" variant="dark">
                            <Nav.Link href="#home">Inicio</Nav.Link>
                            <Nav.Link href="#link">Opciones</Nav.Link>
                            <NavDropdown title="Options" id="basic-nav-dropdown">
                                {/* <NavDropdown.Item> */}
                                    <Link class="nav-link active" to="/list">tabla</Link>
                                {/* </NavDropdown.Item>
                                <NavDropdown.Item> */}
                                    <Link class="nav-link active" to="/">inicio</Link>
                                {/* </NavDropdown.Item>
                                <NavDropdown.Item> */}
                                    <Link class="nav-link active" to="/card">card</Link>
                                {/* </NavDropdown.Item>
                                <NavDropdown.Item> */}
                                    <Link class="nav-link active" to="/menu">otro menu</Link>
                                {/* </NavDropdown.Item> */}

                                {/* <NavDropdown.Item> } */}
                                    <Link class="nav-link active" to="/AdminText">admin text</Link>
                                {/* </NavDropdown.Item> */}
                                {/* <NavDropdown.Item> } */}
                                    <Link class="nav-link active" to="/AdminFormPictures">admin pictures</Link>
                                {/* </NavDropdown.Item> */}
                                {/* <NavDropdown.Item> } */}
                                    <Link class="nav-link active" to="/AdminAdminFormIrregular">Admin Irregular</Link>
                                {/* </NavDropdown.Item> */}
                                {/* <NavDropdown.Item> } */}
                                    <Link class="nav-link active" to="/AdminFormRegular">Admin Regular</Link>
                                {/* </NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}
 
export default ComponentMenu;