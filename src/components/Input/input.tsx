import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import React, { forwardRef, InputHTMLAttributes } from 'react'
import Icon from '../Icon/icon'
type InputSize = 'lg' | 'sm'
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | React.ReactElement
  /**添加后缀 用于配置一些固定组合 */
  append?: string | React.ReactElement
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'jcycomp'
 * ~~~
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, size, icon, prepend, append, ...restProps }, ref) => {
    const classes = classNames('jcy-input-wrapper', {
      [`input-size-${size}`]: size,
      'input-group': prepend || append,
      'input-group-append': !!append,
      'input-group-prepend': !!prepend,
      'is-disabled': disabled,
    })
    const fixControlledValue = (value: any) => {
      if (typeof value === 'undefined' || value === null) {
        return ''
      }
      return value
    }
    if ('value' in restProps) {
      delete restProps.defaultValue
      restProps.value = fixControlledValue(restProps.value)
    }
    return (
      <div className={classes} data-testid="jcy-input-wrapper">
        {prepend && <div className="-jcy-input-group-prepend">{prepend}</div>}
        {icon && (
          <div className="icon-wrapper">
            <Icon icon={icon} title={`title-${icon}`} />
          </div>
        )}
        <input
          ref={ref}
          className="jcy-input-inner"
          disabled={disabled}
          {...restProps}
        />
        {append && <div className="input-group-append">{append}</div>}
      </div>
    )
  }
)

export default Input
