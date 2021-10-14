import request from '@/utils/request';

export async function getCourses() {
  return request('/server/api/courses');
}

export async function getCourseById(_id: string) {
  return request(`/server/api/courses/${_id}`);
}

export type addCourseParamsType = {};

export async function addCourse(params: addCourseParamsType) {
  return request('/server/api/courses/add', {
    method: 'POST',
    data: params,
  });
}

export async function getStaffSelectData() {
  return request('/server/api/courses/selectData/staff');
}