import { ComponentProps } from "react";
import Alert from "./alert";
import { Meta, StoryObj } from "@storybook/react/*";

type StoryProps = ComponentProps<typeof Alert>;

const meta: Meta<StoryProps> = {
  component: Alert,
  title: "Alert",
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<StoryProps>

export const DefaultAlert: Story = {
  args: {
    title: 'this is default alert',
  },
  render: (args) => {
    return <Alert {...args} />
  }
}

export const SuccessAlert: Story = {
  args: {
    title: 'this is success alert',
    description: 'this is alert description',
    type: 'success'
  },
  render: (args) => {
    return <Alert {...args} />
  }
}

export const DangerAlert: Story = {
  args: {
    title: 'this is danger alert',
    description: 'this is alert description',
    type: 'danger'
  },
  render: (args) => {
    return <Alert {...args} />
  }
}

export const WarningAlert: Story = {
  args: {
    title: 'this is warning alert',
    description: 'this is alert description',
    type: 'warning'
  },
  render: (args) => {
    return <Alert {...args} />
  }
}

