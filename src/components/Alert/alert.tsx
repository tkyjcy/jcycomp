/* eslint-disable jsx-a11y/aria-role */
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
export type AlertType = 'success' | 'default' | 'danger' | 'warning'
export interface AlertProps {
  /**标题 */
  title: string
  /**描述 */
  description?: string
  /**类型 四种可选 针对四种不同的场景 */
  type?: AlertType
  /**关闭alert时触发的事件 */
  onClose?: () => void
  /**是否显示关闭图标*/
  closable?: boolean
}

/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'jcycomp';
 * ~~~
 */

export const Alert: FC<AlertProps> = ({
  title,
  description,
  type = 'default',
  onClose,
  closable = true,
}) => {
  const [hide, setHide] = useState(false)
  const cnames = classNames('jcy-alert', {
    [`jcy-alert-${type}`]: type,
  })
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top" unmountOnExit>
      <div className={cnames} data-testid="jcy-alert">
        <span className="bold-title">{title}</span>
        {description && <p className="jcy-alert-desc">{description}</p>}
        {closable && (
          <span className="jcy-alert-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  )
}

export default Alert
