import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishDetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import {Switch , Route, Redirect} from 'react-router-dom';


class Main extends Component{
  constructor(props){
    super(props);
    this.state={
			dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
	onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render(){
		const HomePage =() => {
			return (
				<Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
			);

		}
		const DishWithID = ({match}) => {
			return(
				<Dishdetail dish={this.state.dishes.filter ( (dish) => dish.id === parseInt(match.params.dishId,10))[0]}  
				comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
				
				);
		}
		


// exact path is exactly same address
// path is some what same address
    return (
      <div >
        <Header/>
        <div className="container">
					
           <Switch>
               <Route path="/home" component={HomePage}/>
								<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
								<Route path="/menu/:dishId" component ={DishWithID} />
								<Route exact path="/contactus" component={Contact} />
								<Redirect to="/home" />
            </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
  
}

export default Main;
