import React, { FC, useState } from 'react'
import styles from './List.module.scss'
import QuestionCard from '../../components/QuestionCard'

const rawQuestionList = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3-25',
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3-25',
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3-25',
  },
  { id: 'q4', title: '问卷4', isPublished: true, isStar: true, answerCount: 6, createdAt: '3-11' },
]

const List: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>(搜素)</div>
      </div>
      <div>
        {questionList.map(item => (
          <QuestionCard {...item} key={item.id} />
        ))}
      </div>
      <div>footer</div>
    </>
  )
}

export default List
