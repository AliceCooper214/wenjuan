import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Divider, Space } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => {
              alert('')
            }}
            disabled={false}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
        </Space>
        <Button
          type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
          size="large"
          icon={<StarOutlined />}
          onClick={() => nav('/manage/star')}
        >
          星标问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
          size="large"
          icon={<DeleteOutlined />}
          onClick={() => nav('/manage/trash')}
        >
          回收站
        </Button>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
