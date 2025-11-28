import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { flatMap } from 'lodash';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isopen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.fecthGenderStart();
        this.props.fecthPositionStart();
        this.props.fecthRoleStart();
        // this.props.createNewUser()
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         })
        //     }
        //     console.log("check getallcodeservice: ", res);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
            })
        }
    }

    handleChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file,
            })
        }
    }

    openPreviewImage = () => {
        if (this.state.previewImgUrl) {
            this.setState({ isopen: true });
        }
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        //fire redux action
        console.log("check onchange input: ", this.state);

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address']
        for (let i = 0; i <= arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { email, password, firstName, lastName,
            phoneNumber, address, gender, position, role, avatar
        } = this.state;
        console.log("check state getallcodeservice: ", this.state);

        let isLoadingGender = this.props.isLoadingGender;
        return (
            <div className="user-redux-container">
                <div className="title">
                    Learn React-Redux
                </div>
                <div>{isLoadingGender === true ? 'Loading Genders' : ''}</div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className='col-12'><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /> </label>
                                <input className="form-control" type="email" value={email} onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /> </label>
                                <input className="form-control" type="password" value={password} onChange={(event) => { this.onChangeInput(event, 'password') }} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /> </label>
                                <input className="form-control" type="text" value={firstName} onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /> </label>
                                <input className="form-control" type="text" value={lastName} onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /> </label>
                                <input className="form-control" type="text" value={phoneNumber} onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /> </label>
                                <input className="form-control" type="text" value={address} onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-select"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    }

                                    )}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-select"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-select"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleChangeImage(event)}
                                    />
                                    <label htmlFor="previewImg" className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div
                                        className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={this.openPreviewImage}
                                    ></div>

                                </div>
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary' onClick={() => this.handleSaveUser()}><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div >
                {this.state.isopen && (
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isopen: false })}
                    />
                )}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fecthGenderStart: () => dispatch(actions.fecthGenderStart()),
        fecthPositionStart: () => dispatch(actions.fecthPositionStart()),
        fecthRoleStart: () => dispatch(actions.fecthRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
