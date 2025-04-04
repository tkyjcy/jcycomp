import React, { FC } from 'react'
import Icon from '../Icon/icon'
import { UploadFile } from './upload'
import Progress from '../Progress/progress'

interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}

export const UploadList: FC<UploadListProps> = ({ fileList, onRemove }) => {
  return (
    <ul className="jcy-upload-list">
      {fileList.map((item) => {
        return (
          <li className="jcy-upload-list-item" key={item.uid}>
            <span
              data-testid={`file-name-${item.status}`}
              className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === 'success' && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === 'error' && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-action">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item)
                }}
              />
            </span>
            {item.status === 'uploading' && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
