import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address',];
        for (let i = 0; i < arrInput.length; i++) {
            console.log("check inside the loop: ", this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("missing parametter: " + arrInput[i])
                break;
            }
        }
        return isValid;
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'abcd1234',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,

            })
        }
        console.log("didmount modal user: ", this.props.currentUser);
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
    handleSaveUser = async () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call api edit user
            this.props.editUser(this.state);
        }
        console.log("data model edit", this.state)
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'model-user-container'} size="lg" centered>
                <ModalHeader toggle={() => { this.toggle() }} className="custom-modal-header">Edited user</ModalHeader>
                <ModalBody>
                    <div className='model-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="text" onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} disabled/>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password" onChange={(event) => { this.handleOnChangeInput(event, "password") }} value={this.state.password} disabled />
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
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>Save changes</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
