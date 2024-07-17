<template>
  <div>
    <h1>Posts</h1>
    <div>
      <div v-for="post in posts" :key="post.id">
        <div>
          <img :src="post.x_featured_media" alt="Post Image" v-if="post.x_featured_media" />
        </div>
        <div>
          {{ post.title.rendered }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';

export default {
  name: 'PostsList',
  setup() {
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://oliver0502api.com/wp-json/wp/v2/posts?categories=1');
        posts.value = response.data;
        console.log(posts.value);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    onMounted(() => {
      fetchPosts();
    });

    return {
      posts
    };
  },
}
</script>

<style scoped>
/* Your CSS styles */
</style>