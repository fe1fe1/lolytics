import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";

const MainNav = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Nav className="m-auto">
                    <Nav.Link href="/summoners">Summoners</Nav.Link>
                    <Nav.Link href="/ladders">Ladders</Nav.Link>
                    <Nav.Link href="/champions-stats">Champion Stats</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
};

export default MainNav;
