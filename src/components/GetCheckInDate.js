import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

class GetCheckInDate extends Component {
    state = {
        date: ''
    }


    render() {
        console.log(this.props);
        return (
            <div className="GetCheckInDate">
                <h2>Input Date</h2>
                <input type="text" placeholder="Check In Date"/>
                <button>Go</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    let checkInDates = state.firestore.ordered.checkIns ? state.firestore.ordered.checkIns : false 
    return {
        // auth: state.firebase.auth,
        checkInDates: checkInDates
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props, dispatch) => [
        {
            collection: 'checkIns',
        }
    ]),
)(GetCheckInDate);