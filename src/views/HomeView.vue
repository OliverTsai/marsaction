<template>
  <div>
    <div>
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'about', params: { id: post.id } }">
          <div>
            <img :src="post.x_featured_media_medium" alt="Post Image" v-if="post.x_featured_media_medium" />
          </div>
          <div>
            {{ post.title.rendered }}
          </div>
          <div>發帖人：{{ post.x_author }}</div>
        </router-link>
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
      
      const timestamp = new Date().getTime();

      try {
        const response = await axios.get(`https://oliver0502api.com/wp-json/wp/v2/posts?categories=1&timestamp=${timestamp}`);
        posts.value = response.data;
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

<style lang="scss">

.bodyBd{
  display: flex;
	justify-content: center;
}

.bodyBox{
  width: 1200px;
	display: flex;
	justify-content: space-between;
}

// .bodyTitle{
//   display: flex;
//   justify-content: space-between;
//   padding: 1rem 0 1rem 0;
// }

// .bodyTitleBox{
//   display: flex;
//   gap:0.2rem;
// }

.bodyListBox{
  display: flex;
  align-items: center;
  // grid-template-columns: repeat(9, 1fr);
  // grid-gap: 10px; /* 设置列之间的间距 */
  font-size: 0.8rem; /*K*/
  padding: 3px 0px 3px 0px; /*K*/

  .bodyListRow{
    display: contents;
  }

  .bodyListLeft{
    text-align:end;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .bodyListRight{
    text-align:start;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .bodyListLive{
    color: red;
  }




}



.bodyListTitle{
  text-align: start;
  display: flex;
  // justify-content: space-between;
  background: #f1f1f1;
  // gap:0.8rem;
  border-radius: 4px;
  padding: 1px 0px 1px 5px;

  .bodyListTitle-fontSize{
    font-size: 0.9rem;
  }
  

  .titleRight{
    display: flex;
    justify-content: center;
    // width: 4.8rem;
  }
}

.pcListX{
  display: flex;
  justify-content: space-between;
}

// .timeBd{
//   padding: 1rem 0 1rem 1rem;

//   .timeBox{
//     display: flex;
//     flex-direction:column;

//     .timeText{
//       text-align: start;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//     }

//     .timeText.title{
//       background: #F2F2F2;
//     }
//   }
// }





.ColumnW8{
  width: 8%;
  font-size: 0.8rem;
  .W8-color{
    color: #f60;
  }
}

.ColumnW8.line{
  display: flex;
  gap:0.3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 1rem;
}

.ColumnW10{
  width: 10%;
  font-size: 0.8rem;
}
.ColumnW16{
  width: 16%;
  font-size: 0.8rem;
}
.ColumnW26{
  width: 26%;
  font-size: 0.8rem;
}
.ColumnW40{
  width: 40%;
  font-size: 0.8rem;
}
.ColumnW52{
  width: 52%;
  font-size: 0.8rem;
}

.ColumnCenter{
  text-align: center;
}


</style>
