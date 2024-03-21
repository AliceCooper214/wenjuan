import { Random as _Random } from 'mockjs'

const Random = _Random

export default [
  {
    url: '/api/test',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
        },
      }
    },
  },
]
