import React from "react"
import { SUM, AVERAGE } from "@formulajs/formulajs"

const FormulaDemo = () => {
    const numbers = [1, 2, 3, 4, 5]
    const sum = SUM(numbers)
    const avg = AVERAGE(numbers)

    return (
        <div className="p-4 bg-white rounded shadow mb-4">
            <h2 className="text-lg font-bold mb-2">Formula.js Demo</h2>
            <div>Numbers: {JSON.stringify(numbers)}</div>
            <div>SUM: {sum}</div>
            <div>AVERAGE: {avg}</div>
        </div>
    )
}

export default FormulaDemo
