import React, {useState} from 'react'

export default function PickAffiliation({ setAffiliation, nextState}) {
    let pickAffiliation = (e) => {
        setAffiliation(e.target.id);
    }

    return (
        <div className={`center pickAffiliation ${nextState !== 1 ? 'fadeOut' : 'fadeIn'}`}>
            <button id="family" className="affiliation" onClick={pickAffiliation}>
                <i className="fa fa-users" aria-hidden="true" id="family"></i>
                <h4 id="family">Family</h4>
            </button>
            <button id="individual" className="affiliation" onClick={pickAffiliation}>
                <i id="individual" className="fa fa-user" aria-hidden="true"></i>
                <h4 id="individual">Individual</h4>
            </button>
        </div>
    )
}
