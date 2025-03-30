import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>
  return (
    <>name: {itemWithNumber.value}</>
  )
}
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption
}

let inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<AutoComplete {...testProps}/>)
    inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AotoComplete behavior', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() =>{
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    expect(screen.getAllByRole('suggestion-item').length).toEqual(2)
    fireEvent.click(screen.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() =>{
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    const firstResult = screen.getByText('ab')
    const secondResult = screen.getByText('abc')

    fireEvent.keyDown(inputNode, {key: 'ArrowDown'})
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {key: 'ArrowDown'})
    expect(secondResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {key: 'ArrowUp'})
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {key: 'Enter'})
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await waitFor(() =>{
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })                       
  it('renderOption should generate the right template', async () => {
    render(<AutoComplete {...testPropsWithCustomRender}/>)
    const inputNode = screen.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.getByText('name: ab')).toBeInTheDocument()
    })
  })
  it('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: AutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn((query) => { return Promise.resolve(testArray.filter(item => item.value.includes(query))) }),
      placeholder: 'auto-complete-3',
    }
    render(<AutoComplete {...testPropsWithPromise}/>)
    const inputNode = screen.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
    })
    //expect(screen.getByText('ab')).toBeInTheDocument()
  })
})