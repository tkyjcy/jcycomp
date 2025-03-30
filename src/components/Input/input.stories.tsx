import React from 'react'
import { ComponentProps } from 'react'
import Input from './input'
import { Meta, StoryObj } from '@storybook/react'

type StoryProps = ComponentProps<typeof Input>
const ControoledInput = (props: StoryProps) => {
  const [value, setValue] = React.useState('')
  return (
    <Input
      defaultValue={value}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  )
}
const meta: Meta<StoryProps> = {
  component: Input,
  title: 'Input',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<StoryProps>

export const DefaultInput: Story = {
  args: {
    placeholder: '默认的button',
  },
  render: (args) => {
    return (
      <>
        <Input {...args} />
        <ControoledInput />
      </>
    )
  },
}

export const DisabledButton: Story = {
  args: {
    disabled: true,
    placeholder: '被禁用的input',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const CIcon: Story = {
  name: '有图标的input',
  args: {
    placeholder: 'icon with button',
    icon: 'search',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const DifferentSize: Story = {
  name: '不同大小的input',
  args: {},
  render: (args) => {
    return (
      <>
        <Input placeholder="large input" size="lg" {...args} />
        <Input placeholder="small input" size="sm" {...args} />
      </>
    )
  },
}

export const EPendInput: Story = {
  name: '有前后缀的input',
  args: {
    prepend: 'https://',
    append: '.com',
    placeholder: 'google',
  },
  render: (args) => {
    return <Input {...args} />
  },
}
