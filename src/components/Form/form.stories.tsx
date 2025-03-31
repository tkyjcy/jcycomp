/* eslint-disable jsx-a11y/anchor-is-valid */
import { ComponentProps, useRef } from 'react'
import Form, { IFormRef } from './form'
import { Meta, StoryObj } from '@storybook/react/*'
import FormItem from './formItem'
import Input from '../Input/input'
import Button from '../Button/button'
import { CustomRule } from './useStore'
import { fn } from '@storybook/test'

type StoryProps = ComponentProps<typeof Form>

const meta: Meta<StoryProps> = {
  component: Form,
  title: 'Form',
  tags: ['autodocs'],
  decorators: [
    (story) => <div style={{ width: '50%', margin: '0 auto' }}>{story()}</div>,
  ],
}
export default meta
const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log('the value', getFieldValue('passw  ord'))
      console.log(value)
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
  }),
]
type Story = StoryObj<StoryProps>

export const DefaultForm: Story = {
  args: {
    initialValues: { username: 'jcy', agreement: false },
    onFinishFailed: fn(),
  },
  render: (args) => {
    const ref = useRef<IFormRef>(null)
    const resetAll = () => {
      console.log('form ref', ref.current)
      console.log('get value', ref.current?.getFieldValue('username'))
      ref.current?.resetFields()
    }
    return (
      <Form {...args} ref={ref}>
        {({ isValid, isSubmitting }) => (
          <>
            <FormItem
              label="用户名"
              name="username"
              rules={[{ type: 'email', required: true }]}>
              <Input />
            </FormItem>
            <FormItem
              label="密码"
              name="password"
              rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
              <Input />
            </FormItem>
            <FormItem label="重复密码" name="confirmPWD" rules={confirmRules}>
              <Input />
            </FormItem>
            <div
              className="agreement-section"
              style={{ display: 'flex', justifyContent: 'center' }}>
              <FormItem
                name="agreement"
                valuePropName="checked"
                getValueFromEvent={(e) => e.target.checked}
                rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}>
                <input type="checkbox" />
              </FormItem>
              <span className="agree-text">
                注册即代表你同意<a href="#">用户协议</a>
              </span>
            </div>
            <div className="jcy-form-submit-area">
              <Button type="submit" btnType="primary">
                登录 {isSubmitting ? '验证中' : '验证完毕'}{' '}
                {isValid ? '通过' : '没通过'}
              </Button>
              <Button type="button" onClick={resetAll}>
                重置
              </Button>
            </div>
          </>
        )}
      </Form>
    )
  },
}
