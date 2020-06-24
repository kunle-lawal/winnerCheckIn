import React, { Component } from 'react'
import Header from './Header'
import PickAffiliation from './PickAffiliation'
import UserInfo from './UserInfo'
import FinalInfo from './FinalInfo'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {checkInUser} from '../store/actions/checkInAction'

class CheckIn extends Component {
    state = {
        name: '',
        country: 'United States',
        state: 'Massachusetts',
        totalWatching: {
            male: 0,
            females: 0,
            kids: 0
        },
        firstTime: '',
        affiliation: false,
        email: '',
        phoneNum: '',
        nextState: 1,
        gender: ''
    }

    setAffiliation = (affiliation) => {
        this.setState({
            affiliation: affiliation,
            nextState: 2
        })
    }

    getUserInfo = (data) => {
        this.setState({
            name: data.name,
            state: data.state,
            country: data.country,
            nextState: data.nextState ? data.nextState : this.state.nextState
        })
    }

    getFinalData = (data) => {
        this.setState({
            totalWatching: {
                males: Number(data.males),
                females: Number(data.females),
                kids: Number(data.kids),
                total: Number(data.males) + Number(data.females) + Number(data.kids)
            },
            firstTime: data.firstTime,
            email: data.email,
            phoneNum: data.phoneNum,
            gender: data.gender
        })
    }

    checkErrors = () => {
        let hasErrors = false;
        // let letters = /^[A-Za-z]+$/;
        for (const prop in this.state) {
            if (document.getElementById(prop)) {
                if(this.state[prop] === '') {
                    document.getElementById(prop).style.borderBottom = '2px solid #ff7474';
                    hasErrors = true;
                } else {
                    document.getElementById(prop).style.borderBottom = 'initial';
                }
            }
        }
        if (document.getElementById('email')) {
            if (!(this.state.email.includes('@') && this.state.email.includes('.'))) {
                document.getElementById('email').style.borderBottom = '2px solid #ff7474';
                hasErrors = true;
            }  else {
                document.getElementById('email').style.borderBottom = 'initial';
            }
        }
        return hasErrors;
    }

    sendData = () => {
        let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        let date = new Date
        let dateFormat = `${months[date.getMonth()]}-${date.getDate()}-${date.getFullYear()}`
        let data = {
            affiliation: this.state.affiliation,
            country: this.state.country,
            state: this.state.state,
            firstTime: this.state.firstTime,
            name: this.state.name,
            phoneNum: Number(this.state.phoneNum),
            email: this.state.email,
            totalWatching: this.state.totalWatching,
            gender: this.state.gender,
            dateFormat,
            checkInDate: date.toGMTString()
        }

        if (!this.checkErrors()) {
            this.props.checkInUser(data);
            this.setState({
                nextState: 4
            })
        }
    }

    setNextState = () => {
        if(this.state.nextState === 1) {return}
        this.setState({
            nextState: this.state.nextState - 1
        })
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="checkInContainer">
                    {
                        this.state.nextState != 4 ? <Header
                            nextState={this.state.nextState}
                        /> : null
                    }
                    <PickAffiliation
                        setAffiliation={this.setAffiliation}
                        affiliation={this.state.affiliation}
                        nextState={this.state.nextState}
                    />
                    <UserInfo
                        location={{ state: this.state.state, country: this.state.country }}
                        getUserInfo={this.getUserInfo}
                        nextState={this.state.nextState}
                        affiliation={this.state.affiliation}
                    />
                    <FinalInfo
                        getFinalData={this.getFinalData}
                        nextState={this.state.nextState}
                        name={this.state.name}
                        affiliation={this.state.affiliation}
                    />
                    <br />
                    {this.state.firstTime !== '' && (this.state.nextState === 3) ? <div className="checkIn center">
                        <button className="submit center btn" onClick={this.sendData}>Check In</button>
                    </div> : null}

                    {
                        this.state.nextState === 4 ?
                            <div className="thankYouScreen center">
                                <div className="center">
                                    <span><i className="fa fa-paper-plane" aria-hidden="true"></i></span>
                                    <h1>Thank You!</h1>
                                    <br />
                                    <h1>God Bless!</h1>
                                </div>
                            </div> : null
                    }
                    {
                        this.state.nextState > 1 && this.state.nextState < 4 ? <button className="backButton" onClick={() => this.setNextState()}><span><i className="fas fa-arrow-left"></i></span>Back</button> : null
                    }
                </div>
            </div> 
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkInUser: (data) => dispatch(checkInUser(data)),
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(CheckIn);