import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Empty, Spin, Typography } from 'antd'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import { getQuestionListService } from '../../services/question'

const { Title } = Typography

const List: FC = () => {
  useTitle('答辩问卷 - 我的问卷')

  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })

      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
      }
    },
    {
      wait: 100,
    }
  )

  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    window.addEventListener('scroll', tryLoadMore)

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.conttent}>
        {list.length > 0 && list.map((item: any) => <QuestionCard {...item} key={item._id} />)}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
