import React, { Component } from 'react';
import { Card ,CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish : null,
            com: null
        }
        //console.log("Constructor invoked");
    }

    
    onDishSelect(dish){
        this.setState({ selectedDish: dish,
        com: dish.comments});
        /*return(
            <DishDetail selectedDish={this.state.selectedDish} />
        );*/
        
        //console.log("onDishSelect invoke");
    }
    renderD(dish){
        if(dish != null){
            return(
                
                    <div className="col-12 col-md-5 m-1">
                    <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                    </div>
                

            );
        } else{
            return(
                <div></div>
            );
        }
    }

    renderDish(dish){
        //console.log("renderDish invoked");
        if(dish != null){
            return(
                <DishDetail selectedDish={this.state.selectedDish} comments={this.state.com}></DishDetail>
            );
        } else{
            return(
                <div></div>
            );
        }
    }

    render() {
        //props was earlier state props is used to import from the parent to child
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => this.onDishSelect(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay body className="ml-5">
                        <CardTitle heading>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });
        //console.log("render invoked");

        return (
          <div className="container">
            <div className="row">
                  {menu}
            </div>     
                {this.renderDish(this.state.selectedDish)}
            
          </div>
        );
    }
}

export default Menu;