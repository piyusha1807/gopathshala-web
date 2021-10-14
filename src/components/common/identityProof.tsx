import { Form, Input, Select } from 'antd';
import React from 'react';

const { Option } = Select;

const G_INDENTITY_PROOF_TYPE_LIST = [
  'aadharCard',
  'panCard',
  'voterIdCard',
  'drivingLicence',
  'passport',
  'other',
];

const G_IDENTITY_PROOF_TYPE = {
  aadharCard: {
    key: 'aadharCard',
    label: 'Aadhar card',
    pattern: /^\d{4}[ -]?\d{4}[ -]?\d{4}$/,
    errorMessage: 'Please enter 12 digit correct aadhar card number.',
  },
  panCard: {
    key: 'panCard',
    label: 'Pan card',
    pattern: /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/,
    errorMessage: 'Please enter 10 digit correct pan card number.',
  },
  voterIdCard: {
    key: 'voterIdCard',
    label: 'Voter id card',
    pattern: /^([a-zA-Z]){3}([0-9]){7}?$/,
    errorMessage: 'Please enter correct driving licence number.',
  },
  drivingLicence: {
    key: 'drivingLicence',
    label: 'Driving licence',
    pattern: /^[0-9a-zA-Z\/ _-]{4,20}$/,
    errorMessage: 'Please enter correct driving licence number.',
  },
  passport: {
    key: 'passport',
    label: 'Passport',
    pattern: /^(?!^0+$)[a-zA-Z0-9]{3,20}$/,
    errorMessage: 'Please enter 10 digit correct pan card number.',
  },
  other: {
    key: 'other',
    label: 'Other',
    pattern: /(.*?)/,
    errorMessage: 'Please enter correct identity proof number.',
  },
};

export const IdentityProof = ({ form }: any) => {
  return (
    <Input.Group compact>
      <Form.Item name="identityProofType" noStyle>
        <Select
          style={{ minWidth: '120px', width: '40%' }}
          onChange={() => form.setFieldsValue({ identityProofNumber: '' })}
          placeholder={"Select type"}
          allowClear
        >
          {G_INDENTITY_PROOF_TYPE_LIST.map((item, idx) => {
            const proofType = G_IDENTITY_PROOF_TYPE[item];
            return <Option value={proofType.key}>{proofType.label}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="identityProofNumber"
        noStyle
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              const identityProofType = getFieldValue('identityProofType');
              console.log("🚀 ~ file: identityProof.tsx ~ line 77 ~ validator ~ identityProofType", identityProofType)

              if (!identityProofType) return Promise.resolve();

              value = value.toString();

              const pattern = G_IDENTITY_PROOF_TYPE[identityProofType]['pattern'];
              const isValid = pattern.test(value);

              if (!isValid) {
                return Promise.reject(G_IDENTITY_PROOF_TYPE[identityProofType]['errorMessage']);
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input placeholder="Identity proof number" style={{ width: '60%' }} allowClear />
      </Form.Item>
    </Input.Group>
  );
};
