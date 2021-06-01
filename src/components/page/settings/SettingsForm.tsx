import React, { FC } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { BsCheckCircle, BsArrowClockwise } from "react-icons/bs"
import { Operation, QuestionGenerationConfig, symbolFor } from "../../../lib"
import {
    addOperation,
    removeOperation,
    setValueMax,
    setValueMin,
    setNegatives,
    setMixedFractions,
    reset
} from "../../../state"
import { RootState } from "../../../state"
import { Button } from "../../button"

import "./SettingsForm.scss"

export interface SettingsFormProps {
    onDone: () => void
}

export const SettingsForm: FC<SettingsFormProps> = ({ onDone }) => {
    const dispatch = useDispatch()
    const {
        operations,
        range: [valueMin = 1, valueMax = 10] = [],
        // CountRange: [countMin = 2, countMax = 3] = [],
        mixedFractions = false,
        negative = false,
    } = useSelector<RootState, QuestionGenerationConfig>(
        store => store.questionConfig,
        shallowEqual
    )
    return (
        <form className="container">
            <OperationsInputGroup operations={operations} />
            <br />
            <div className="form-group">
                <label htmlFor="value-min,value-max">Value Range: </label>
                <br />
                <input
                    id="value-min"
                    name="value-min"
                    type="number"
                    min={0}
                    value={valueMin}
                    className="form-input"
                    onChange={
                        e => dispatch(setValueMin(Number.parseInt(e.target.value)))
                    }
                /> To <input
                    id="value-max"
                    name="value-max"
                    type="number"
                    min={1}
                    value={valueMax}
                    onChange={
                        e => dispatch(setValueMax(Number.parseInt(e.target.value)))
                    }
                />
            </div>
            <br />
            <div className="form-row form-group">
                <div className="col form-check form-check-inline">
                    <label htmlFor="negatives" className="form-check-label">Negatives?</label>
                    <input
                        id="negatives"
                        name="negatives"
                        type="checkbox"
                        checked={negative}
                        className="form-check-input"
                        onChange={
                            () => dispatch(setNegatives(!negative))
                        }
                    />
                </div>
                <div className="col form-check form-check-inline">
                    <label htmlFor="mixed-fractions" className="form-check-label">Mixed Fractions?</label>
                    <input
                        id="mixed-fractions"
                        name="mixed-fractions"
                        type="checkbox"
                        checked={mixedFractions}
                        className="form-check-input"
                        onChange={
                            () => dispatch(setMixedFractions(!mixedFractions))
                        }
                    />
                </div>
            </div>

            <div className="button-group centered">
                <Button role="submit" primary onClick={onDone}>
                    <BsCheckCircle /> Done
                </Button>
                <Button role="clear" onClick={() => dispatch(reset())}>
                    <BsArrowClockwise /> Reset
                </Button>
            </div>
        </form>
    )
}

const OperationsInputGroup: FC<{ operations: Operation[] }> = ({
    operations,
}) => {
    const dispatch = useDispatch()

    return (

        <div className="form-group">
            <label>Operations: </label>
            <br />
            {Object.keys(Operation).map(opName => {
                const name = `op-${opName.toLowerCase()}`
                const op: Operation = (
                    Operation as Record<string, string>
                )[opName] as Operation
                const display = symbolFor(op)
                const checked: boolean = operations.includes(op)
                const onChange = () => checked
                    ? dispatch(removeOperation(op))
                    : dispatch(addOperation(op))
                const props: Partial<React.DetailedHTMLProps<
                    React.InputHTMLAttributes<HTMLInputElement>,
                    HTMLInputElement
                >> = {
                    name,
                    checked,
                    onChange,
                    value:     opName,
                    id:        opName,
                    className: "form-check-input",
                }

                return (
                    <div className="form-check form-check-inline">

                        <input
                            type="checkbox"
                            {...props}
                        />
                        <label htmlFor={name} className="form-check-label">{display}</label>
                        &nbsp;
                    </div>
                )
            })}
        </div>
    )
}
