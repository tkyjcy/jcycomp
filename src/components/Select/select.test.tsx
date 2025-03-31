import { fireEvent, render, screen } from '@testing-library/react'
import Select, { SelectProps } from './select'
import '@testing-library/jest-dom/extend-expect'
import Option from './option'

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

const testProps: SelectProps = {
  defaultValue: '1',
  placeholder: 'test',
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
}

const multipleProps: SelectProps = {
  ...testProps,
  multiple: true,
}

describe('Select component', () => {
  it('should render the correct default Select', () => {
    render(
      <Select {...testProps}>
        <Option value="id1" label="nihao" />
        <Option value="id2" label="nihao2" />
        <Option value="id3" disabled label="disabled" />
      </Select>
    )
    const inputEl = screen.getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(inputEl)
    const optionEl = screen.getByText('nihao')
    const disabledEl = screen.getByText('disabled')
    expect(optionEl).toBeInTheDocument()
    expect(testProps.onVisibleChange).toBeCalledWith(true)
    fireEvent.click(disabledEl)
    expect(disabledEl).toBeInTheDocument()
    fireEvent.click(optionEl)
    expect(testProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    expect(inputEl).toHaveFocus()
  })
  it('Select in multiple mode should works fine', () => {
    render(
      <Select {...multipleProps}>
        <Option value="id1" label="first" />
        <Option value="id2" label="second" />
        <Option value="id3" label="third" />
      </Select>
    )
    const inputEle = screen.getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(inputEle)
    const firstItem = screen.getByText('first')
    const secondItem = screen.getByText('second')

    fireEvent.click(firstItem)
    expect(firstItem).toBeInTheDocument()
    // add selected classname
    expect(firstItem).toHaveClass('is-selected')
    // add check icon
    expect(screen.getByText('check')).toBeInTheDocument()
    // fire events
    expect(multipleProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    // add tags
    expect(screen.getAllByTestId('jcy-tag').length).toEqual(1)
    //remove placeholder
    expect(inputEle.placeholder).toEqual('')
    // click 2nd item
    fireEvent.click(secondItem)
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', [
      'id1',
      'id2',
    ])
    expect(screen.getAllByTestId('jcy-tag').length).toEqual(2)
    //reclick 2nd item
    fireEvent.click(secondItem)
    // remove acitve class
    expect(secondItem).not.toHaveClass('is-selected')
    // remove tags
    expect(screen.getAllByTestId('jcy-tag').length).toEqual(1)
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', ['id1'])
    // click tag close
    fireEvent.click(screen.getByText('times'))
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id1', [])
    //remove all tags
    //expect(screen.getAllByTestId('jcy-tag').length).toEqual(0)
    //refill placeholder text
    expect(inputEle.placeholder).toEqual('test')
  })
})
