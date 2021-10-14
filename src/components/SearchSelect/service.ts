import request from '@/utils/request';

export async function getSelectData(category: string, params: any) {
  return request(`/server/api/utils/select/searchSelect`, {
      method: 'GET',
      params: { category, params: JSON.stringify(params)}
  });
}