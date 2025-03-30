import { ComponentProps } from "react";
import Button from "./button";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof Button>;

const styles: React.CSSProperties = {
  textAlign: "center"
}

const meta: Meta<StoryProps> = {
  component: Button,
  title: "Button",
  decorators: [(story) => <div style={styles}>{story()}</div>],
  tags: ['autodocs'],
} 

export default meta;

type Story = StoryObj<StoryProps>

export const DefaultButton: Story = {
  args: {
  },
  render: (args) => {
    return <Button {...args}>default button</Button>
  },
}

export const ButtonWithSize: Story = {
  name: "不同尺寸的 Button",
  args: {
  },
  render: (args) => {
    return <>
      <Button size="lg">large button</Button>
      <Button size="sm">small button</Button>
    </>
  }
}

export const ButtonWithType: Story = {
  name: "不同类型的 Button",
  args: {
  },
  render: (args) => {
    return <>
      <Button btnType="primary">primary button</Button>
      <Button btnType="danger">danger button</Button>
      <Button btnType="link" href="https://google.com" >link button</Button>
    </>
  }
}