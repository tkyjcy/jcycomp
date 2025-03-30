import React from 'react'
import classNames from 'classnames'
import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
export type ButtonSize = 'lg' | 'sm' // 按钮尺寸
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' // 按钮类型

/** Button 的基础属性 */
export interface BaseButtonProps {
  /** 自定义类名 */
  className?: string
  /** 是否禁用按钮 */
  disabled?: boolean
  /** 按钮的尺寸 */
  size?: ButtonSize
  /** 按钮的类型 */
  btnType?: ButtonType
  /** 按钮的内容 */
  children: React.ReactNode
  /** 链接类型按钮的跳转地址 */
  href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 *
 * ## 引用方法
 * ```javascript
 * import { Button } from 'jcycomp';
 * ```
 */
export const Button: FC<ButtonProps> = ({
  btnType = 'default',
  disabled = false,
  className,
  size,
  children,
  href,
  ...restProps
}) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

export default Button
