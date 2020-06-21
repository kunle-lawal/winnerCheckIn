import React, { Component } from 'react'

export default class Location extends Component {
    state = {
        suggestions: [],
        open: false,
        location: '',
        value: ''
    }

    findName = (e) => {
        let name = (e.target.value).toUpperCase();
        let suggestions = [];
        const location = this.props.location;
        for (let i = 0; i < location.length; i++) {
            let place = location[i];
            let str = place.substring(0, name.length);
            let firstLetterMatch = (((str.toUpperCase()) === (name.toUpperCase())) && name !== "" && suggestions.length < 50)
            let fullMatch = (name.length >= 3 && (place.toUpperCase()).includes(name));
            if (firstLetterMatch || fullMatch) {
                suggestions.push(place);
            }
        }
        this.setState({
            suggestions,
            value: e.target.value
        })
    }

    renderAll = (e) => {
        this.setState({
            suggestions: this.state.open ? [] : this.props.location,
            open: !this.state.open,
            // value: this.state.open ? '' : this.state.value
        })
    }

    pickLocation = (e) => {
        this.setState({
            location: e.target.id,
            open: false,
            suggestions: [],
            value: e.target.id
        })
        this.props.pickLocation(this.props.location_str, e.target.id);
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    render() {
        return (
            <div className={`${this.props.location_str} inputs`}>
                <input type="text" autoComplete="new-password" id="country" className="place"
                    placeholder={(this.props.location_str)} onChange={this.findName} value={this.state.value}/>
                <i className={`fa fa-caret-up inputArrow ${this.state.open ? 'upsidedown' : ''}`} id="country" aria-hidden="true" onClick={this.renderAll}></i>
                <div id="countryContainer" className="placeContainer">
                    {
                        this.state.suggestions.map((suggestion, index) => {
                            return (
                                <button id={suggestion} key={index} onClick={this.pickLocation}>{suggestion}</button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
