

import { Story, Meta } from "@storybook/react/types-6-0"
import { Footer, FooterProps } from "./Footer"

export default {
    title:     "Page/Footer",
    component: Footer,
} as Meta

const Template: Story<FooterProps> = () => <Footer />

export const Basic = Template.bind({})
