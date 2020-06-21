import React from 'react'
import logo from '../assets/WCI.png'

export default function Header(props) {
    return (
        <header style={props.nextState === 3 ? {'marginBottom': '50px'} : {}}>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            {/* <div className="center title" style={props.nextState === 1 ? { } : {'opacity':'0', 'margin-top': '-100px'}}>
                <h1>Check-In</h1>
                <h3>Winners Chapel Intn'l MA</h3>
            </div> */}
        </header>
    )
}
