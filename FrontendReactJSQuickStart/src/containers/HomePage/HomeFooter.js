import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomeFooter extends Component {
    render() {
        // let language= this.props.language;
        // console.log("check language: ", language)
        return (
            <React.Fragment>
                <div className='home-footer'>
                    <p> &copy; 2025 with Z-TER A.K.A Lê Hùng Cường. More Infomation, please click my ... <a target='_blank' href='https://www.facebook.com/cuong.le.572304'> &#8594; Click here &#8592;</a></p>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

