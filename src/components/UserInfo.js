import React, { Component } from 'react';
import { countries, states } from './Data'
import Location from './Location'

export default class UserInfo extends Component {
    state = {
        name: '',
        country: 'United States',
        state: 'Massachusetts',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        this.props.getUserInfo(this.state)
    }

    pickLocation = (place, location) => {
        this.setState({
            [place]: location
        })
        this.props.getUserInfo({...this.state, [place]: location});
    }

    sendData = () => {
        this.props.getUserInfo({ ...this.state, nextState: 3});
    }

    componentDidMount() {
        this.setState({
            country: this.props.location.country,
            state: this.props.location.state
        })
    }

    render() {
        return (
            <div className={`center userInfo ${this.props.nextState !== 2 ? '' : 'fadeIn'}`}>
                <div className="inputs">
                    <div className="input">
                        <input type="text" autoComplete="new-password" className="name" placeholder={this.props.affiliation === "family" ? 'Family Name' : 'Name'} id="name" onChange={this.handleChange} value={this.state.name}/>
                    </div>
                    <div className="location">
                        <Location 
                            location={countries}
                            location_str={'country'}
                            pickLocation={this.pickLocation}
                            value={this.state.country}
                        />
                        {
                            this.state.country === "United States" ? <Location
                                location={states}
                                location_str={'state'}
                                pickLocation={this.pickLocation}
                                value={this.state.state}
                            /> : null
                        }
                    </div>
                </div>
                

                {
                    this.state.name != '' ? <button className="center checkInBtn" onClick={this.sendData}>Next <span><i className="fas fa-arrow-right"></i></span></button> : null
                }
            </div>
        )
    }
}
