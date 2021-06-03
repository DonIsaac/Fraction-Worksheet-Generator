
import React from "react"
// Also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0"

import { ButtonLink, ButtonLinkProps } from "./ButtonLink"

export default {
    title:     "Components/Button Link",
    component: ButtonLink,
    argTypes:  {
        backgroundColor: { control: "color" },
    },
} as Meta

const Template: Story<ButtonLinkProps> = (args) => <ButtonLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
    primary: true,
    label:   "Button",
}

export const Secondary = Template.bind({})
Secondary.args = {
    label: "Button",
}

export const Large = Template.bind({})
Large.args = {
    size:  "large",
    label: "Button",
}

export const Small = Template.bind({})
Small.args = {
    size:  "small",
    label: "Button",
}
