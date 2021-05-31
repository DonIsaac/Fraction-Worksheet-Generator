import React, { ButtonHTMLAttributes } from "react"
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
 * Primary UI component for user interaction
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
    ...props
},
ref) => {
    const mode = primary ? "primary" : "secondary"
    return (
        <button
            type={type}
            className={["button", size, mode].join(" ")}
            style={{ backgroundColor }}
            ref={ref}
            {...props}
        >
            {children ?? label ?? ""}
        </button>
    )
})
