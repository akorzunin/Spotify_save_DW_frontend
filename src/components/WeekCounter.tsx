// @ts-nocheck
import React, { useState} from "react"
import { weekNumber } from "../utils/timeMangment"

export const WeekCounter = ({ className }) => {
    const [currentWeek, setcurrentWeek] = useState("00")
    React.useEffect(() => {
        setcurrentWeek(weekNumber)
    })
    return <div className={className}>Current week: {currentWeek}</div>
}
