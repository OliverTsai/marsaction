<template>
  <div class="container p-3">
    <div v-if="post">
      <div>
        <img :src="post.x_featured_media_original" alt="Post Image" v-if="post.x_featured_media_medium" class="w-100" />
      </div>
      <div class="mt-2">
        {{ post.title.rendered }}
      </div>
      <div v-html="post.content.rendered" class="mt-2"></div>
      <div class="mt-2">發帖人：{{ post.x_author }}</div>
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
/* Your CSS styles */
</style>