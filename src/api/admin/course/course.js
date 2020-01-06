import request from '@/utils/request'

export function courseSystemlistajax() {
  return request({
    url: 'api/courseSystem/listajax',
    method: 'get'
  })
}

export function findCourseBySystemId(params) {
  return request({
    url: 'api/courseSystem/findCourseBySystemId',
    method: 'get',
    params: params
  })
}

export function listajaxSpecialty(collegeId) {
  return request({
    url: 'api/specialty/listajax',
    method: 'get',
    params: {
      'status': '1',
      'collegeId': collegeId
    }
  })
}

export function listajaxTeam() {
  return request({
    url: 'api/team/pageQuery',
    method: 'get',
  })
}

export function listajaxWeek() {
  return request({
    url: 'api/week/pageQuery',
    method: 'get',
  })
}

export function listajaxSection() {
  return request({
    url: 'api/section/pageQuery',
    method: 'get',
  })
}

export function listajaxNature() {
  return request({
    url: 'api/nature/pageQuery',
    method: 'get',
  })
}
export function listajaxTeacher() {
  return request({
    url: 'api/teacher/listajax',
    method: 'get',
  })
}

export function listajaxCStatus() {
  return request({
    url: 'api/cstatus/pageQuery',
    method: 'get',
  })
}

export function listajaxWay() {
  return request({
    url: 'api/examway/pageQuery',
    method: 'get',
  })
}

export function listajaxCollege() {
  return request({
    url: 'api/college/listajax',
    method: 'get'
  })
}

export function addPlanCourse(data) {
  return request({
    url: 'api/planCourse',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/course/add',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/plan',
    method: 'delete',
    params: {
      roleId: id
    }
  })
}

export function delPlanCourse(id) {
  return request({
    url: 'api/planCourse',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function edit(data) {
  return request({
    url: 'api/plan',
    method: 'put',
    data
  })
}

export function saveMenu(data) {
  return request({
    url: 'api/role/saveMenu',
    method: 'post',
    data
  })
}
