import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const MainNav = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Nav>
                    <ul className="test">
                        <li>test</li>
                    </ul>
                </Nav>
            </Navbar>
        </div>
    );
};

export default MainNav;
