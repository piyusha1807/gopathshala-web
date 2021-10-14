import request from '@/utils/request';

export type GetVerificationCodeParamsType = {
  email: string;
};

export async function getVerificationCode(params: GetVerificationCodeParamsType) {
  return request('/server/api/verify/forgot', {
    method: 'POST',
    data: params,
  });
}