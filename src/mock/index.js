import Mock from 'mockjs'
import test from './test'
import question from './question'
import user from './user'
import stat from './stat'
import answer from './answer'

const mockList = [...test, ...question, ...user, ...stat, ...answer]

for (const i of mockList) {
  Mock.mock(i.url, i.type, i.response)
}

export default function (middlewares, devServer) {
  Object.keys(mockList).forEach(v => {
    mockList[v](devServer)
  })

  return middlewares
}
