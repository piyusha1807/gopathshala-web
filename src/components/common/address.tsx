import { Card, Form, Input, InputNumber, Typography } from 'antd';
import React from 'react';
import SearchSelect from '../SearchSelect';
import "./index.less";

const { Title } = Typography;

export const G_SELECT_COUNTRY = {
  key: 'cou101',
  label: 'India',
};

export const G_SELECT_STATE = {
  key: 'sta4014',
  label: 'Rajasthan',
};

export const Address = ({ addressType, form }) => {

  const resetStateCity = () => {
    
  }

  return (
    <>
      <Form.Item
        name={[`${addressType}`, 'building']}
        label="Flat, House no., Building, Company, Apartment"
      >
        <Input placeholder="" allowClear />
      </Form.Item>

      <Form.Item name={[`${addressType}`, 'street']} label="Area, Colony, Street, Sector, Village">
        <Input placeholder="" allowClear />
      </Form.Item>

      <Form.Item name={[`${addressType}`, 'landmark']} label="Landmark">
        <Input placeholder="E.g. Near AIIMS Flyover, Behind Regal Cinema, etc." allowClear />
      </Form.Item>

      <Form.Item name={[`${addressType}`, 'pincode']} label="Pincode">
        <InputNumber min={4} />
      </Form.Item>

      <Form.Item name={[`${addressType}`, 'country']} label="Country">
        <SearchSelect category="country" placeholder="Select country" onChange={() => resetStateCity()} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues !== currentValues}>
        {({ getFieldValue }) => {
          const country = getFieldValue([`${addressType}`, 'country']);
          const countryKey = country?.key || G_SELECT_COUNTRY.key;
          return (
            <Form.Item name={[`${addressType}`, 'state']} label="State">
              <SearchSelect
                category="state"
                params={{
                  countryId: countryKey,
                }}
                placeholder="Select state"
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues !== currentValues}>
        {({ getFieldValue }) => {
          const state = getFieldValue([`${addressType}`, 'state']);
          const stateKey = state?.key || G_SELECT_STATE.key;
          return (
            <Form.Item name={[`${addressType}`, 'city']} label="City">
              <SearchSelect
                category="city"
                params={{
                  stateId: stateKey,
                }}
                placeholder="Select city"
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </>
  );
};

export const AddressPreviewWrapper = (props: any) => {
  const { permanentAddress, isSameAsPermanentAddress, currentAddress } = props;

  return (
    <>
      {permanentAddress && <AddressPreview title="Permanent address" address={permanentAddress} />}
      {!isSameAsPermanentAddress && currentAddress && <AddressPreview title="Current address" address={currentAddress} />}
    </>
  )
}

export const AddressPreview = (props: any) => {
  const { title, address } = props;

  if(!address) return <></>;

  return (
    <Card className="addressCard" >
      {title && <Title level={5}>{title ?? "Address"}</Title>}
      {address?.building && (
        <>
          {address?.building}{", "}
        </>
      )}
      {address?.street && (
        <>
          {address?.street}{", "}
        </>
      )}
      {address?.landmark && (
        <>
          {address?.landmark}{", "}
        </>
      )}
      {address?.city?.label && (
        <>
          {address?.city?.label}{", "}
        </>
      )}
      {address?.state?.label && (
        <>
          {address?.state?.label}{", "}
        </>
      )}
      {address?.country?.label && (
        <>
          {address?.country?.label}{", "}
        </>
      )}
      {address?.pincode && (
        <>
          {" - "}{address?.pincode}
        </>
      )}
    </Card>
  )
}
