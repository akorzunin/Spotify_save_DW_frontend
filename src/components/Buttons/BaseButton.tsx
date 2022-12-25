import React, { FC } from "react"
import { Link } from "react-router-dom";

export const BaseButtonClass = `cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
    text-sm font-medium text-black rounded-md hover:opacity-80 transition-opacity
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`

interface IBaseButton {
    title: string;
    link: string;
    color: string;
    style: string;
}

const BaseButton: FC<IBaseButton> = ({
    title = "Button",
    link = "/",
    color = "bg-blue-700",
    style = "",
}) => {
    return (
        <a
            tabIndex={0}
            href={link}
            className={`${BaseButtonClass} ${color} ${style}`}
        >
            {title}
        </a>
    )
}

export default BaseButton
