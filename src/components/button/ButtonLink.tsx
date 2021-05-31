
import React, { AnchorHTMLAttributes } from "react"
import { BaseButtonProps } from "./Button"
import "./Button.scss"

export type ButtonLinkProps =
    BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>



/**
 * Primary UI component for user interaction
 */
export const ButtonLink: React.FC<ButtonLinkProps> = React.forwardRef<
    HTMLAnchorElement,
    ButtonLinkProps
>( ({
    primary = false,
    size = "medium",
    type = "button",
    backgroundColor,
    label,
    children,
    ...props
},
ref) => {
    const mode = primary ? "primary" : "secondary"
    return (
        <a
            type={type}
            className={["button", size, mode].join(" ")}
            style={{ backgroundColor }}
            ref={ref}
            {...props}
        >
            {children ?? label ?? ""}
        </a>
    )
})
