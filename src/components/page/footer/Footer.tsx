import React, { FC } from "react"
import { BsFillHeartFill } from "react-icons/bs"

import "./Footer.scss"

export interface FooterProps {

}

export const Footer: FC<FooterProps> = () => (
    <footer>
        <h3>Made with <BsFillHeartFill title="love" /> by <a href="https://github.com/DonIsaac" target="_blank" rel="noreferrer">Don</a></h3>
    </footer>
)
