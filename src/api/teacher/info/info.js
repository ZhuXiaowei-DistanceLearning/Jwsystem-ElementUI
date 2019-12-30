import request from '@/utils/request'

export function findInfo() {
  return request({
    url: 'api/teacher/findInfo',
    method: 'get'
  })
}

export default { findInfo}
