import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import { useTitle } from 'ahooks'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3-25',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3-25',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3-25',
  },
  { _id: 'q4', title: '问卷4', isPublished: true, isStar: true, answerCount: 6, createdAt: '3-11' },
]

const List: FC = () => {
  useTitle('答辩问卷 - 我的问卷')

  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}> (搜素) </div>
      </div>
      <div>
        {questionList.map(item => (
          <QuestionCard {...item} key={item._id} />
        ))}
      </div>
      <div className={styles.footer}>loadMore... 上划加载更多...</div>
    </>
  )
}

export default List
