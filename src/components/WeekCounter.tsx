// @ts-nocheck
import React, { useState} from "react"
import { weekNumber } from "../utils/timeMangment"

export const WeekCounter = () => {
    const [currentWeek, setcurrentWeek] = useState("00")
    React.useEffect(() => {
        setcurrentWeek(weekNumber)
    })
    return <div className="text-white text-sm xl:text-lg p-0.5 text-shadow-md">Current week: {currentWeek}</div>
}
