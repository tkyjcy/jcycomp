//测试用例文件
import { fireEvent, render, screen } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps: ButtonProps = {
  onClick: jest.fn(), //jest.fn()是jest提供的mock函数,其是否被调用可以被监控
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
}

const linkProps: ButtonProps = {
  btnType: 'link',
  href: 'http://dummyurl',
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}
describe('test Button component', () => {
  //it等价于test
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON') //测试DOM元素的标签名是否为button
    expect(element).toHaveClass('btn btn-default')
    expect((element as HTMLButtonElement).disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled() //模拟用户点击之后，看onClick函数是否被调用
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button {...linkProps}>Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
