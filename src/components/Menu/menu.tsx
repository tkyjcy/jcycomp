import classNames from 'classnames'
import React, { useState } from 'react'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string
  /**自定义类名 */
  className?: string
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode
  /**自定义样式 */
  style?: React.CSSProperties
  /**点击菜单项触发的回调函数 */
  onSelect?: (selectedIndex: string) => void
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[]
  children?: React.ReactNode
}
interface IMenuContext {
  index: string //当前选中的菜单项的索引
  onSelect?: SelectCallback
  mode?: string
  defaultOpenSubMenus?: string[]
}
export const MenuContext = React.createContext<IMenuContext>({ index: '0' })
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ```javascript
 * import { Menu } from 'jcycomp'
 *
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
export function Menu({
  className,
  mode = 'horizontal',
  style,
  children,
  defaultIndex = '0',
  defaultOpenSubMenus = [],
  onSelect,
}: MenuProps) {
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = classNames('jcy-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  } //点击事件
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  } // 传递给子组件的context
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        console.error(
          'warning: Menu has a child which is not a MenuItem component'
        )
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
export default Menu
