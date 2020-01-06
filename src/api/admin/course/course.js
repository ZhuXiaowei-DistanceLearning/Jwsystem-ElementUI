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
    params:params
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

export function listajaxTeam(collegeId) {
  return request({
    url: 'api/team/pageQuery',
    method: 'get',
  })
}

export function listajax(specialtyId) {
  return request({
    url: 'api/plan/listajax',
    method: 'get',
    params: {
      "specialtyId": specialtyId
    }
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
    url: 'api/plan',
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

export default {add, edit, del, saveMenu, listajaxSpecialty, listajaxTeam}
