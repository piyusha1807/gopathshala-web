import { ConnectState } from '@/models/connect';
import React from 'react';
import { connect } from 'umi';

const Pricing = () => {
    return (
        <div>
            Pricing
        </div>
    );
};

export default connect(({ login }: ConnectState) => ({
    login: {
        currentAuthority: 'guest',
    }
  }))(Pricing);