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
        let total = 0;
        return (
            <div className="center tableContainer">
                <div className="wrapTable">
                    <div className="table2 tables">
                        <table>
                            <thead className="table1 tables">
                                <tr>
                                    {
                                        memberData.map((dataType, index) => {
                                            return (
                                                <th className={`column${index + 2}`} key={index} id={index}>{dataType[1]}</th>
                                            )
                                        })
                                    }
                                    <th>Females</th>
                                    <th>Males</th>
                                    <th>Kids</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkIns.map((item, index) => {
                                        total += typeof checkIns[index][8] === 'object' ? checkIns[index][8].total : checkIns[index][8];
                                        let tableRow = <tr key={index} id={index}>
                                                    {
                                                        item.map((itemData, index) => {
                                                            let data = itemData;
                                                            if(typeof itemData === 'object') {
                                                                data = itemData.total;
                                                            } else if(typeof itemData === 'boolean') {
                                                                data = itemData ? 'Yes' : 'No'
                                                            } else if(data === 'empty') {
                                                                data = '';
                                                            }
                                                            return (
                                                                <td key={index} id={index} style={data === '' ? {'backgroundColor': 'rgb(216, 215, 215)'} : {}}>{data}</td>
                                                            )
                                                        })
                                                    }
                                                </tr> 
                                        return (
                                            index === checkIns.length - 1 ?
                                                <React.Fragment key={index}>
                                                {tableRow}
                                                <tr key={index + 1} id={index + 1}>
                                                    {
                                                        item.map((itemData, index) => {
                                                            let data = index === 0 ? 'Total' : (index === 1 ? total : false)
                                                            return (
                                                                <td key={index} style={!data ? {'backgroundColor': 'rgb(241, 93, 93)', 'border': 'initial'} : {}}>{!data ? '' : data}</td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                                </React.Fragment>
                                                : 
                                                tableRow
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const checkIns = state.firestore.ordered['checkIns/dates/date_' + ownProps.match.params.id];
    let data = [];
    for (let i = 0; i < (checkIns ? checkIns.length : 0); i++) {
        data.push([]);
        for (let y = 0; y < memberData.length; y++) {
            let value = checkIns[i][memberData[y][0]];
            // console.log(memberData[y][0]);
            // console.log(value);
            let hasObject = typeof checkIns[i].totalWatching === 'object';
            console.log(hasObject);
            if(memberData[y][0] === 'totalWatching') {
                if(typeof value === 'object') {
                    hasObject = true;
                    data[i].push(value.total);
                    data[i].push(value.females);
                    data[i].push(value.kids);
                    data[i].push(value.males);
                } else {
                    data[i].push(value);
                    data[i].push('empty');
                    data[i].push('empty');
                    data[i].push('empty');
                }
            } else if(memberData[y][0] === 'gender') {
                if(hasObject) {
                    data[i].push('empty');
                } else {
                    data[i].push(value);
                }
            } else {
                data[i].push(value);
            }
        }
        console.log('_______----_______')
    }
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