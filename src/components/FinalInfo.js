import React, { Component } from 'react'

export default class FinalInfo extends Component {
    state = {
        males: 0,
        females: 0,
        kids: 0,
        gender: 'female',
        firstTime: '',
        email: '',
        phoneNum: ''
    }

    handleChange = (e) => {
        let value = e.target.value;
        if (e.target.type === 'radio') {
            value = value === 'no' ?  false : value === 'yes' ? true : value;
        }
        if(e.target.type === 'select-one') {
            // this.setState({
            //     totalWatching: {
            //         ...this.state.totalWatching,
            //         [e.target.id]: Number(value)
            //     }
            // })
            // this.props.getFinalData({ ...this.state, [e.target.id]: value });
            // return 0;
        }
        this.setState({
            [e.target.id]: value
        })
        this.checkErrors()
        this.props.getFinalData({ ...this.state, [e.target.id]: value });
    }

    handlePhoneNum = (e) => {
        let value = e.target.value;
        // if(value.length > 12) {return}
        // value = Number(e.target.value);
        this.setState({
            phoneNum: value
        })
        this.checkErrors()
        this.props.getFinalData({...this.state, phoneNum: value});
    }

    checkErrors = () => {
        let hasErrors = false;
        for (const prop in this.state) {
            if (document.getElementById(prop)) {
                if (this.state[prop] === '') {
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
            } else {
                document.getElementById('email').style.borderBottom = 'initial';
            }
        }
        return hasErrors;
    }

    render() {
        let values = [];
        for (let i = 0; i <= 100; i++) { values.push(i)}
        return (
            <div className={`finalInfo ${this.props.nextState !== 3 ? '' : 'fadeIn'}`} >
                {
                    this.props.affiliation === 'family' ? <div className="familyCheckIn totalWatching">
                        <h3>
                            Hello <span>{this.props.name}</span>, how many people are watching including you?
                    </h3>
                        <div className="totalWatchingContainer">
                            <div className="select">
                                <h4>Total Males</h4>
                                <select type="select" name="males" id="males" onChange={this.handleChange}>
                                    {
                                        values.map((value, index) => {
                                            return <option id="males" key={index} value={value}>{value}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="select">
                                <h4>Total Females</h4>
                                <select type="select" name="females" id="females" onChange={this.handleChange}>
                                    {
                                        values.map((value, index) => {
                                            return <option id="females" key={index} value={value}>{value}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="select">
                                <h4>Total Kids</h4>
                                <select type="select" name="kids" id="kids" onChange={this.handleChange}>
                                    {
                                        values.map((value, index) => {
                                            return <option id="kids" key={index} value={value}>{value}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div> : <div className="individualCheckIn totalWatching">
                            <h3>
                                Hello <span>{this.props.name}</span>
                            </h3>

                            <div className="pickGender select">
                                <h4>Gender</h4>
                                <select type="select" name="gender" id="gender" onChange={this.handleChange}>
                                    <option id="gender" value='female'>Female</option>
                                    <option id="gender" value='male'>Male</option>
                                </select>
                            </div>
                    </div>
                }

                <div className="firstTimer">
                    <h4 id="firstTime">First time worshiping with us?</h4>
                    <div className="firstTimerOptions">
                        <label>
                            <input type="radio" id="firstTime" name="choice" value='yes' onClick={this.handleChange}/>
                            <span>Yes</span>
                        </label>
                        <label>
                            <input type="radio" id="firstTime" name="choice" value="no" onClick={this.handleChange}/>
                            <span>No</span>
                        </label>
                    </div>

                    {
                        this.state.firstTime != '' ? <div className="firstTimerInfo">
                            <div className="inputs">
                                <div className="input">
                                    <input type="email" className="email" id="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
                                </div>
                                <div className="input">
                                    <input autoComplete="new-password" type="number" id="phoneNum" name="phone" onChange={this.handlePhoneNum} value={this.state.phoneNum} placeholder="Phone #"/>
                                </div>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        )
    }
}
