import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService ,editUserService} from '../../services/userService';
import ModelUser from './ModelUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUser();
    }
    handleAddNewUser = () => {
        this.setState({ isOpenModalUser: true, })

        // alert("click")
    }
    handleEditUser = (user) => {
        console.log("check data edit: ", user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    }

    toggleUserModel = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser, })
    }
    toggleEditUserModel = () => {
        this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser, })

    }
    handleDeleteUser = async (user) => {
        console.log("data delete", user);
        try {
            let res = await deleteUserService(user.id);
            console.log("", res)
            if (res && res.errCode === 0) {
                await this.getAllUser();
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log("error", e)
        }

    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            console.log("response create user: ", response)
            if (response && response.errCode !== 0) {
                alert(response.message)
            }
            else {
                await this.getAllUser();
                this.setState({ isOpenModalUser: false, })
                emitter.emit('event clear modal data')
            }
        } catch (e) {
            console.log(e)
        }
        console.log("check data from child: ", data);
    }

    editUser= async(user)=>{
        try{
        let res= await editUserService(user);
        console.log('click save user', res);
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            }
            else {
                await this.getAllUser();
                this.setState({ isOpenModalEditUser: false, })
            }
        }
        catch(e){
            console.log(e)
        }
    }
    getAllUser = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            }
                // ,()=>{
                // console.log("check state user 2", this.state.arrUsers); // check neu bij bat dong bo
                // })
                // console.log("check state user", this.state.arrUsers)
                // }
                // console.log("data user from node.js: ",response);
            )
        }
    }
    /** life cycle
     *  run component
     *  1.run construct -> init state
     *  2.did mount (set state)
     *  3.render
     */
    render() {
        console.log("check render:  ", this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModelUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModel}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser && <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModel}
                    currentUser={this.state.userEdit}
                    editUser={this.editUser}
                />}

                <div className='title text-center'> manager user with ZTER</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className="fa-solid fa-plus"></i>Add new users</button>
                </div>
                <div className='users-table mt-3 mx-2'>
                    <table>
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>actions</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fa-solid fa-pencil"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
