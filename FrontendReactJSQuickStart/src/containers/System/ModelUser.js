import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModelUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on("event clear modal data", ()=> {
            this.setState ( {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        })
        })  
    }
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName','address',];
        for(let i=0; i< arrInput.length; i++ ){
            console.log ("check inside the loop: ", this.state[arrInput[i]], arrInput[i])
            if(! this.state[arrInput[i]]){
                isValid=false;
                alert("missing parametter: "+ arrInput[i])
                break;
            }
        }
        return isValid;
    }
    componentDidMount() {
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log("check state: ", this.state);
        })

    }
    handleAddNewUser = async () => {
        let isValid= this.checkValideInput();
        if(isValid===true){
            // cal api add user
            this.props.createNewUser(this.state);
        }
        console.log("data model add", this.state)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'model-user-container'} size="lg" centered>
                <ModalHeader toggle={() => { this.toggle() }} className="custom-modal-header">Create new user</ModalHeader>
                <ModalBody>
                    <div className='model-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password" onChange={(event) => { this.handleOnChangeInput(event, "password") }} value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "firstName") }} value={this.state.firstName} />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "lastName") }} value={this.state.lastName} />
                        </div>
                        <div className='input-container max-width-input '>
                            <label>Address</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "address") }} value={this.state.address} />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>Save changes</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Quit</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
