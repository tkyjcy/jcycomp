import { fireEvent, render, screen } from '@testing-library/react'
import Alert, { AlertProps } from './alert'

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})

const TestProps: AlertProps = {
  title: 'title',
  onClose: jest.fn(),
}

const typeProps: AlertProps = {
  ...TestProps,
  type: 'success',
  description: 'hello',
  closable: false,
}

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    render(<Alert {...TestProps} />)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByTestId('jcy-alert')).toHaveClass('jcy-alert-default')
    fireEvent.click(screen.getByText('times'))
    expect(TestProps.onClose).toHaveBeenCalled()
    //expect(screen.queryByText('title')).not.toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    render(<Alert {...typeProps} />)
    expect(screen.queryByText('title')).toHaveClass('bold-title')
    expect(screen.getByTestId('jcy-alert')).toHaveClass('jcy-alert-success')
    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.queryByText('times')).not.toBeInTheDocument()
  })
})
