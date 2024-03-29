import React, { FC } from "react"
import { PayloadAction } from "@reduxjs/toolkit"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { BsCheckCircle, BsArrowClockwise } from "react-icons/bs"

import { Operation, QuestionGenerationConfig, symbolFor } from "../../../features/question"
import {
    RootState,
} from "../../../app/state"
import { Button } from "../../button"
import { CheckboxInput, NumberInput, FormGroup } from "./FormComponents"
import {
    addOperation,
    removeOperation,
    reset,
    setMixedFractions,
    setNegatives,
    setValueMax,
    setValueMin
} from "../../../features/worksheet/question-config.store"

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
        <form className="settings-form">
            <div className="row">
                {/* Operations */}
                <OperationsInputGroup operations={operations} />

                {/* Value Range */}
                <FormGroup legend="Value Range">
                    <NumberInput
                        name="value-min"
                        value={valueMin}
                        action={setValueMin}
                        min={1}
                    /> To <NumberInput
                        name="value-max"
                        value={valueMax}
                        action={setValueMax}
                        min={2}
                    />
                </FormGroup>

                {/* Negatives and Mixed Fractions */}
                <FormGroup legend="Fraction Properties">
                    <div className="col form-check form-check-inline">
                        <label htmlFor="negatives" className="form-check-label">Negatives?</label>
                        <CheckboxInput name="negatives" value={negative} action={setNegatives} />
                    </div>
                    <div className="col form-check form-check-inline">
                        <label htmlFor="mixed-fractions" className="form-check-label">Mixed Fractions?</label>
                        <CheckboxInput name="mixed-fractions" value={mixedFractions} action={setMixedFractions} />
                    </div>
                </FormGroup>
            </div>

            {/* Control Buttons */}
            <div className="button-group row centered">
                <div className="col-12">
                    <Button role="submit" primary onClick={onDone}>
                        <BsCheckCircle /> Done
                    </Button>
                    <Button role="clear" onClick={() => dispatch(reset())}>
                        <BsArrowClockwise /> Reset
                    </Button>
                </div>
            </div>
        </form>
    )
}

type OnOpChange = (checked: boolean) => PayloadAction<string>
type OperationsInputGroupProps = {

    /** All available operations that may be included in fraction problems */
    operations: Operation[] 
}
const OperationsInputGroup: FC<OperationsInputGroupProps> = ({
    operations,
}) => {

    const onChange: (op: Operation) => OnOpChange =
        op => checked => checked
            ? addOperation(op)
            : removeOperation(op)

    return (

        <FormGroup legend="Operations">
            {/* <label className="form-label">Operations: </label> */}
            {Object.keys(Operation).map(opName => {
                const name = `op-${opName.toLowerCase()}`
                const op: Operation = (
                    Operation as Record<string, string>
                )[opName] as Operation
                const display = symbolFor(op)
                const props = {
                    name,
                    value:  operations.includes(op),
                    action: onChange(op),
                }

                return (
                    <div className="form-check form-check-inline" key={name}>
                        <CheckboxInput {...props} />
                        <label htmlFor={name} className="form-check-label">{display}</label>
                        &nbsp;
                    </div>
                )
            })}
        </FormGroup>
    )
}
