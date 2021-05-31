/* eslint-disable @typescript-eslint/no-empty-function */

import React, { PropsWithChildren } from "react"
import { Story, Meta } from "@storybook/react"
import { Modal, ModalProps } from "./Modal"

export default {
    title:     "Components/Modal",
    component: Modal,
    argTypes:  { onClosed: { action: "clicked" } },
} as Meta

const Template: Story<Partial<PropsWithChildren<ModalProps>>> = ({
    children,
    ...args
}) => <Modal onClose={() => {}} {...args}>{children}</Modal>

export const WithText = Template.bind({})
WithText.args = {
    children: <p>
        Hello! This is a bunch of text inside of a Modal component! It is here
        to simulate what happens when you display a message here
    </p>,
}
