import React from "react"
import { Link } from "react-router-dom"

function LiNavbar(props) {
    return (
        <>
            {props.name.map((n, idx) => <li key={n = idx} className={n.clase}><Link to={n.path} >{n.name}</Link></li>)}
        </>
    )
}

export default LiNavbar