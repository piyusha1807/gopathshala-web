import { GrapesjsReact } from 'grapesjs-react';
import React from 'react';
import 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

const WebEditor = () => {
    return <GrapesjsReact
    id='grapesjs-react'
    plugins={[
      'gjs-preset-webpage',
      'gjs-blocks-basic'
    ]}
  />;
};


export default WebEditor;