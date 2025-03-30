import React, { ReactNode, useState } from 'react'
import { FC } from 'react'
import { TabItemProps } from './tabItem'
import classNames from 'classnames'

export interface TabsProps {
  /**当前激活 tab 面板的 index，默认为0 */
  defaultIndex?: number
  /**可以扩展的 className */
  className?: string
  /**点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void
  /**Tabs的样式，两种可选，默认为 line */
  type?: 'line' | 'card'
  children?: ReactNode
}

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'jcycomp';
 * ~~~
 */

export const Tabs: FC<TabsProps> = ({
  defaultIndex = 0,
  className,
  onSelect,
  type = 'line',
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const handleClick = (
    e: React.MouseEvent,
    disabled: boolean | undefined,
    index: number
  ) => {
    if (!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }
  const navClasses = classNames('jcy-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  })
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { label, disabled } = childElement.props
      const classes = classNames('jcy-tabs-nav-item', {
        'is-active': activeIndex === index,
        'is-disabled': disabled,
      })
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => handleClick(e, disabled, index)}>
          {label}
        </li>
      )
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }
  return (
    <div className={`jcy-tabs ${className}`}>
      <ul className={navClasses} data-testid="jcy-tabs-nav">
        {renderNavLinks()}
      </ul>
      <div className="jcy-tabs-content">{renderContent()}</div>
    </div>
  )
}

export default Tabs
