module.exports = UtilService = {
  imgPath: `upload/img/${DateFormat()}`,
  filePath: `upload/file/${DateFormat()}`,
  dateFormat(date = new Date(), format = "yyyy-MM-dd") {
    if (!date) {
      return date;
    }
    if (typeof date === "string" && !date.trim()) {
      return "";
    }
    if (!format) {
      format = 'yyyy-MM-dd';
    }
    //修改为支持字符串格式的日期或date对象
    date = UtilService.DateParse(date);

    let formats = {
      "y+": date.getFullYear(),
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "w+": ["日", "一", "二", "三", "四", "五", "六"][date.getDay()]
    };
    Object.keys(formats).forEach((key) => {
      const item = formats[key];
      format = format.replace(eval("/" + key + "/g"), function (exp) {
        return (exp.length === 1) ? (item) : (("0" + item).substr(("0" + item).length - exp.length));
      });
    });
    return format;
  }
} 