import React, { ChangeEvent, FC, useState } from 'react'
import { Button, Input, Space, Typography, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

const { Title } = Typography

const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editState, setEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}

const EditorHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditorHeader
