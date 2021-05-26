import React, { ButtonHTMLAttributes } from "react"
import "./Button.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

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

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
    primary = false,
    size = "medium",
    type = "button",
    backgroundColor,
    label,
    children,
    ...props
}) => {
    const mode = primary ? "primary" : "secondary"
    return (
        <button
            type={type}
            className={["storybook-button", size, mode].join(" ")}
            style={{ backgroundColor }}
            {...props}
        >
            {children ?? label ?? ""}
        </button>
    )
}
