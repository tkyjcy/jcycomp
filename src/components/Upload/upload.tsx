import React, { FC, useRef, useState } from 'react'
import UploadList from './uploadList'
import axios from 'axios'
import Dragger from './dragger'

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[]
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: UploadFile) => void
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void
  /**设置上传的请求头部 */
  headers?: { [key: string]: any }
  /**上传的文件字段名 */
  name?: string
  /**上传时附带的额外参数 */
  data?: { [key: string]: any }
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean
  /**可选参数, 接受上传的文件类型 */
  accept?: string
  /**是否支持多选文件 */
  multiple?: boolean
  /**是否支持拖拽上传 */
  drag?: boolean
  children?: React.ReactNode
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'jcycomp';
 * ~~~
 */
export const Upload: FC<UploadProps> = ({
  action,
  defaultFileList,
  onChange,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onRemove,
  headers,
  name = 'file',
  data,
  withCredentials,
  accept,
  multiple,
  children,
  drag,
}) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((preList) => {
      return preList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    //setFileList([_file, ...fileList])
    setFileList((preList) => {
      return [_file, ...preList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = e.total
            ? Math.round((e.loaded * 100) / e.total) || 0
            : 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, _file)
            }
          }
        },
      })
      .then((res) => {
        updateFileList(_file, { status: 'success', response: res.data })
        if (onSuccess) {
          onSuccess(res.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
      .catch((error) => {
        console.error(error)
        updateFileList(_file, { status: 'error', error })
        if (onError) {
          onError(error, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
  }
  return (
    <div className="jcy-upload-component">
      <div
        className="jcy-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files)
            }}>
            {children}
          </Dragger>
        ) : (
          children
        )}
      </div>
      <input
        className="jcy-file-input"
        data-testid="jcy-file-input"
        style={{ display: 'none' }}
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}
export default Upload
