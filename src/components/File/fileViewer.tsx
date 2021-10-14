import React, { useState } from 'react';
import { Button, Card, Col, Drawer, Row, Space, Spin, Tooltip, Typography } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { CustomDrawerWidth } from '../common';

import './index.less';
import {
  CloudDownloadOutlined,
  MinusOutlined,
  PlusOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
} from '@ant-design/icons';
import { SizeMe } from 'react-sizeme';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const { Text, Title } = Typography;


// const data = {
//   "url": "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
//   "title": "sample1.pdf"
// }

export const PdfViewer = (props) => {
  const { data } = props;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  return (
    <Card
      // style={{ padding: 0 }}
      className="customCard"
      bordered={false}
      title={data?.title}
      bodyStyle={{ padding: '1em', backgroundColor: '#f0f2f5' }}
      // headStyle={{position: fixed}}
      size="small"
      extra={
        <>
          <Row gutter={10}>
            <Col>
              <Tooltip title="Rotate">
                <Button
                  shape="round"
                  icon={<RotateRightOutlined />}
                  onClick={(e) => setRotate(rotate + 90)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Download">
                <a href={data?.url} target="_blank" download>
                  <Button shape="round" icon={<CloudDownloadOutlined />}></Button>
                </a>
              </Tooltip>
            </Col>
          </Row>
        </>
      }
    >
      <div className="pdfHoverButtons">
        <Tooltip title="Zoom out">
          <Button shape="circle" icon={<MinusOutlined />} onClick={(e) => setScale(scale - 0.2)} />
        </Tooltip>
        <Tooltip title="Zoom in">
          <Button shape="circle" icon={<PlusOutlined />} onClick={(e) => setScale(scale + 0.2)} />
        </Tooltip>
      </div>
      <SizeMe>
        {({ size }) => (
          <Document
            file={data?.url}
            rotate={rotate}
            loading={<Spin />}
            renderMode="canvas"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {numPages &&
              Array.from(Array(numPages), (item, idx) => {
                return (
                  <div key={idx}>
                    <Page
                      pageNumber={idx + 1}
                      scale={scale}
                      loading={''}
                      width={size.width ? size.width : 1}
                    />
                  </div>
                );
              })}
          </Document>
        )}
      </SizeMe>
    </Card>
  );
};

export const PdfViewerInDrawer = (props) => {
  const { data } = props;

  const [visible, setVisible] = useState(true);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      // title={data?.title}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      keyboard={true}
      width={CustomDrawerWidth}
      bodyStyle={{ padding: 0 }}
      // headerStyle={{ boxShadow: '0 1px 4px 0 #0015291f', zIndex: 1 }}
    >
      <PdfViewer data={data} />
    </Drawer>
  );
};
