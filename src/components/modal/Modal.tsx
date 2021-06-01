import React, { MouseEventHandler, PropsWithChildren, useEffect } from "react"
import { Variants, motion } from "framer-motion"
import { BsXCircle } from "react-icons/bs"

import "./Modal.scss"

const modalVariants: Variants = {
    open: {
        display:    "",
        opacity:    1,
        transition: {
            // Delay: 0,
        },
    },
    closed: {
        display:    "none",
        opacity:    0,
        transition: {
            delay: 0.75,
        },
    },
}
const bodyVariants: Variants = {
    open: {
        scale:      1,
        transition: {
            type: "spring",
        },
    },
    closed: {
        scale:      0,
        transition: {
            type: "spring",
            // Delay: 0.5,
        },
    },
}

export interface ModalProps {
    onClose: () => void;
    visible?: boolean
    title?: string | JSX.Element
}

export const Modal = React.forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
    ({
        children,
        onClose,
        visible = true,
        title = "",
    }, ref) => {
        const handleKeyPress = (e: KeyboardEvent) => {
            e.key?.toLowerCase().includes("esc")
            onClose()
        }

        const doNotClose: MouseEventHandler = e => e.stopPropagation()

        useEffect(() => {
            document.addEventListener("keydown", handleKeyPress)
        })

        return <motion.div
            className="modal"
            animate={visible ? "open" : "closed"}
            initial={false}
            variants={modalVariants}
            onClick={onClose}
        >
            <motion.div
                className="modal-body"
                ref={ref}
                variants={bodyVariants}
                onClick={doNotClose}
            >
                <header className="modal-header">
                    <span className="title">
                        {typeof title === "string" ? <h2>{title}</h2> : title}
                    </span>
                    <button className="close" aria-label="close" onClick={onClose}>
                        <BsXCircle />
                    </button>
                </header>
                <div className="modal-content">

                    {children}
                </div>
            </motion.div>
        </motion.div>
    })
