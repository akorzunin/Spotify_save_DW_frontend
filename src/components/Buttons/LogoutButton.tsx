// @ts-nocheck
import React from "react"
import { Link } from "react-router-dom"
import Button from "./BaseButton"
import { deleteCookies } from "../../utils/cookieHandle"

const LogoutButton = ({ ButtonStyle }) => {
    return (
        // <div >
            <Link to="/" onClick={deleteCookies}>
                <Button
                    style={ButtonStyle}
                    title="Logout"
                    link="/"
                    color="bg-red-500"
                />
            </Link>
        // </div>
    )
}

export default LogoutButton
