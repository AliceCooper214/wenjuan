import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'
import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { changeSelectedId } from '../../../store/componentsReducer'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { loading } = useLoadQuestionData()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  const { title } = useGetPageInfo()
  useTitle(`问卷编辑 - ${title}`)

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
