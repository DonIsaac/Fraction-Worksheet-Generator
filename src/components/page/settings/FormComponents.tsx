import React, { FC } from "react"
import { AnyAction, PayloadActionCreator } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

export type CheckboxProps<
    A extends (checked: boolean) => AnyAction// = PayloadActionCreator<boolean>
> = {

    /**
     * Used for `id`, `name`, etc.
     */
    name: string

    /**
     * Current value of checkbox.
     */
    value: boolean

    /**
     * Creates action that is dispatched when checkbox is clicked.
     */
    action: A
}
type CheckboxFnType = <
    A extends (checked: boolean) => AnyAction// = PayloadActionCreator<boolean>
>(props: CheckboxProps<A>) => React.ReactElement | null;
export const Checkbox: CheckboxFnType = (
    ({ name, value, action }) => {
        const dispatch = useDispatch()
        return <input
            id={name}
            name={name}
            type="checkbox"
            checked={value}
            className="form-check-input"
            onChange={
                () => dispatch(action(!value))
            }
        />
    })
