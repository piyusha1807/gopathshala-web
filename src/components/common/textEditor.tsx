import React from 'react';
import { Form } from 'antd';
import BraftEditor from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-php';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import styles from './textEditor.less';

const options = {
  defaultColumns: 3, // Default number of columns
  defaultRows: 3, // Default number of rows
  withDropdown: true, // Whether to pop up a drop-down menu before inserting the table
  columnResizable: true, // Whether to allow dragging to adjust the column width, the default is false
  // exportAttrString: '', // Specify the attribute string attached to the table tag when outputting HTML
  // includeEditors: ['editor-id-1'], // Specify which BraftEditor the module is valid for, if this attribute is not passed, it will be valid for all BraftEditors
  // excludeEditors: ['editor-id-2']  // Specify which BraftEditor the module is invalid for
};

const prismOptions = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript',
    },
    {
      name: 'HTML',
      syntax: 'html',
    },
    {
      name: 'CSS',
      syntax: 'css',
    },
    {
      name: 'Java',
      syntax: 'java',
    },
    {
      name: 'PHP',
      syntax: 'php',
    },
  ],
};

BraftEditor.use(Table(options));

BraftEditor.use(CodeHighlighter(prismOptions));

//prettier-ignore
export const TextEditorControls = [
    'undo', 'redo', 'separator',
    'headings', 'font-family', 'font-size', 'letter-spacing', 'line-height',  'separator',
    'bold', 'italic', 'underline', 'text-color', 'strike-through', 'subscript', 'superscript', 'emoji', 'separator',
    'list-ol', 'list-ul', 'text-indent', 'text-align', 'blockquote', 'code', 'separator', 
    'media', 'link', 'table', 'hr', 'separator',
    'remove-styles', 'separator',
    'clear', 'separator',
    'fullscreen',
]

export const ViewInnerHTMLContent = (props: { content: any; }) => {
  const { content } = props;
  let style = { whiteSpace: 'pre-line'}
  return <div style={style} dangerouslySetInnerHTML={{__html: content}} />;
}

export const getTextEditorState = (htmlString: string) => {
  return BraftEditor.createEditorState(htmlString);
};

export const getTextEditorData = (editorState: any) => {
  let values = {
    raw: editorState.toRAW(),
    html: editorState.toHTML(),
    text: editorState.toText(),
  };
  return values;
};

export const TextEditorFormItem = (props: any) => {
  const {
    name = '',
    label = '',
    rules = {},
    form = {},
    contentStyle = {},
    customPlaceholder = 'Enter here..',
  } = props;

  return (
    <Form.Item name={name} label={label} rules={rules} validateTrigger={"onBlur"}>
      <BraftEditor
        language="en"
        className={styles.customEditor}
        contentStyle={contentStyle}
        placeholder={customPlaceholder}
        controls={TextEditorControls}
      />
    </Form.Item>
  );
};
