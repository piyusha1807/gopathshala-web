import { ConnectState } from '@/models/connect';
import React from 'react';
import { connect } from 'umi';

const Certificate = () => {
    return (
        <div>
            Certificate
        </div>
    );
};

export default connect(({ login }: ConnectState) => ({
    login: {
        currentAuthority: 'guest',
    }
  }))(Certificate);