/*
    param1 JSONstr 未格式化的JSON字符串
    return 去【类空格字符】后的JSON字符串
*/
function JSONTrim(txt) {
  let JSONstr;
  try {
    JSONstr = txt.replace(/'/g, '"');
    JSONstr = JSON.stringify(JSON.parse(JSONstr));
  } catch (error) {
    // 转换失败错误提示
    // console.error('json数据格式有误...');
    // console.error(error);
    JSONstr = null;
  }
  return JSONstr;
}

/*
    param1 JSONstr 未格式化的JSON字符串
    return 格式化后的JSON字符串
*/
function JSONFormat(txt) {
  let JSONstr;
  JSONstr = JSONTrim(txt); // 初步格式化json

  let re = new RegExp('\\{|\\}|,|:', 'g'); // 匹配格式化后的json中的{},:
  let exec = null;
  let InvalidFs = 0;
  let InvalidBs = 0;
  while ((exec = re.exec(JSONstr))) {
    // 找{},:
    let frontToCurrent = exec.input.substr(0, exec.index + 1); // 匹配开头到当前匹配字符之间的字符串
    if (frontToCurrent.replace(/\\"/g, '').replace(/[^"]/g, '').length % 2 !== 0) {
      // 测试当前字符到开头"的数量，为双数则被判定为目标对象
      if (exec[0] === '{') InvalidFs++;
      else if (exec[0] === '}') InvalidBs++;
      continue; // 不是目标对象，手动跳过
    }
    let keyTimesF = frontToCurrent.replace(/[^{]/g, '').length - InvalidFs; // 找出当前匹配字符之前所有{的个数
    let keyTimesB = frontToCurrent.replace(/[^}]/g, '').length - InvalidBs; // 找出当前匹配字符之前所有}的个数
    let indentationTimes = keyTimesF - keyTimesB; // 根据{个数计算缩进

    if (exec[0] === '{') {
      JSONstr = JSONstr.slice(0, exec.index + 1) + '\n' + '\t'.repeat(indentationTimes) + JSONstr.slice(exec.index + 1); // 将缩进加入字符串
    } else if (exec[0] === '}') {
      JSONstr = JSONstr.slice(0, exec.index) + '\n' + '\t'.repeat(indentationTimes) + JSONstr.slice(exec.index); // 将缩进加入字符串
      re.exec(JSONstr); // 在查找目标前面插入字符串会回退本次查找，所以手动跳过本次查找
    } else if (exec[0] === ',') {
      JSONstr = JSONstr.slice(0, exec.index + 1) + '\n' + '\t'.repeat(indentationTimes) + JSONstr.slice(exec.index + 1);
    } else if (exec[0] === ':') {
      JSONstr = JSONstr.slice(0, exec.index + 1) + ' ' + JSONstr.slice(exec.index + 1);
    } else {
      // console.log(`匹配到了来路不明的${exec[0]}`);
    }
  }
  return JSONstr === null ? '"Invalid value"' : JSONstr;
}

export default JSONFormat;
