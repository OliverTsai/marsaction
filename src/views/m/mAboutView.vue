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

      <!-- 顯示回應 -->
      <div class="mt-3">
        <h4>回應</h4>
        <div v-if="comments.length">
          <div v-for="comment in comments" :key="comment.id" class="border p-2 mb-2">
            <div>{{ comment.author_name }} 說：</div>
            <div v-html="comment.content.rendered"></div>
          </div>
        </div>
        <div v-else>
          <p>目前還沒有回應，成為第一個回應者吧！</p>
        </div>
      </div>

      <!-- 回應表單 -->
      <div class="mt-3">
        <h4>新增回應</h4>
        <div>
          <textarea v-model="newComment" class="form-control" rows="3" placeholder="輸入您的回應..."></textarea>
          <button @click="submitComment" class="btn btn-primary mt-2">提交回應</button>
        </div>
      </div>
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
    const comments = ref([]);
    const newComment = ref('');
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

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://oliver0502api.com/wp-json/wp/v2/comments?post=${postId}`,{
        });

        // if (!response.data) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        comments.value = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
        if (error instanceof TypeError) {
          console.log('This might be a CORS or network error');
        }
      }
    };

    const submitComment = async () => {
      const userMail = localStorage.getItem('user_Mail')
      const userName = localStorage.getItem('user_Name')
      let userPlayName = localStorage.getItem('user_PlayName')

      if (!userPlayName){
        userPlayName = userName
      }
      console.log(userPlayName)
      try {
        const commentData = {
          post: postId,
          content: newComment.value,
          author_email: userMail,  // 替換為實際用戶的email
          author_name: userPlayName,  // 替換為實際用戶的名稱
        };
        const response = await fetch('https://oliver0502api.com/wp-json/wp/v2/comments', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        });
        console.log(response)
        if (response.ok) {
          alert('新增成功！');
          newComment.value = '';
          window.location.reload();
        } else {
          console.log('新增失敗');
        }
        fetchComments();
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };

    onMounted(() => {
      fetchPost();
      fetchComments();
    });

    return {
      post,
      comments,
      newComment,
      submitComment,
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