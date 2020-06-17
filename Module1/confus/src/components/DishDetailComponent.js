import React, { Component } from 'react';
import { Card ,CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import moment from 'moment';
class DishDetail extends Component{
    constructor (props){
        super(props);
        
    }
    modDate(date){
        
        const formattedDate = moment(date).format("LL");
        //console.log(formattedDate);
        return formattedDate;
    }
   
    renderDish(dish) {
        if(dish != null) {
            return (
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
        }
    
        else {
            return (
            <div></div>
            );
        }
        }
   

    render() {
       
        const details=this.props.selectedDish;
        const dishcomment=this.props.comments.map((outer) => {
            return (
                <div key={outer.id}>
                    <div>{outer.comment}</div>
                    <div>--{outer.author}, {this.modDate(outer.date)}</div>
                </div>
              );
        });

        
     
        return(
            <div className="row">
                {this.renderDish(details)}
                   <div  className="col-12 col-md-5 m-1">
                        <h1>Comments</h1>
                        {dishcomment}
                    </div>

               </div>    
            
            
        );
    }



}


export default DishDetail;