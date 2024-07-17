<template>
    <div>
      <div id="tailoringImg" ref="tailoringImg">
        <img :src="imgSrc" />
      </div>
      <button id="sureCut" @click="cropImage">裁剪圖片</button>
      <div class="result" style="display:none;">
        <p></p>
        <span></span>
        <img />
        <input type="hidden" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['imgSrc'],
    data() {
      return {
        croppedImage: '',
      };
    },
    mounted() {
      this.$refs.tailoringImg.cropper({
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
    },
    methods: {
      cropImage() {
        if (!this.$refs.tailoringImg.attr('src')) {
          return false;
        } else {
          const cropImg = this.$refs.tailoringImg.cropper('getData');
          const canvas = this.$refs.tailoringImg.cropper('getCroppedCanvas');
          const base64 = canvas.toDataURL('image/jpeg');
          const imgNewWidth = 800;
          const imgNewHeight = Math.round(imgNewWidth * cropImg.height / cropImg.width);
          let compressRatio = 102;
          const img = new Image();
          img.src = base64;
  
          img.onload = () => {
            let newImg;
            canvas.width = imgNewWidth;
            canvas.height = imgNewHeight;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, imgNewWidth, imgNewHeight);
            context.drawImage(img, 0, 0, imgNewWidth, imgNewHeight);
            do {
              compressRatio -= 2;
              newImg = canvas.toDataURL('image/jpeg', compressRatio / 100);
            } while (Math.round(0.75 * newImg.length / 1000) > 150);
  
            this.croppedImage = newImg;
            this.$emit('cropped', newImg);
          };
        }
      },
    },
  };
  </script>