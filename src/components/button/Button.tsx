import React, { ButtonHTMLAttributes } from "react"
import classNames from "classnames"
import "./Button.scss"

export interface BaseButtonProps {

  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  /**
   * What background color to use
   */
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";

  /**
   * Button contents. Ignored if children are provided
   */
  label?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * A styled button component.
 */
export const Button: React.FC<ButtonProps> = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>( ({
    primary = false,
    size = "medium",
    type = "button",
    backgroundColor,
    label,
    children,
    className,
    ...props
},
ref) => {
    const mode = primary ? "primary" : "secondary"
    return (
        <button
            type={type}
            className={classNames(["button", size, mode, className])}
            style={{ backgroundColor }}
            ref={ref}
            {...props}
        >
            {children ?? label ?? ""}
        </button>
    )
})
