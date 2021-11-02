<template>
  <div>
    <h2><b>COMMENTs</b></h2>
    <!-- <p><button v-on:click="logout">Logout</button></p> -->
    <div class="d-flex justify-content-between">
      <h4>Number of comment {{ comments.length }}</h4>
      <button
        v-on:click="navigateTo('/comment/create')"
        class="btn btn-success">
        <i class="fas fa-plus-square"></i>
        New comment
      </button>
    </div>
    <br><hr><br>

    <div class="col-lg-12">
      <div class="all-blog-posts">
        <div class="row">

          
            <div class="col-lg-4" v-for="comment in comments" v-bind:key="comment.id">
              <div class="blog-post">
                <div class="blog-thumb" v-if="comment.thumbnail != 'null'">
                  <img :src="BASE_URL + comment.thumbnail"/>
                </div>

                <div class="down-content">
                  <span>{{ comment.title }}</span>
                  <!-- <a ><h4>Donec tincidunt leo</h4></a> -->
                  <ul class="post-info">
                    <li><a>Admin</a></li>
                  </ul>
                  <p style="word-wrap:break-word;">
                    {{ comment.content }}
                  </p>
                  <div class="post-options">
                    <div class="row">
                      <div class="col-lg-12">
                        <ul class="post-share" style="text-align: center;">
                          <li>
                            <button
                            v-on:click="navigateTo('/comment/' + comment.id)"
                            class="btn btn-success" >
                            <i class="fas fa-search-location"></i>
                          </button>

                          <button
                            v-on:click="navigateTo('/comment/edit/' + comment.id)"
                            class="btn btn-warning" >
                            <i class="fas fa-edit"></i>
                          </button>

                          <button
                            v-on:click="deleteComment(comment)"
                            class="btn btn-danger" >
                            <i class="fas fa-trash-alt"></i>
                          </button>

                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- endmethod -->

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CommentsService from "@/services/CommentsService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      comments: [],
    };
  },
  async created() {
    this.comments = (await CommentsService.index()).data;
  },

  methods: {
    logout() {
      this.$store.dispatch("setTkoen", null);
      this.$store.dispatch("setComment", null);
      this.$router.push({
        name: "login",
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },

    async deleteComment(comment) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await CommentsService.delete(comment);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.comments = (await CommentsService.index()).data;
    },
  },
};
</script>
<style scoped></style>
