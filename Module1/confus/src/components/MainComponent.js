import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container } from 'reactstrap';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent'

import { DISHES } from '../shared/dishes';

class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES,
      selectedDish: null
    };
  }
  onSelectedDish(dishId) {
    this.setState({selectedDish: dishId});
}
  render(){
    return (
      <div >
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Harry Potter</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
            <Menu dishes={this.state.dishes} onClick={(dishId) => this.onSelectedDish(dishId)}/> 
            <Dishdetail dish={this.state.dishes.filter((dish) => dish.id==this.state.selectedDish)[0]}/>
        </div>
      </div>
    );
  }
  
}

export default Main;
