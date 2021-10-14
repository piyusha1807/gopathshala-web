import request from '@/utils/request';

export type SurveyParamsType = {
  userName: string;
  password: string;
  remember: string;
  redirectUrl: string;
};

export async function sentSurvey(params: SurveyParamsType) {
  return request('/server/api/login', {
    method: 'POST',
    data: params,
  });
}