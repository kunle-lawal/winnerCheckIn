import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

class GetCheckInDate extends Component {
    state = {
        date: ''
    }

    setDates = (data) => {
        let newDates = [];
        let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        Object.keys(data).map((key, index) => {
            let date = data[key].date.split('-');
            console.log();
            date[0] = months.indexOf(date[0]);
            date.join('-');
            console.log(date);
            newDates.push({
                date: data[key].date,
                totalWatching: data[key].totalWatching
            })
        })
        console.log(newDates);
        console.log(newDates.sort());
    }


    render() {
        let dates = this.props.checkInDates ? this.props.checkInDates : false;
        // let newDates = dates.reverse();
        console.log(dates);
        return (
            <>
                <div className="mainContainer" onClick={() => this.setDates(dates)}>
                    <div className="pickData">
                        <h1>Check in Dates</h1>
                        <div className="getCheckInDate">
                            {
                                dates ? Object.keys(dates).map((key, index) => {
                                    return (
                                        <Link to={`/data/${dates[key].date}`} key={index}>
                                            <div className="dates" key={index} index={dates[key].date}>
                                                <h4 className="date">{dates[key].date.toUpperCase()}</h4>
                                                <h4 className="date">{dates[key].totalWatching} people Joined</h4>
                                            </div>
                                        </Link>
                                    )
                                }) : null
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
    console.log(state);
    let checkInDates = state.firestore.data.checkIns ? state.firestore.data.checkIns.dates : false;
    console.log(checkInDates);
    // delete checkInDates[0].id;
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