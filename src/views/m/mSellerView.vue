<template>
  <!-- <div>
    <label for="file">產品圖片</label>
    <input type="file" name="file" @change="handleImageUpload" class="form-control">
    <button @click="uploadImage" class="btn btn-primary mt-2">上傳圖片</button>
  </div> -->
  <div class="container">
    <div class="myRowCenter mt-3">
      <h3>個人文章列表</h3>
      <button id="openTxtSet" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#txt_set">
        新增文章
      </button>
    </div>
    <div class="row mt-3">
      <div id="members-articles">
        <ul>
          <li v-for="article in articles" :key="article.id" class="d-flex justify-content-between align-items-center">
            <div></div>
            <span>{{ article.title.rendered }}</span>
            <button @click="deleteArticle(article.id)" class="btn btn-danger mt-2">刪除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 新增產品 -->
  <div class="modal fade" id="txt_set">
    <div class="modal-dialog w-100">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header modTitle w-100">
          <h4 class="modal-title">新增文章</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body w-100">
          <!-- <form action=""> -->
          <div class="my-3">
            <label for="title">文章標題</label>
            <input type="text" name="title" id="title" class="form-control">
          </div>
          <div class="my-3">
            <label for="file">文章圖片</label>
            <input type="file" name="file" @change="handleImageUpload" id="file" class="form-control">
            <hr>
            <div class="crop">
              <div class="box tailoring-box h-100">
                <img id="tailoringImg" :src="tailoringImgSrc">
              </div>
              圖片預覽：
              <div class="box preview">
                <div id="previewImg" class="w-100"></div>
              </div>

              <button id="sureCut" @click="sureCut">裁剪</button>
            </div>
            <div class="result" v-show="resultImgSrc">
              裁切壓縮後：
              <p></p>
              <span></span>
              <input type="hidden">
              <img id="newImg" class="w-100" :src="resultImgSrc">
            </div>
          </div>
          <div class="my-3">
            <label for="text">介紹內文</label>
            <textarea name="text" id="text" class="form-control"></textarea>
          </div>
          <!-- <div class="my-3">
            <label for="money">金額</label>
            <input type="number" name="title" id="money" class="form-control">
          </div> -->
          <div class="my-3">
            <button class="btn btn-primary" type="submit" id="save_text" @click="uploadFile">上傳</button>
          </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Cropper from 'cropperjs';
// import axios from 'axios';

export default {
  setup() {
    const articles = ref([]);
    const imageFile = ref(null);
    const tailoringImgSrc = ref('');
    const resultImgSrc = ref('');
    const cropper = ref(null);

    // 圖片裁切
    onMounted(() => {
      fetchArticles();

      const image = document.getElementById('tailoringImg');
      cropper.value = new Cropper(image, {
        aspectRatio: 800 / 600,
        preview: '#previewImg',
        guides: false,
        autoCropArea: 0.5,
        dragMode: 'crop',
        cropBoxResizable: true,
        movable: true,
        zoomable: true,
        rotatable: false,
        zoomOnWheel: true,
        zoomOnTouch: true,
      });
    });

    // 顯示發文
    const fetchArticles = async () => {
      try {
        const userID = localStorage.getItem('user_ID');
        const timestamp = new Date().getTime();

        const response = await fetch(`https://oliver0502api.com/wp-json/wp/v2/posts?author=${userID}&categories=1&timestamp=${timestamp}`, {
          method: 'GET',
        });

        const data = await response.json();
        articles.value = data;
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    // 圖片檔案
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          tailoringImgSrc.value = evt.target.result;
          cropper.value.replace(evt.target.result, false);
        };
        reader.readAsDataURL(file);
      }
    };

    const sureCut = () => {
      if (!tailoringImgSrc.value) {
        return false;
      } else {
        const canvas = cropper.value.getCroppedCanvas();
        resultImgSrc.value = canvas.toDataURL('image/jpeg');
      }
    };

    const urltoFile = async (url, filename, mimeType) => {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename, { type: mimeType });
    };

    // 上傳圖片
    // const uploadImage = async () => {
    //   if (!imageFile.value) {
    //     alert('請選擇圖片');
    //     return;
    //   }
    //   try {
    //     const mediaToken = localStorage.getItem('token');
    //     const formData = new FormData();
    //     formData.append('file', imageFile.value);

    //     const response = await fetch('https://oliver0502api.com/wp-json/custom-file-upload/v1/upload', {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Bearer ${mediaToken}`,
    //       },
    //       body: formData,
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log('Image uploaded successfully:', data);
    //       alert('圖片上傳成功');
    //       return data;
    //     } else {
    //       console.error('Error uploading image:', response.status);
    //       alert('圖片上傳失敗,請稍後再試');
    //     }
    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //     alert('圖片上傳失敗,請稍後再試');
    //   }
    // };
    const uploadImage = async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://oliver0502api.com/wp-json/custom-file-upload/v1/upload',{
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body:formData,
        });

        return await response.json();
      } catch (error) {
        alert('沒有裁切後的圖片!');
        console.log('圖片新增失敗');
        console.error(error);
      }
    };

    // 新增產品
    const uploadFile = async () => {
      const title = document.getElementById('title').value;
      const text = document.getElementById('text').value;
      const category = "1";
      // const money = document.getElementById('money').value;
      const fileName = document.getElementById('file').files[0];

      // 取得裁切後的圖片
      const newImgSrc = resultImgSrc.value;
      const file = await urltoFile(newImgSrc, fileName.name, 'image/jpeg');

      const imageData = await uploadImage(file);
      localStorage.setItem('imageID', imageData.data.id);

      if (imageData.success) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', text);
        postData.append('user_id', localStorage.getItem('user_ID'));
        postData.append('featured_image', localStorage.getItem('imageID'));
        postData.append('money', "錢錢錢");
        const categories = [category];
        postData.append('categories', JSON.stringify(categories));

        try {
          const response = await fetch('https://oliver0502api.com/wp-json/wp/v2/rae/post/create', {
            method: 'POST',
            body:postData,
          });

          const data = await response.json();

          if (data.status == 200) {
            alert('新增成功！');
            window.location.reload();
          } else {
            console.log('文章判定失敗');
          }
        } catch (error) {
          console.error('Upload error:', error);
        }
      } else {
        console.log('沒有圖片成功提示');
        console.log(imageData);
      }
    };

    // 刪除文章
    const deleteArticle = async (articleId) => {
      try {
        const response = await fetch(`https://oliver0502api.com/wp-json/wp/v2/posts/${articleId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          articles.value = articles.value.filter(article => article.id !== articleId);
          alert('刪除成功');
        } else {
          console.error('刪除失敗');
        }
      } catch (error) {
        console.error('刪除失敗', error);
      }
    };

    return {
      articles,
      imageFile,
      tailoringImgSrc,
      resultImgSrc,
      handleImageUpload,
      sureCut,
      uploadFile,
      uploadImage,
      deleteArticle,
    };
  },
};
</script>

<style lang="scss">

.bodyBd{
display: flex;
justify-content: center;
}

.bodyBox{
width: 1200px;
display: flex;
justify-content: space-between;
}

.mbodyTitle{
display: flex;
justify-content: space-between;
padding: 0.3rem;
}


// .bodyTitleBox{
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   font-size: 0.9rem;

//   .btnBox{
//     color: #222;
//     font-size: 0.9rem;
//   }

//   .bodyTitleTime{
//     padding-left: 1rem;
//     box-shadow: -5px 0 6px -5px rgba(0, 0, 0, .2);
//   }

//   .bodyTitleTime :active{
//     color: aqua;
//   }
  
// }




// .bodyListTitle{
//   text-align: start;
// }

// .mbodyList{
//   display: flex;
//   flex-direction:column;

//   .mbodyListTitle{
//     display: flex;
//     justify-content: space-between;
//     background: #f1f1f1;
//     padding: 0 2rem 0 1.5rem;

//     .mbodyListTitleLeft{
//       display: flex;
//       gap:1rem;

//       .leftBox{
//         display: flex;
//         align-items: center;
//       }
//     }

//     .mbodyListTitleright{
//       display: flex;
//       align-items: center;
//     }
//   }
// }

.roundedOne {
width: 28px;
height: 28px;
position: relative;
margin: 3px auto;
background: #fcfff4;
background: linear-gradient(to top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
border-radius: 50px;
box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
}

.roundedOne label {
width: 20px;
height: 20px;
cursor: pointer;
position: absolute;
left: 4px;
top: 4px;
background: #ff0; /* 这里直接使用颜色值 */
border-radius: 50px;
box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
}

.roundedOne label::after {
content: '';
width: 16px;
height: 16px;
position: absolute;
top: 2px;
left: 2px;
background: linear-gradient(to top, #222 0%, #45484d 100%);
opacity: 0;
border-radius: 50px;
box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);
}

.roundedOne label:hover::after {
opacity: 0.3;
}

.roundedOne input[type=checkbox] {
visibility: hidden;
}

.roundedOne input[type=checkbox]:checked + label::after {
opacity: 1;
}


// .mbodyListBox{
//   display: grid;
//   grid-template-columns: repeat(4, 1fr); /* 创建4个等宽的列 */
//   grid-gap: 10px; /* 设置列之间的间距 */

//   .leftBox{
//     display: flex;
//     flex-direction:column;
//     align-items: start;
//   }

//   .rightBox{
//     display: flex;
//     flex-direction:column;
//     align-items: end;
//     color: red;
//   }

//   .lineBox{
//     box-shadow: -5px 0 6px -5px rgba(0, 0, 0, .2);
//   }
// }

</style>