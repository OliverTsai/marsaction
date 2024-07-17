<template>
    <div>
      <input type="file" id="file" @change="handleFileChange" />
      <input type="text" id="title" v-model="title" />
      <textarea id="text" v-model="text"></textarea>
      <input type="text" id="add-category" v-model="category" />
      <input type="text" id="add-category-sex" v-model="categorySex" />
      <input type="number" id="money" v-model="money" />
      <button id="save_text" @click="uploadFile" :disabled="uploading">新增產品</button>
    </div>
  </template>
  
  <script>
  import { urltoFile } from '@/utils';
  
  export default {
    data() {
      return {
        title: '',
        text: '',
        category: '',
        categorySex: '',
        money: '',
        uploading: false,
        userID: localStorage.getItem('user_ID'),
        sellerUrl: 'https://oliver0502api.com/',
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const imgSrc = evt.target.result;
            this.$emit('file-changed', imgSrc);
          };
          reader.readAsDataURL(file);
        }
      },
      async uploadFile() {
        this.uploading = true;
        const fileName = document.getElementById('file').files[0].name;
        const newImgSrc = this.$refs.imageCropper.croppedImage;
  
        try {
          const file = await urltoFile(newImgSrc, fileName);
          const imageData = await this.uploadImage(file);
          localStorage.setItem('imageID', imageData.data.id);
  
          if (imageData.success) {
            const postData = new FormData();
            postData.append('title', this.title);
            postData.append('content', this.text);
            postData.append('user_id', this.userID);
            postData.append('featured_image', localStorage.getItem('imageID'));
            postData.append('money', this.money);
            const categories = ['5', this.categorySex, this.category];
            postData.append('categories', JSON.stringify(categories));
  
            const response = await fetch(`${this.sellerUrl}wp-json/wp/v2/rae/post/create`, {
              method: 'POST',
              body: postData,
            });
  
            const data = await response.json();
  
            if (data.status === 200) {
              alert('新增成功！');
              window.location.reload();
            } else {
              console.log('文章判定失敗');
            }
          } else {
            console.log('沒有圖片成功提示');
            console.log(imageData);
          }
        } catch (error) {
          console.error('Upload error:', error);
        } finally {
          this.uploading = false;
        }
      },
      async uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          const response = await fetch(`${this.sellerUrl}wp-json/custom-file-upload/v1/upload`, {
            method: 'POST',
            body: formData,
          });
  
          return await response.json();
        } catch (error) {
          alert('沒有裁切後的圖片!');
          console.log('圖片新增失敗');
          console.error(error);
        }
      },
    },
  };
  </script>