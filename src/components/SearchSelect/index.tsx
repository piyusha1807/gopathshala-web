import { notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import Emoji from '../common/emoji';

import { getSelectData } from './service';

const { Option } = Select;

const SearchSelect = (props: any) => {
  const { category, params, value, onChange, ...rest } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    getData(category, params);
  }, [category, JSON.stringify(params)]);

  const getData = async (category: any, params: any) => {
    const { status, class: className, message, payload } = await getSelectData(category, params);

    if (!status) {
      notification[className]({
        message: message,
      });
    }

    setData(payload);
  };

  const getOptions = (list: any[]) => {
    // const { acceptAllValue = false, labelInValue = true } = rest;

    let selectedOptions: string | any[] = [];
    if (params?.selectedOptions) {
      selectedOptions = params.selectedOptions;
    }

    if (!list || list.length <= 0) return null;

    const filterdOptions = list.filter((o) => !selectedOptions.includes(o.key));

    return (
      filterdOptions &&
      filterdOptions.map((item) => {
        if (!(item['key'] && item['label'])) return;

        let extra = {
          key: item['key'],
          label: item['label'],
        };

        // if (category == 'phoneCode') {
        //   return (
        //     <Option {...extra}>
        //       <div style={{ marginRight: '6px' }}>
        //         {/* <span role="img" aria-label="China"> */}
        //           {/* {item['symbol']} */}
        //           {/* String.fromCodePoint('0x1F60A') */}
        //           <Emoji symbol={} />
        //         {/* </span> */}
        //         {item['label']}
        //       </div>
        //     </Option>
        //   );
        // }

        // if (acceptAllValue) {
        //   extra['value'] = JSON.stringify(item);
        // }
        // else if(!labelInValue){

        // }

        return <Option {...extra}>{item['label']}</Option>;
      })
    );
  };

  const selectProps = {
    style: {
      minWidth: '200px',
      width: '100%',
    },
    placeholder: 'Select',
    labelInValue: true,
    value: value || [],
    showSearch: true,
    allowClear: true,
    ...rest,
    onChange: (value) => {
      if (onChange) onChange(value);
    },
    filterOption: (input, option) => {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
  };

  return <Select {...selectProps}>{getOptions(data)}</Select>;
};

export default SearchSelect;
