import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Input, InputProps } from './input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
}
describe('test Input component', () => {
  it('should render the correct default Input', () => {
    render(<Input {...defaultProps} />)
    const testNode = screen.getByPlaceholderText(
      'test-input'
    ) as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('jcy-input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('should render the disabled Input on disabled property', () => {
    render(<Input disabled placeholder="disabled" />)
    const testNode = screen.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('should render different input sizes based on the size property', () => {
    render(<Input placeholder="sizes" size="lg" />)

    // 通过 data-testid 获取元素
    const testContainer = screen.getByTestId('jcy-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })

  it('should render prepend and append elements on prepend/append property', () => {
    render(<Input placeholder="pend" prepend="https://" append=".com" />)

    // 获取容器元素
    const testContainer = screen.getByTestId('jcy-input-wrapper')
    expect(testContainer).toHaveClass(
      'input-group',
      'input-group-append',
      'input-group-prepend'
    )

    // 检查 prepend 和 append 元素
    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })
})
