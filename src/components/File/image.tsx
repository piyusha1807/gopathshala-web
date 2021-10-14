import React, { useEffect, useState } from 'react';
import { Upload, message, Modal, notification } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getPostSignedUrl, getPreSignedUrl } from './service';

import 'antd/es/modal/style';
import 'antd/es/slider/style';
import 'antd/dist/antd.css';
import './index.less';

export const ImageUpload = (props) => {
  const { fileCategory, customClassName, onChange, value } = props;

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    if (value) {
      getUrl(value);
    }
  }, [value]);

  const getUrl = async (value: any) => {
    if (!value?.isCfUrl) {
      let { status, class: className, message, payload } = await getPreSignedUrl({
        _id: value?.url,
      });
      if (!status) {
        notification[className]({
          message: message,
        });
        return;
      }
      setFileList([payload]);
      setPreviewImage(payload?.url);
      setPreviewTitle(payload?.label);
    } else {
      setFileList([value]);
      setPreviewImage(value?.url);
      setPreviewTitle(value?.label);
    }
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleCancel = () => setPreviewVisible(false);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const data = {
      fileName: file.name,
      fileType: file.type,
      fileCategory: fileCategory,
    };
    const { status, class: className, message, payload } = await getPostSignedUrl(data);

    if (!status) {
      onError({ message });
      return;
    }

    const { url, fields, fileData } = payload;

    const formData = new FormData();
    const config = {
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    const fmData = {
      ...fields,
      file: file,
    };

    for (const name in fmData) {
      formData.append(name, fmData[name]);
    }

    try {
      setLoading(true);
      const res = await axios.post(url, formData, config);
      setLoading(false);
      onSuccess('Ok');
      onChange({
        url: fileData?.url,
        label: fileData?.label,
        isCfUrl: fileData?.isCfUrl,
      });
    } catch (err) {
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="container">
      <ImgCrop rotate grid>
        <Upload
          accept="image/*"
          listType="picture-card"
          className={customClassName}
          fileList={[...fileList]}
          beforeUpload={beforeUpload}
          customRequest={uploadImage}
          onChange={handleOnChange}
          onPreview={handlePreview}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </ImgCrop>

      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};
