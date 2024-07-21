<template>
  <div>
    <label for="file">產品圖片</label>
    <input type="file" name="file" @change="handleImageUpload" class="form-control">
    <button @click="uploadImage" class="btn btn-primary mt-2">上傳圖片</button>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      imageFile: null,
    };
  },
  methods: {
    async uploadImage() {
      if (!this.imageFile) {
        alert('請選擇圖片');
        return;
      }

      try {
        const mediaToken = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', this.imageFile);

        const response = await fetch('https://oliver0502api.com/wp-json/custom-file-upload/v1/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mediaToken}`,

            // 如果需要身份驗證,請在這裡添加相應的授權頭
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log('Image uploaded successfully:', data);
          alert('圖片上傳成功');
          return data;
        } else {
          console.error('Error uploading image:', response.status);
          alert('圖片上傳失敗,請稍後再試');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('圖片上傳失敗,請稍後再試');
      }
    },
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
  },
};
</script>