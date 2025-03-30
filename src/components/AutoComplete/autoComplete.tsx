/* eslint-disable jsx-a11y/aria-role */
import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useRef,
} from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutSide'
interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 返回若干输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => React.ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = ({
  value,
  fetchSuggestions,
  onSelect,
  renderOption,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debounceValue = useDebounce(inputValue, 500)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      setHighlightIndex(-1)
      if (results instanceof Promise) {
        console.log('triggered')
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul className="jcy-suggestion-list">
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex,
          })
          return (
            <li
              role="suggestion-item"
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="jcy-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && (
        <ul>
          <Icon icon="spinner" />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
