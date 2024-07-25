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
        console.log(post.value);
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