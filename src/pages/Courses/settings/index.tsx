import { ConnectState } from '@/models/connect';
import React from 'react';
import { connect } from 'umi';

const Settings = () => {
    return (
        <div>
            Settings
        </div>
    );
};

export default connect(({ login }: ConnectState) => ({
    login: {
        currentAuthority: 'guest',
    }
  }))(Settings);