
import React, { AnchorHTMLAttributes } from "react"
import { BaseButtonProps } from "./Button"
import "./Button.scss"

export type ButtonLinkProps =
    BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>



/**
 * A link element styled as a Button. It looks the same as `Button` and is used
 * in the same manner.
 *
 * @see Button
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
