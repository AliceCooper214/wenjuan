import React, { FC } from 'react'
import { QuestionRadioStatPropsType } from './interface'

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  return <div style={{ width: '300px', height: '400px' }}></div>
}

export default StatComponent
