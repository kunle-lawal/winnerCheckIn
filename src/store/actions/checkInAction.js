export const checkInUser = (data) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const  firebase = getFirebase();
        const firestore = getFirestore();
        const auth = firebase.auth();
        // console.log(data)
        let totalWatching = data.affiliation === 'family' ? data.totalWatching.total : 1
        firestore.collection('checkIns').doc('dates').collection(`date_${data.dateFormat}`).add({
            name: data.name,
            country: data.country,
            state: data.state,
            totalWatching: data.affiliation === 'family' ? data.totalWatching : 1,
            gender: data.gender,
            firstTime: data.firstTime,
            affiliation: data.affiliation,
            email: data.email,
            phoneNum: data.phoneNum,
            checkInDate: data.checkInDate,
            dateAdded: Date.now(),
            dateFormat: data.dateFormat
        }).then((ref) => {
            firestore.collection('checkIns').doc('dates').set({
                [data.dateFormat]: {
                    date: data.dateFormat,
                    totalWatching: firebase.firestore.FieldValue.increment(totalWatching)
                }
            }, { merge: true })
        })
    }
}

export const addDates = (data) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const  firebase = getFirebase();
        const firestore = getFirestore();
        const auth = firebase.auth();
        // console.log(data)
        firestore.collection('checkIns').doc('dates').set({
            dates: data
        }, { merge: true })
    }
}