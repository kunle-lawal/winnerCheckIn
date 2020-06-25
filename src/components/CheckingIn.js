import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class CheckIns extends Component {
    render() {
        return (
            <div className="mainContainer">
                <div className="checkIns">
                    <h1 className="checkInDate" style={{ 'background-color': '#f15d5d', 'color': 'white'}}>{this.props.checkInDate.toUpperCase()}</h1>
                    {
                        this.props.checkIns ?
                            this.props.checkIns.map((user, index) => {
                                return (
                                    <div className="center user" key={index}>
                                        {
                                            user.affiliation === 'family'
                                                ?
                                                <h2>{user.affiliation === 'individual' ? user.totalWatching : user.totalWatching.total} {user.totalWatching > 1 ? 'people' : 'person'} from <span>{user.name}</span></h2>
                                                :
                                                <h2><span>{user.name}</span> has checked in.</h2>
                                        }
                                    </div>
                                )
                            }) : <h4 className="red">No one has checked in Yet</h4>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const checkIns = state.firestore.ordered['checkIns/dates/date_' + ownProps.match.params.id];
    return {
        // auth: state.firebase.auth,
        checkIns: checkIns ? checkIns : false,
        checkInDate: ownProps.match.params.id
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
            collection: 'checkIns/' + 'dates/' + `date_${props.match.params.id}`,
            orderBy: ['dateAdded', 'asc']
        }
    ]),
)(CheckIns);