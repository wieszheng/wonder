import React from 'react';
import "ace-builds";
import AceEditor from "react-ace";
// import jsonWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-json";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-spellcheck";
import './MaterialOneDark'; // pg模式包
import "ace-builds/src-noconflict/mode-json"


const AceEditorJson: React.FC<any> = ({value, onChange, height, readOnly, theme}) => {

  return (
    <AceEditor
      mode='json'
      theme={theme || 'material-one-dark'}
      fontSize={14}
      showGutter
      showPrintMargin={false}
      onChange={onChange}
      value={value}
      wrapEnabled
      highlightActiveLine
      enableSnippets
      style={{width: '100%', height: height || 300}}
      setOptions={{
        readOnly: readOnly || false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
        // useWorker: useWorker === undefined ? useWorker: true,
        useWorker: true,
      }}
    />
    // <AceEditor
    //   mode="json"
    //   theme="monokai"
    //   value={value}
    //   onChange={onEditorChange}
    //   name="UNIQUE_ID_OF_DIV"
    //   editorProps={{ $blockScrolling: true }}
    //   fontSize={14}
    //   showPrintMargin={true}
    //   showGutter={true}
    //   highlightActiveLine={true}
    //   setOptions={{
    //     enableBasicAutocompletion: true,
    //     enableLiveAutocompletion: true,
    //     enableSnippets: true,
    //     showLineNumbers: true,
    //     tabSize: 2,
    //   }}/>
  );
};

export default AceEditorJson;
