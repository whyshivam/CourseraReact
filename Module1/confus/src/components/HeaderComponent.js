import React, { Component } from 'react'; 
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component{
    render(){
        //<></>-----<React.Fragement></React.Fragment>
        //many popular browser doesnot understand <> </>
        return(
            <React.Fragment>
            <Navbar dark >
                <div className="container">
                    <NavbarBrand href="/">Harry Potter</NavbarBrand>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Harry Potter</h1>
                            <p>
                                dcfgvbhnjkm,l
                            </p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            </React.Fragment>
        );
    }
}
export default Header;