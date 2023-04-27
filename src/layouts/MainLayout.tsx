import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout header</div>
      <Outlet />
      <div>MainLayout footer</div>
    </>
  )
}

export default MainLayout
