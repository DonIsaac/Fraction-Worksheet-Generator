import React, { FC } from "react"
import { BsArrowClockwise, BsCheckCircle, BsFillGearFill, BsFillPlusCircleFill } from "react-icons/bs"
import { Button } from "../../button"

import "./Header.scss"

export type HeaderLinkName = "settings" | "new" | "reset" | "finish"
export interface HeaderProps {
    onClick: (linkName: HeaderLinkName) => void
    isDone: boolean
}

const Header: FC<HeaderProps> = ({
    onClick,
    isDone
}) => {
    return (
        <header>
            <h1>Fraction Worksheet Generator</h1>
            <menu>
                <Button className="settings" primary onClick={() => onClick("settings")} role="menuitem">
                    <BsFillGearFill /> Settings
                </Button>
                <Button className="new" primary onClick={() => onClick("new")} role="menuitem">
                    <BsFillPlusCircleFill /> New
                </Button>
                <Button className="reset" primary onClick={() => onClick("reset")} role="menuitem" disabled={isDone}>
                    <BsArrowClockwise /> Reset
                </Button>
                <Button className="finish" primary onClick={() => onClick("finish")} role="menuitem" disabled={isDone}>
                    <BsCheckCircle /> Finish
                </Button>
            </menu>
        </header>
    )
}

export default React.memo(Header)
