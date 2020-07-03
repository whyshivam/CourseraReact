import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,
     Label, Input,Col,Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength=(len) => (val) => !(val) || (val.length <= len);
const minLength=(len) => (val) => !(val) || (val.length >= len);
//User Defined components start with caps
class Commentform extends Component{
    constructor (props) {
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        console.log("Values "+JSON.stringify(values));
        var val=JSON.stringify(values);
        console.log(values.author);
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        //event.preventDefault();
		//Prevent to go to next page
}

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                 <span className="fa fa-sign-in fal-lg"></span>Add Comment
            </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="contactType"
                                className="form-control"
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Row>
                            <Row className="form-group"> <Label htmlFor="author" md={2}>First Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control" 
                                        validators={{minLength: minLength(3),maxLength : maxLength(15)}}
                                         />
                                         <Errors className="text-danger"
                                            model=".name"
                                            show ="touched"
                                            messages={{
                                                minLength : 'Must be atleast 3',
                                                maxLength :' maximum 15 char'
                                            }}
                                         />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                
                                    <Control.textarea model=".comment"  id="comment" name="comment"
                                       
                                        className="form-control" />
                        
                                    <Button type="submit" value="submit" color="primary">
                                    Comment
                                    </Button>
                            </Row>
                        


                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}
    function RenderComments({comments,addComment,dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        console.log("RenderComments"+ comments);
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <Commentform dishId={dishId} addComment={addComment} />
            </div>
        )
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardText>{dish.name}</CardText>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else{
            return(
                <div></div>
            );

        }
    }

    const Dishdetail=(props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish == null) {
            return (<div></div>);
        }
        else{
            return (
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3> {props.dish.name}</h3>
                        <hr/>
                    </div>
                    </div>
                    <div className='row'>
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
    
                        
                    </div>
                </div>
            );
        }
        
    }


export default Dishdetail