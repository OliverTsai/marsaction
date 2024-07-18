<template>
  <div class="myRowCenter mt-3">
    <h3>個人帖子列表</h3>
    <button id="openTxtSet" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#txt_set">
      新增產品
    </button>
  </div>
  <div class="row mt-3">
    <div id="members-articles" ref="membersArticles"></div>
  </div>
  <!-- 新增產品擬態框 -->
  <div class="modal fade" id="txt_set">
    <div class="modal-dialog w-100">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">新增貼文</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="my-3">
            <label for="title">文章標題</label>
            <input type="text" name="title" id="title" class="form-control">
          </div>
          <div class="my-3">
            <label for="file">文章圖片</label>
            <input type="file" name="file" id="file" class="form-control">
            <hr>
            <div class="crop">
              <div class="box tailoring-box h-100">
                <img id="tailoringImg" src="">
              </div>
              圖片預覽：
              <div class="box preview">
                <div id="previewImg"></div>
              </div>
              <button id="sureCut">裁剪</button>
            </div>
            <div class="result">
              裁切壓縮後：
              <p></p>
              <span></span>
              <input type="hidden">
              <img id="newImg" class="w-100" src="">
            </div>
          </div>
          <div class="my-3">
            <label for="text">介紹內文</label>
            <textarea name="text" id="text" class="form-control"></textarea>
          </div>
          <div class="my-3">
            <label for="money">金額</label>
            <input type="number" name="money" id="money" class="form-control">
          </div>
          <div class="my-3">
            <button class="btn btn-primary" type="submit" id="save_text">上傳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
// import axios from 'axios';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
  setup() {
    const sellerUrl = 'https://oliver0502api.com/';
    const userID = localStorage.getItem('user_ID');
    const membersArticles = ref(null);

    const fetchUserArticles = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`${sellerUrl}wp-json/wp/v2/posts?author=${userID}&timestamp=${timestamp}`);
        const posts = await response.json();

        if (posts.length > 0) {
          renderUserArticles(posts);
        } else {
          displayNoArticlesMessage();
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const renderUserArticles = (posts) => {
      const container = document.createElement('div');
      container.classList.add('d-flex', 'justify-content-center', 'flex-wrap');

      posts.forEach(async (post) => {
        const { title: { rendered: title }, featured_media: featuredMediaId, x_metadata: { amount: money }, id: postId } = post;
        const timestamp = new Date().getTime();
        const mediaUrl = `${sellerUrl}wp-json/wp/v2/media/${featuredMediaId}?timestamp=${timestamp}`;

        try {
          const mediaResponse = await fetch(mediaUrl).then(response => response.json());
          const featuredImageUrl = mediaResponse.source_url;

          const colSizeClass = window.innerWidth >= 1000 ? 'col-lg-4' : 'col-6';

          const col = document.createElement('div');
          col.classList.add('col', colSizeClass, 'grid-item', 'text-center', 'mb-4');

          const card = document.createElement('div');
          card.classList.add('card');

          const imageCell = document.createElement('div');
          imageCell.classList.add('img');
          const imageLink = document.createElement('a');
          imageLink.href = `post.html?id=${postId}`;
          const img = document.createElement('img');
          img.classList.add('img-fluid');
          img.src = featuredImageUrl;
          imageLink.appendChild(img);
          imageCell.appendChild(imageLink);

          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          const titleCell = document.createElement('p');
          titleCell.classList.add('card-text');
          titleCell.textContent = title;
          const moneyCell = document.createElement('p');
          moneyCell.classList.add('card-text');
          moneyCell.textContent = `價格: ${money}`;

          const deleteButton = document.createElement('button');
          deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
          deleteButton.dataset.postid = postId;
          deleteButton.textContent = '刪除產品';
          deleteButton.addEventListener('click', () => deleteProduct(postId, mediaResponse.id));

          cardBody.append(titleCell, moneyCell, deleteButton);
          card.append(imageCell, cardBody);
          col.append(card);
          container.append(col);
        } catch (error) {
          console.log('獲取特色圖片URL失敗：', error);
        }
      });

      membersArticles.value.innerHTML = '';
      membersArticles.value.appendChild(container);
    };

    const displayNoArticlesMessage = () => {
      membersArticles.value.innerHTML = '<p>你還沒有新增商品。</p>';
    };

    const deleteProduct = async (postId, mediaId) => {
      try {
        await deletePost(postId);
        await deleteMedia(mediaId);
        alert('已成功刪除');
        window.location.reload();
      } catch (error) {
        console.error('Delete product error:', error);
      }
    };

    const deletePost = async (postId) => {
      const postToken = localStorage.getItem('token');
      const response = await fetch(`${sellerUrl}wp-json/wp/v2/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${postToken}` },
      });

      if (!response.ok) {
        throw new Error(`Delete post failed: ${response.statusText}`);
      }
    };

    const deleteMedia = async (mediaId) => {
      const mediaToken = localStorage.getItem('token');
      const response = await fetch(`${sellerUrl}wp-json/wp/v2/media/${mediaId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${mediaToken}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: '_method=DELETE',
      });

      if (!response.ok) {
        throw new Error(`Delete media failed: ${response.statusText}`);
      }
    };

    const uploadFile = async () => {
      const uploadButton = document.getElementById('save_text');
      uploadButton.disabled = true;

      const fileName = document.getElementById('file').files[0];
      const title = document.getElementById('title').value;
      const text = document.getElementById('text').value;
      // const category = document.getElementById('add-category').value;
      // const categorySex = document.getElementById('add-category-sex').value;
      const money = document.getElementById('money').value;

      try {
        const newImgSrc = document.querySelector('.result img').src;
        const file = await urltoFile(newImgSrc, fileName.name);

        const imageData = await uploadImage(file);
        localStorage.setItem('imageID', imageData.data.id);

        if (imageData.success) {
          const postData = new FormData();
          postData.append('title', title);
          postData.append('status', 'publish');
          postData.append('fields[description]', text);
          postData.append('fields[amount]', money);
          postData.append('fields[image]', imageData.data.id);
          postData.append('fields[category]', '1');
          // postData.append('fields[category_sex]', categorySex);

          const postToken = localStorage.getItem('token');
          const response = await fetch(`${sellerUrl}wp-json/wp/v2/posts`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${postToken}` },
            body: postData,
          });

          if (!response.ok) {
            throw new Error(`Upload post failed: ${response.statusText}`);
          }

          alert('上傳成功');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error uploading post:', error);
        alert('上傳失敗，請稍後再試');
      } finally {
        uploadButton.disabled = false;
      }
    };

    const urltoFile = async (url, filename, mimeType) => {
      mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename, { type: mimeType });
    };

    const uploadImage = async (file) => {
      const mediaToken = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${sellerUrl}wp-json/wp/v2/media`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${mediaToken}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload image failed: ${response.statusText}`);
      }

      return await response.json();
    };

    const initCropper = () => {
      const input = document.getElementById('file');
      const imgPreview = document.getElementById('previewImg');
      const cropButton = document.getElementById('sureCut');
      const newImg = document.getElementById('newImg');

      let cropper;

      input.addEventListener('change', (e) => {
        const files = e.target.files;
        const done = (url) => {
          input.value = '';
          document.getElementById('tailoringImg').src = url;
          cropper = new Cropper(document.getElementById('tailoringImg'), {
            aspectRatio: 1,
            viewMode: 1,
            preview: imgPreview,
          });
        };
        const reader = new FileReader();
        reader.onload = () => {
          done(reader.result);
        };
        reader.readAsDataURL(files[0]);
      });

      cropButton.addEventListener('click', () => {
        const canvas = cropper.getCroppedCanvas({
          width: 400,
          height: 400,
        });
        newImg.src = canvas.toDataURL();
      });
    };

    onMounted(() => {
      fetchUserArticles();
      initCropper();
      document.getElementById('save_text').addEventListener('click', uploadFile);
    });

    return {
      membersArticles,
    };
  },
};
</script>

<style scoped>
/* 添加必要的样式 */
</style>