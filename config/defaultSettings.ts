import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  "navTheme": "light",
  "primaryColor": "#1890ff",
  "layout": "side",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": true,
  "title": "Go Pathshala",
  "pwa": false,
  "iconfontUrl": "",
  "menu": {
    "locale": false
  },
  "headerHeight": 48
};

export type { DefaultSettings };

export default proSettings;