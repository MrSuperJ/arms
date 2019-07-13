var fs = require("fs");
var path = require("path"); //解析需要遍历的文件夹


export function findFirImg (list) {
  let firImgName, ImgType;
  //   目前市面上图片的格式
  let type = ["jpg", "png", "jepg", "jpeg"];
  for (let j = 0; j < type.length; j++) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].indexOf(type[j]) > -1) {
        firImgName = list[i];
        ImgType = type[j];
        break;
      } else {
        console.log(list[i], type[j]);
      }
    }
    if (firImgName) break;
  }
  return {
    firImgName,
    ImgType
  };
};
//根据文件路径读取文件，返回文件列表
export function readdirPro (filePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, function(err, files) {
      if (files) {
        resolve(files);
      }
      if (err) {
        reject(err);
      }
    });
  });
}
