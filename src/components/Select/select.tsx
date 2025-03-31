import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import Input from '../Input/input'
import { SelectOptionProps } from './option'
import Transition from '../Transition/transition'
import useClickOutside from '../../hooks/useClickOutSide'
import classNames from 'classnames'
import Icon from '../Icon/icon'

export interface SelectProps {
  /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
  defaultValue?: string | string[]
  /** 选择框默认文字*/
  placeholder?: string
  /** 是否禁用*/
  disabled?: boolean
  /** 是否支持多选*/
  multiple?: boolean
  /** select input 的 name 属性	 */
  name?: string
  /**选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
  /**下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}

export interface ISelectContext {
  selectedValues: string[]
  onSelect?: (e: React.MouseEvent, value: string) => void
}

export const SelectContext = React.createContext<ISelectContext>({
  selectedValues: [],
})

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'jcycomp'
 * // 然后可以使用 <Select> 和 <Option>
 * ~~~
 */
export const Select: FC<SelectProps> = ({
  defaultValue,
  placeholder = '请选择',
  disabled,
  name = 'jcy-select',
  onChange,
  children,
  multiple,
  onVisibleChange,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const containerWidth = useRef<number>(0)
  const containerClass = classNames('jcy-select', {
    'menu-is-open': menuOpen,
    'is-disabled': disabled,
    'is-multiple': multiple,
  })
  const renderOption = () => {
    return React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<SelectOptionProps>
      if (childElement.type.displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: `select-${i}`,
        })
      } else {
        console.error(
          'Warning: Select has a child which is not a Option component'
        )
      }
    })
  }
  const handleOptionClick = (e: React.MouseEvent, optionValue: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (!multiple) {
      setMenuOpen(!menuOpen)
      setValue(optionValue)
    }
    let updatedValue = [optionValue]
    if (multiple) {
      setValue('')
      if (selectedValues.includes(optionValue)) {
        updatedValue = selectedValues.filter((value) => value !== optionValue)
        setSelectedValues(updatedValue)
      } else {
        updatedValue = [...selectedValues, optionValue]
        setSelectedValues(updatedValue)
      }
    }

    if (onChange) {
      onChange(optionValue, updatedValue)
    }
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setMenuOpen(!menuOpen)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }
  }
  const passContext: ISelectContext = {
    selectedValues,
    onSelect: handleOptionClick,
  }
  useClickOutside(containerRef, () => {
    setMenuOpen(false)
  })
  useEffect(() => {
    // focus input
    if (input.current) {
      input.current.focus()
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = ''
      } else {
        if (placeholder) input.current.placeholder = placeholder
      }
    }
  }, [selectedValues, multiple, placeholder])
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width
    }
  })
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="jcy-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          icon="angle-down"
          readOnly
          value={value}
        />
      </div>
      <SelectContext.Provider value={passContext}>
        <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
          <ul className="jcy-select-dropdown">{renderOption()}</ul>
        </Transition>
      </SelectContext.Provider>
      <div
        className="jcy-selected-tags"
        style={{ maxWidth: containerWidth.current - 32 }}>
        {multiple &&
          selectedValues.map((value, index) => {
            return (
              <span
                data-testid="jcy-tag"
                className="jcy-tag"
                key={`tag-${index}`}
                onClick={(e) => handleOptionClick(e, value)}>
                {value}
                <Icon icon="times" />
              </span>
            )
          })}
      </div>
    </div>
  )
}

export default Select
