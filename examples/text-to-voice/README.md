# Text to voice

Convert text to audio, use [Qiniu](https://www.qiniu.com/).

See https://codepen.io/akira-cn/pen/oNQqvrN

![](https://pkxfpp.hk.aircodecdn.com/1689465051671.1689465066922_ie5sy8dtsx9.jpg)

## 第一步：拷贝项目

1. 通过 AirCode 源码链接中右上角的「Get a copy」按钮快速生成一个自己的 AirCode Node.js 应用。 注意不要直接复制代码，如果是直接复制纯代码粘贴过去，需要再手工安装 NPM 依赖包。 如果没有登录，需先登录 AirCode。推荐使用 GitHub 登录，会快一些。

![](https://docs-cn.aircode.io/_images/tutorials/feishu-chatGPT/6-get-copy.png)

![](https://docs-cn.aircode.io/_for_demos/7iBqrpbrMR.1678961115282_5j58e0jj3ek.jpeg)

2. 在弹出的创建对话框中，输入你的项目名称，并点击「Create」完成创建。

![](https://pkxfpp.hk.aircodecdn.com/1689465840402.1689465858020_i1hoi55h8yl.jpg)

## 第二步：注册并登录七牛云，将AccessKey和SecretKey填入环境变量中

1. 创建和管理密钥，路径在**管理控制台>个人中心>密钥管理**

![](https://pkxfpp.hk.aircodecdn.com/1689465357221.1689465388065_nm3wbss3kih.jpg)

2. 进入刚才创建好的 AirCode 应用中，在「Environments」标签页，将创建的密钥的AK和SK值分别填入。

![](https://pkxfpp.hk.aircodecdn.com/1689465582323.1689465595942_2hdkhhmbl0r.jpg)

## 第三步：部署 AirCode 应用

1. 填完环境变量后，点击页面最上方的「Deploy」按钮，在弹出对话框中点击「Deploy」，开始部署。

![](https://pkxfpp.hk.aircodecdn.com/1689465715600.1689465731720_22sph74gppzi.jpg)

2. 部署成功后，在左侧文件列表中选中「index.js」，可以看到中间编辑器部分，文件下方有一个 URL，点击复制这个 URL。

![](https://pkxfpp.hk.aircodecdn.com/2023-07-1608.06.58.1689466050736_0ilmwe8in2jb.png)

3. 我们可以测试一下系统是否运行正常，将这个 URL 在新标签页打开，并在后面加上 ?spkid=7&content=hello%20aircode，如果返回的结果包含正常的 reply 信息，则代表一切正常。返回的audioURL就是合成后的语音。

**注意：因为语音合成需要一定的时间，所以请耐心等待，不要频繁刷新页面。**

![](https://pkxfpp.hk.aircodecdn.com/1689466282314.1689466299395_k1gzltypiwh.jpg)

## 第四步：前端操作界面

你可以复制这个codepen项目：[https://codepen.io/akira-cn/pen/oNQqvrN](https://codepen.io/akira-cn/pen/oNQqvrN)，将URL更改成你自己的地址。

或者参考代码开发属于自己的语音合成App。

![](https://pkxfpp.hk.aircodecdn.com/1689466666777.1689466686788_aynkio16v37.jpg)
