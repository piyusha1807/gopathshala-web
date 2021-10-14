// import { PageLoading } from '@ant-design/pro-layout';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// export default PageLoading;

// import react from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const PageLoading = () => (
    <div style={{textAlign: 'center', paddingTop: '100px'}}>
        <Spin indicator={antIcon} />
    </div>
);

export default PageLoading;