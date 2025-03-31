import classNames from 'classnames'
import { FC, useContext, useEffect } from 'react'
import { FormContext } from './form'
import { CustomRule } from './useStore'
import React from 'react'
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>
export interface FormItemProps {
  name: string
  label?: string
  children?: React.ReactNode
  valuePropName?: string
  trigger?: string
  getValueFromEvent?: (event: any) => any
  rules?: CustomRule[]
  validateTrigger?: string
}

const FormItem: FC<FormItemProps> = ({
  name,
  label,
  children,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFromEvent = (e) => e.target.value,
  rules,

  validateTrigger = 'onBlur',
}) => {
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext)
  const rowClass = classNames('jcy-row', {
    'jcy-row-no-label': !label,
  })
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({
      type: 'addField',
      name,
      value: {
        label,
        name,
        value,
        rules: rules || [],
        errors: [],
        isValid: true,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some(
    (rule) => typeof rule !== 'function' && rule.required
  )
  const hasError = errors && errors.length > 0
  const labelClass = classNames({
    'jcy-form-item-required': isRequired,
  })
  const itemClass = classNames('jcy-form-item-control', {
    'jcy-form-item-has-error': hasError,
  })
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    dispatch({ type: 'updateValue', name, value })
  }
  const onValueValidate = async () => {
    await validateField(name)
  }
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
  const childList = React.Children.toArray(children)
  // 没有子组件
  if (childList.length === 0) {
    console.error(
      'No child element found in Form.Item, please provide one form component'
    )
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      'Only support one child element in Form.Item, others will be omitted'
    )
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
  }
  const child = childList[0] as React.ReactElement
  // 3 cloneElement，混合这个child 以及 手动的属性列表

  const returnChildNode = React.cloneElement(child, {
    ...(child.props || {}),
    ...controlProps,
  })
  return (
    <div className={rowClass}>
      {label && (
        <div className="jcy-form-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="jcy-form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="jcy-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormItem
