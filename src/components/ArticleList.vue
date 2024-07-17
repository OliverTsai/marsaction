<template>
    <div id="members-articles">
      <div v-if="articles.length" class="d-flex justify-content-center flex-wrap">
        <div v-for="article in articles" :key="article.id" :class="colSizeClass" class="col grid-item text-center mb-4">
          <div class="card">
            <div class="img">
              <a :href="`post.html?id=${article.id}`">
                <img class="img-fluid" :src="article.featuredImageUrl" />
              </a>
            </div>
            <div class="card-body">
              <p class="card-text">{{ article.title }}</p>
              <p class="card-text">價格: {{ article.money }}</p>
              <button class="btn btn-danger btn-sm delete-btn" @click="deleteProduct(article.id, article.mediaId)">
                刪除產品
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else>你還沒有新增商品。</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        articles: [],
        userID: localStorage.getItem('user_ID'),
        sellerUrl: 'https://oliver0502api.com/',
      };
    },
    computed: {
      colSizeClass() {
        return window.innerWidth >= 1000 ? 'col-lg-4' : 'col-6';
      },
    },
    async mounted() {
      await this.fetchUserArticles();
    },
    methods: {
      async fetchUserArticles() {
        try {
          const timestamp = new Date().getTime();
          const response = await fetch(`${this.sellerUrl}wp-json/wp/v2/posts?author=${this.userID}&timestamp=${timestamp}`);
          const posts = await response.json();
          if (posts.length > 0) {
            await this.renderUserArticles(posts);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
      async renderUserArticles(posts) {
        for (const post of posts) {
          const { title: { rendered: title }, featured_media: featuredMediaId, x_metadata: { amount: money }, id: postId } = post;
          const timestamp = new Date().getTime();
          const mediaUrl = `${this.sellerUrl}wp-json/wp/v2/media/${featuredMediaId}?timestamp=${timestamp}`;
  
          try {
            const mediaResponse = await fetch(mediaUrl).then(response => response.json());
            const featuredImageUrl = mediaResponse.source_url;
            this.articles.push({ title, featuredImageUrl, money, id: postId, mediaId: mediaResponse.id });
          } catch (error) {
            console.log('獲取特色圖片URL失敗：', error);
          }
        }
      },
      async deleteProduct(postId, mediaId) {
        try {
          await this.deletePost(postId);
          await this.deleteMedia(mediaId);
          alert('已成功刪除');
          window.location.reload();
        } catch (error) {
          console.error('Delete product error:', error);
        }
      },
      async deletePost(postId) {
        const postToken = localStorage.getItem('token');
        const response = await fetch(`${this.sellerUrl}wp-json/wp/v2/posts/${postId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${postToken}` },
        });
  
        if (!response.ok) {
          throw new Error(`Delete post failed: ${response.statusText}`);
        }
      },
      async deleteMedia(mediaId) {
        const mediaToken = localStorage.getItem('token');
        const response = await fetch(`${this.sellerUrl}wp-json/wp/v2/media/${mediaId}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${mediaToken}`, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: '_method=DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`Delete media failed: ${response.statusText}`);
        }
      },
    },
  };
  </script>