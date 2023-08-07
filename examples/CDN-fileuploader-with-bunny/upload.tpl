<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
	<style>${app.file('style.css')}</style>
</head>
<body>
<div id="app">
    <div class="content">
      <div class="drag-area">
        <div class="file-name">{{ fileName }}</div>
        <div class="uploader-tips">
          <span>将文件拖拽至此，或</span>
          <label for="fileInput" style="color: #11A8FF; cursor: pointer">点此选择要上传的文件</label>
        </div>
      </div>
    </div>

    <div class="footer">
			<input type="password" id="token" placeholder="输入token">
      <input type="file" id="fileInput"style="display: none;">
			压缩JS <input type="checkbox" id="uglifyJS">
      <button id="submitBtn">提交</button>
    </div>

		<div class="upload-result">
		</div>
  </div>
	<script>
${app.file('app.client.js')}
	</script>
</body>
</html>