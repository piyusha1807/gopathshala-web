import request from '@/utils/request';

export type EmailVerificationParamsType = {
  verificationCode: string;
  email: string;
};

export async function verifyAccount(params: EmailVerificationParamsType) {
  return request('/server/api/verify', {
    method: 'POST',
    data: params,
  });
}

export type resendVerificationCodeParamsType = {
  email: string;
};

export async function resendVerificationCode(params: resendVerificationCodeParamsType) {
  return request('/server/api/verify/resend', {
    method: 'POST',
    data: params,
  });
}