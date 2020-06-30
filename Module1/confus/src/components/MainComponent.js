import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishDetailComponent'
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch , Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps= state =>{
    return{
      dishes: state.dishes,
      comments:state.comments,
      promotions:state.promotions,
      leaders:state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
}); 
class Main extends Component{
  constructor(props){
    super(props);
    
  }
  componentDidMount() {
    this.props.fetchDishes();
  }


	onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  

  render(){
		const HomePage =() => {
			return (
				<Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
			);

		}
		const DishWithID = ({match}) => {
			return(
				<Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
      />
				
				);
		};
		


// exact path is exactly same address
// path is some what same address
    return (
      <div >
        <Header/>
        <div className="container">
					
           <Switch>
               <Route path="/home" component={HomePage}/>
								<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
								<Route path="/menu/:dishId" component ={DishWithID} />
								<Route exact path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
								<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
								<Redirect to="/home" />
            </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));