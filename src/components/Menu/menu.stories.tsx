import React from "react";
import { ComponentProps } from "react";
import Menu from "./index";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof Menu>;


const meta: Meta<StoryProps> = {
  component: Menu,
  title: "Menu",
  tags: ['autodocs'],
  subcomponents: { 
    SubMenu: Menu.SubMenu as React.ComponentType<unknown>,
    Item: Menu.Item as React.ComponentType<unknown>,
  },
} 

export default meta;

type Story = StoryObj<StoryProps>

export const DefaultMenu: Story = {
  args: {
  },
  render: (args) => {
    return <Menu defaultIndex='0' {...args} >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item> 
    <Menu.SubMenu title="下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
  },
}