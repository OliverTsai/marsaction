<template>
  <div>
    <label for="file">產品圖片</label>
    <input type="file" name="file" @change="handleImageUpload" class="form-control">
    <button @click="uploadImage" class="btn btn-primary mt-2">上傳圖片</button>
  </div>
  <div class="container">
    <div class="myRowCenter mt-3">
        <h3>個人產品列表</h3>
        <button id="openTxtSet" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#txt_set">
            新增產品
        </button>
    </div>
    <div class="row mt-3">
        <div id="members-articles"></div>
    </div>
  </div>
  <!-- 新增產品 -->
  <div class="modal fade" id="txt_set">
    <div class="modal-dialog w-100">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">新增產品</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <!-- <form action=""> -->
                <div class="my-3">
                    <label for="title">產品標題</label>
                    <input type="text" name="title" id="title" class="form-control">
                </div>
                <div class="my-3">
                    <label for="add-category-sex">使用性別：</label>
                    <select id="add-category-sex">
                        <option value="6">男</option>
                        <option value="7">女</option>
                    </select>
                </div>
                <div class="my-3">
                    <label for="add-category">選擇類別：</label>
                    <select id="add-category">
                        <option value="8">洋裝</option>
                        <option value="9">運動裝</option>
                        <option value="10">家居服</option>
                        <option value="11">女士沙灘裝</option>
                        <option value="12">上衣</option>
                        <option value="13">褲裙</option>
                        <option value="14">首飾</option>
                        <option value="15">配件</option>
                        <option value="16">包包</option>
                        <option value="17">鞋類</option>
                    </select>
                </div>
                <div class="my-3">
                    <label for="file">產品圖片</label>
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
                    <input type="number" name="title" id="money" class="form-control">
                </div>
                <div class="my-3">
                    <button class="btn btn-primary" type="submit" id="save_text">上傳</button>
                </div>
                <!-- </form> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const imageFile = ref(null);

    // 圖片檔案
    const handleImageUpload = (event) => {
      imageFile.value = event.target.files[0];
    };

    // 上傳圖片
    const uploadImage = async () => {
      if (!imageFile.value) {
        alert('請選擇圖片');
        return;
      }
      try {
        const mediaToken = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', imageFile.value);

        const response = await fetch('https://oliver0502api.com/wp-json/custom-file-upload/v1/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mediaToken}`,
          },
          body: formData,
        });

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
    };

    // 新增產品
    // const uploadFile = async () =>{

    // };

    return {
      imageFile,
      handleImageUpload,
      uploadImage,
    };
  },
};
</script>