<template>
  <div id="wrapper">
    <img alt="electron-vue" id="logo" src="~@/assets/logo.png" />
    <main>
      <div class="left">
        <div class="title">欢迎使用略缩图工具</div>
        <div class="input">
          <input
            @change="showPic"
            accept="*/*"
            id="h5Input2"
            multiple
            name="html5uploader"
            title="点击选择文件夹"
            type="file"
            webkitdirectory
          />
        </div>
      </div>
      <div class="right">
        <button @click="action">action</button>
      </div>
    </main>
  </div>
</template>

<script>
import { findFirImg, readdirPro} from '../until'
import fs from 'fs'
import path from 'path'

export default {
  name: 'landing-page',
  components: {},
  data() {
    return {
      fileUrl: ''
    }
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    showPic(source) {
      this.fileUrl = source.currentTarget.files[0].path
    },
    action() {
      let self = this;
      let fileUrl = this.fileUrl
      if (!fileUrl) {
        self.$emit("setToast","请先选择文件夹!");
        return;
      }
      self.$emit("setToast","默念一声京哥牛逼!");
      var dist = fileUrl + '/dist';
      // 创建空文件夹放置最后整理的文件 如果已有dist文件只提醒，不进行删除操作
      let hasDist = false;
      fs.access(dist, fs.constants.F_OK, function(err) {
        if (err) {
          fs.mkdir(dist, function(err) {
            if (err) {
              console.log(err)
              return
            }
          })
          return
        } else {
          hasDist = true;
          self.$emit("setToast","已存在dist文件夹，请手动删除后重试!");
          // console.log('已存在dist文件夹，请手动删除后重试')
        }
      })
      if(hasDist) return;

      readdirPro(fileUrl).then(res => {
        res.forEach(function(filename) {
          var filedir = path.join(fileUrl, filename)
          fs.stat(filedir, function(eror, stats) {
            var isDir = stats.isDirectory() //是文件夹
            if (isDir) {
              readdirPro(`${fileUrl}/${filename}`).then(childList => {
                // childList 这里拿到的是每个文件夹里的文件名
                let { firImgName, ImgType } = findFirImg(childList) // 要的是第一个图片文件

                fs.copyFile(
                  `${fileUrl}/${filename}/${firImgName}`,
                  `${dist}/${filename}.${ImgType}`,
                  function(err) {
                    if (err) {
                      console.log('图片复制失败' + err)
                      return
                    }
                    console.log(filename+"文件复制成功！")
                  }
                )
              })
            }
          })
        })
      })
      // console.log("图片处理成功！");
      this.$emit("setToast","图片处理成功！");
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  padding: 0 30px;
}
.left {
  flex: 1;
}
.right {
  flex: 1;
}
.input {
  padding: 10px 0;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
