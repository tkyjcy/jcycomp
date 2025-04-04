import { FunctionComponentElement, useContext, useState } from 'react'
import { MenuContext } from './menu'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import React from 'react'
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children?: React.ReactNode
}

function SubMenu({ index, title, className, children }: SubMenuProps) {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus?.includes(index)
      : false
  const [menuOpen, setMenuOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer: NodeJS.Timeout
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {}
  const renderChildren = () => {
    //渲染下拉菜单
    const subMenuClasses = classNames('jcy-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component'
        )
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
