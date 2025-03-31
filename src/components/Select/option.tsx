import React, { FC, ReactNode, useContext } from 'react'
import { SelectContext } from './select'
import Icon from '../Icon/icon'
import classNames from 'classnames'

export interface SelectOptionProps {
  index?: string
  /** 默认根据此属性值进行筛选，该值不能相同*/
  value: string
  /** 选项的标签，若不设置则默认与 value 相同*/
  label?: string
  /** 是否禁用该选项*/
  disabled?: boolean
  children?: ReactNode
}

export const Option: FC<SelectOptionProps> = ({
  index,
  value,
  label,
  disabled,
  children,
}) => {
  const { onSelect, selectedValues } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const classes = classNames('jcy-select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })
  const handleClick = (e: React.MouseEvent, value: string) => {
    e.preventDefault()
    onSelect && onSelect(e, value)
  }
  return (
    <li key={index} className={classes} onClick={(e) => handleClick(e, value)}>
      {label || children || value}
      {isSelected && (
        <span>
          <Icon icon="check" />
        </span>
      )}
    </li>
  )
}

Option.displayName = 'Option'

export default Option
