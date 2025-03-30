import classNames from 'classnames'
import React, { FC, useState } from 'react'

interface DraggerProps {
  onFile?: (files: FileList) => void
  children: React.ReactNode
}

export const Dragger: FC<DraggerProps> = ({ onFile, children }) => {
  const [dragOver, setDragOver] = useState(false)
  const klass = classNames('jcy-uploader-dragger', {
    'is-dragover': dragOver,
  })
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile && onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true)
      }}
      onDragLeave={(e) => {
        handleDrag(e, false)
      }}
      onDrop={handleDrop}>
      {children}
    </div>
  )
}

export default Dragger
