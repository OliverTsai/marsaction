<template>
  <div>
    <div v-if="post">
      <div>
        <img :src="post.x_featured_media_medium" alt="Post Image" v-if="post.x_featured_media_medium" />
      </div>
      <div>
        {{ post.title.rendered }}
      </div>
      <div v-html="post.content.rendered"></div>
      <div>發帖人：{{ post.x_author }}</div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'PostDetail',
  setup() {
    const post = ref(null);
    const route = useRoute();
    const postId = route.params.id;

    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://oliver0502api.com/wp-json/wp/v2/posts/${postId}`);
        post.value = response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    onMounted(() => {
      fetchPost();
    });

    return {
      post,
    };
  },
};
</script>

<style scoped>
.btnBox.active {
  background-color: #007bff;
  color: white;
}

.mbodyListBox {
  display: flex;
  justify-content: space-between;
}

.mColumnW18, .mColumnW62, .mColumnW10 {
  display: flex;
  flex-direction: column;
}

.mrightBox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.leftBox {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.rightBox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner {
  width: 100%;
  height: auto;
}

.bannerBox {
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

::v-deep .el-dialog header{
  display: none;
  /* background: #000000;
  color: #007bff; */
}
</style>