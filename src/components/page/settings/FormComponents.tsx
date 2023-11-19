/**
 * @file FormComponents.tsx
 *
 * Contains components used by SettingsForm.tsx
 */
import React, { PropsWithChildren, FC } from "react"
import classNames from "classnames"
import { AnyAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

export type InputProps<
    P, A extends (arg: P) => AnyAction // PayloadActionCreator<P>
> = {

    /**
     * Used for `id`, `name`, etc.
     */
    name: string

    /**
     * Current value of input
     */
    value: P

    /**
     * Creates action that is dispatched when value is changed.
     */
    action: A
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "min" | "max">

/**
 * A form input field that dispatches an action when its value changes.
 */
type InputComponent<P> = <A extends (arg: P) => AnyAction>(
    props: InputProps<P, A>
) => React.ReactElement | null

/**
 * Inline checkbox input component.
 *
 * @see {@link https://getbootstrap.com/docs/4.0/components/forms/#inline}
 *
 * @param props
 */
export const CheckboxInput: InputComponent<boolean> = ({
    name,
    value,
    action,
    ...rest
}) => {
    const dispatch = useDispatch()

    return (
        <input
            id={name}
            name={name}
            type="checkbox"
            checked={value}
            className="form-check-input"
            onChange={
                () => dispatch(action(!value))
            }
            {...rest}
        />
    )
}

export const NumberInput: InputComponent<number> = ({
    name,
    value,
    action,
    ...rest
}) => {
    const dispatch = useDispatch()

    return (
        <input
            id={name}
            name={name}
            type="number"
            min={0}
            value={value}
            className="form-input"
            onChange={
                e => dispatch(action(Number.parseInt(e.target.value)))
            }
            {...rest}
        />
    )
}

type FormGroupProps = {
    className?: string
    legend?: string
}

/**
 * @see {@link https://getbootstrap.com/docs/4.0/components/forms/#form-groups}
 *
 * @param props
 */
export const FormGroup: FC<PropsWithChildren<FormGroupProps>> =
    ({ className, legend, children }) => (
        <div className={classNames("col-12 form-group mb-3", className)}>
            <fieldset>
                {legend && <legend>{legend}</legend>}
                <div className="text-center">
                    {children}
                </div>
            </fieldset>
        </div>
    )
