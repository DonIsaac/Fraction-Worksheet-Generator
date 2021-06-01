import React, { FC } from "react"
import { BsFillGearFill } from "react-icons/bs"
import { Button } from "../../button"

import "./Header.scss"

export type HeaderLinkName = "settings"
export interface HeaderProps {
    onClick: (linkName: HeaderLinkName) => void
}

export const Header: FC<HeaderProps> = ({
    onClick,
}) => (
    <header>
        <h1>Fraction Worksheet Generator</h1>
        <nav>
            <Button primary className="settings" onClick={() => onClick("settings")}>
                <BsFillGearFill /> Settings
            </Button>
        </nav>
    </header>
)
