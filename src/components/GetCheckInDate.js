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
        let dates = this.props.checkInDates ? this.props.checkInDates[0] : [0, 1];
        console.log(dates);
        // let newDates = dates.reverse();
        // console.log(newDates);
        return (
            <>
                <div className="mainContainer">
                    <div className="pickData">
                        <h1>Check in Dates</h1>
                        <div className="getCheckInDate">
                            {
                                Object.keys(dates).map((key, index) => {
                                    return (
                                        <Link to={`/data/${dates[key].date}`}>
                                            <div className="dates" key={index} index={dates[key].date}>
                                                <h4 className="date">{dates[key].date.toUpperCase()}</h4>
                                                <h4 className="date">{dates[key].totalWatching} people Joined</h4>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    let checkInDates = state.firestore.ordered.checkIns ? state.firestore.ordered.checkIns : [{id:0}] 
    delete checkInDates[0].id;
    console.log(checkInDates);
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