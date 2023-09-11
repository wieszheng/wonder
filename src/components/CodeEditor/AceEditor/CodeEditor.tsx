import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor: React.FC<any> = ({language, value,setValue, height, theme}) => {
  const handleEditorChange = (data: any) => {
    setValue(data);
  };

  return (
    <Editor
      height={height || '20vh'}
      // options={options}
      defaultLanguage={language || 'json'}
      // language={language || 'json'}
      theme={theme || 'light'}
      value={value}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;


// import React, {useEffect, useRef} from 'react';
// import "ace-builds";
// import AceEditor from "react-ace";
// // import jsonWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-json";
// import "ace-builds/src-noconflict/ext-language_tools";
// import "ace-builds/src-noconflict/ext-spellcheck";
// import './MaterialOneDark'; // pg模式包
// import "ace-builds/src-noconflict/mode-json"
// import { addCompleter } from 'ace-builds/src-noconflict/ext-language_tools';
//
// const AceEditorJson: React.FC<any> = ({ value, onChange, height, readOnly, theme, tables }) => {
//   const editorRef = useRef<AceEditor>(null);
//
//   useEffect(() => {
//     if (editorRef.current) {
//       addCompleter({
//         getCompletions: (editor, session, pos, prefix, callback) => {
//           callback(null, (tables || []).map(v => ({ name: v, value: v })));
//         }
//       });
//     }
//   }, [tables]);
//
//   const options = {
//     readOnly: readOnly || false,
//     enableBasicAutocompletion: true,
//     enableLiveAutocompletion: true,
//     enableSnippets: true,
//     showLineNumbers: true,
//     tabSize: 4,
//     useWorker: true,
//   };
//   return (
//     <AceEditor
//       ref={editorRef}
//       mode='json'
//       theme={theme || 'material-one-dark'}
//       fontSize={14}
//       showGutter
//       showPrintMargin={false}
//       onChange={onChange}
//       value={value}
//       wrapEnabled
//       highlightActiveLine
//       enableSnippets
//       style={{width: '100%', height: height || 300}}
//       setOptions={options}
//     />
//     // <AceEditor
//     //   mode="json"
//     //   theme="monokai"
//     //   value={value}
//     //   onChange={onEditorChange}
//     //   name="UNIQUE_ID_OF_DIV"
//     //   editorProps={{ $blockScrolling: true }}
//     //   fontSize={14}
//     //   showPrintMargin={true}
//     //   showGutter={true}
//     //   highlightActiveLine={true}
//     //   setOptions={{
//     //     enableBasicAutocompletion: true,
//     //     enableLiveAutocompletion: true,
//     //     enableSnippets: true,
//     //     showLineNumbers: true,
//     //     tabSize: 2,
//     //   }}/>
//   );
// };
//
// export default AceEditorJson;
