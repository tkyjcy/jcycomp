import { ComponentProps } from 'react';
import Tabs from './tabs';
import { TabItem } from './tabItem';
import { Meta, StoryObj } from '@storybook/react';
import Icon from '../Icon/icon';

type StoryProps = ComponentProps<typeof Tabs>

const meta: Meta<StoryProps> = {
  component: Tabs,
  title: 'Tabs',
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<StoryProps>

export const DefaultTabs: Story = {
  name: '默认的 Tabs',
  args: {
  },
  render: (args) => {
    return <Tabs {...args}>
      <TabItem label="tab1">this is content1</TabItem>
      <TabItem label="tab2">this is content2</TabItem>
      <TabItem label="tab3">this is content3</TabItem>
    </Tabs>
  }
}

export const CardTabs: Story = {
  name: '卡片类型的 Tabs',
  args: {
    type: 'card'
  },
  render: (args) => {
    return <Tabs {...args}>
      <TabItem label="card1">this is content1</TabItem>
      <TabItem label="card2">this is content2</TabItem>
      <TabItem label="disabled" disabled={true}></TabItem>
    </Tabs>
  }
}

export const CustomTabs: Story = {
  name: '自定义样式的 Tabs',
  args: {
  },
  render: (args) => {
    return <Tabs {...args}>
      <TabItem label={<Icon icon={"check-circle"}/>}>自定义图标</TabItem>
      <TabItem label="tab">this is content</TabItem>
    </Tabs>
  }
}