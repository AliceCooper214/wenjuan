import React, { FC } from 'react'
import { QuestionCheckboxStatPropsType } from './interface'

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat = [] }) => {
  return <div style={{ width: '300px', height: '400px' }}></div>
}

export default StatComponent
