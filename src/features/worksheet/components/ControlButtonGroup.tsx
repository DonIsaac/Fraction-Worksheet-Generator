import React, { FC } from "react"
import { BsArrowClockwise, BsCheckCircle, BsFillGearFill } from "react-icons/bs"
import { Button } from "../../../components/button/Button"

export interface ControlButtonGroupProps {
    isDone: boolean
    onDone?: () => void
    onReset?: () => void
    onSettingsOpen?: () => void
}
export const ControlButtonGroup: FC<ControlButtonGroupProps> = ({
    isDone,
    onDone,
    onReset,
    onSettingsOpen,
}) => (
    <div className="button-group">
        {!isDone &&
                <Button
                    type="button"
                    role="submit"
                    primary
                    onClick={onDone}
                >
                    <BsCheckCircle /> Finish
                </Button>
        }
        <Button
            type="button"
            role="reset"
            primary={isDone}
            onClick={onReset}
        >
            <BsArrowClockwise /> Reset
        </Button>

        <Button primary className="settings" onClick={onSettingsOpen}>
            <BsFillGearFill /> Settings
        </Button>
    </div>
)
