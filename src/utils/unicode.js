const ToUnicode = (str) => {
  var txt = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
  //var txt= escape(str).replace(/([%3F]+)/gi,'\\u');
  return txt
    .replace(/%7b/gi, '{')
    .replace(/%7d/gi, '}')
    .replace(/%3a/gi, ':')
    .replace(/%2c/gi, ',')
    .replace(/%27/gi, "'")
    .replace(/%22/gi, '"')
    .replace(/%5b/gi, '[')
    .replace(/%5d/gi, ']')
    .replace(/%3D/gi, '=')
    .replace(/%20/gi, ' ')
    .replace(/%3E/gi, '>')
    .replace(/%3C/gi, '<')
    .replace(/%3F/gi, '?')
    .replace(/%5c/gi, '\\');
};
const ToGB2312 = (str) => {
  return unescape(str.replace(/\\u/gi, '%u'));
};

export { ToUnicode, ToGB2312 };
