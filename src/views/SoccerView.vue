<template>
  <div>
    <UploadForm @file-changed="setImageSrc" ref="uploadForm" />
    <ImageCropper :imgSrc="imgSrc" @cropped="setCroppedImage" ref="imageCropper" />
  </div>
</template>

<script>
import UploadForm from '@/components/UploadForm.vue';
import ImageCropper from '@/components/ImageCropper.vue';

export default {
  components: {
    UploadForm,
    ImageCropper,
  },
  data() {
    return {
      imgSrc: '',
      croppedImage: '',
    };
  },
  methods: {
    setImageSrc(imgSrc) {
      this.imgSrc = imgSrc;
    },
    setCroppedImage(croppedImage) {
      this.croppedImage = croppedImage;
      this.$refs.uploadForm.$refs.imageCropper.croppedImage = croppedImage;
    },
  },
};
</script>