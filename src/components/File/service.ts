import request from '@/utils/request';

export async function getPostSignedUrl(data) {
  return request('/server/api/file/postUrl', {
    method: 'POST',
    data: data,
  });
}

export async function getPreSignedUrl(data) {
  return request('/server/api/file/getUrl', {
    method: 'POST',
    data: data,
  });
}