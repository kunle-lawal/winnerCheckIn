import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

const memberData = [['name', 'Name'], ['affiliation', 'Affiliation'],
['checkInDate', 'Check In Date'], ['country', 'Country'],
['state', 'State'], ['email', 'Email'], ['firstTime', 'First Timer'], ['gender', 'Gender'], ['totalWatching', 'Total Watching']]

class GetFullData extends Component {
    render() {
        let checkIns = this.props.checkIns ? this.props.checkIns : [{}];
        // }
        // console.log(this.state)
        return (
            <table>
                <thead>
                    <tr>
                        {
                            memberData.map((dataType, index) => {
                                return (
                                    <th className={`column${index + 2}`} key={index} id={index}>{dataType[1]}</th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        checkIns.map((item, index) => {
                            return (
                                <tr key={index} id={index}>
                                    {
                                        item.map((itemData, index) => {
                                            console.log(itemData);
                                            return (
                                                <td>{typeof itemData === 'object' ? itemData.total : itemData}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const checkIns = state.firestore.ordered['checkIns/dates/date_' + ownProps.match.params.id];
    let data = [];
    console.log(checkIns);
    for (let i = 0; i < (checkIns ? checkIns.length : 0); i++) {
        data.push([]);
        for (let y = 0; y < memberData.length; y++) {
            data[i].push(checkIns[i][memberData[y][0]]);
        }
    }
    // console.log(data);
    return {
        // auth: state.firebase.auth,
        checkIns: data ? data : false,
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
)(GetFullData);