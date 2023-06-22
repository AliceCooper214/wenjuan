import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input, Space, message } from 'antd'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import styles from './Layers.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked,
} from '../../../store/componentsReducer'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  const [changingTitleId, setChangingTitleId] = useState('')

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选择隐藏组件')
      return
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }

    setChangingTitleId(fe_id)
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changingTitleId && (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                />
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ''}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
