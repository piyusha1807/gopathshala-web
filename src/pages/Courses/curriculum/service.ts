import request from '@/utils/request';

export async function getSections(courseId: string) {
  return request(`/server/api/courses/${courseId}/sections`);
}

export type addSectionParamsType = {};

export async function addSection(params: addSectionParamsType, courseId: string) {
  return request(`/server/api/courses/${courseId}/sections/add`, {
    method: 'POST',
    data: params,
  });
}

export type saveSectionListIndexParamsType = {};

export async function saveSectionListIndex(params: saveSectionListIndexParamsType, courseId: string) {
  return request(`/server/api/courses/${courseId}/sections`, {
    method: 'POST',
    data: params,
  });
}

export async function addLecture(params: addSectionParamsType, courseId: string, sectionId: string) {
    console.log("🚀 ~ file: service.ts ~ line 11 ~ addSection ~ sectionId", sectionId)
    return request(`/server/api/courses/${courseId}/sections/${sectionId}/add`, {
      method: 'POST',
      data: params,
    });
  }
