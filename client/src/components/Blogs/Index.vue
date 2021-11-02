<template>
  <div>
    <h1><b>GARDEN INTRODUCTION</b></h1>
    <div class="d-flex justify-content-between ">
      <h4>Number of instructions {{ blogs.length }}</h4>
      <button v-on:click="navigateTo('/blog/create')" class="btn btn-success">
        <i class="fas fa-plus-square"></i>
        New blog
      </button>
    </div>
    <hr />
    <br />

 
          <div class="col-lg-12">
            <div class="all-blog-posts">
              <div class="row">

                  <div class="col-lg-4" v-for="blog in blogs" v-bind:key="blog.id">
                    <div class="blog-post">
                      <div class="blog-thumb" v-if="blog.thumbnail != 'null'">
                        <img
                          :src="BASE_URL + blog.thumbnail"
                          alt="thumbnail"
                        /><!-- แสดงรูป -->
                      </div>

                      <div class="down-content">
                        <span>{{ blog.title }}</span
                        ><!-- ชื่อหัวข้อ -->
                        <a><!-- <h4>{{ blog.thumbnail }}</h4> --></a
                        ><!-- ชื่อรูป -->
                        <ul class="post-info">
                          <li><a>Admin</a></li>
                          <li>
                            <a>{{ blog.category }}</a>
                          </li>
                          <!-- เวลา -->
                        </ul>
                        <p style="word-wrap:break-word;">
                          {{ blog.content }}
                        </p>
                        <!-- รายละเอียด -->

                        <div class="post-options">
                          <div class="row">
                            <div class="col-lg-12">
                              <ul
                                class="post-tags"
                                style=" display: flex; justify-content:center;"
                              >
                                <li>
                                  <button
                                    v-on:click="navigateTo('/blog/' + blog.id)"
                                    class="btn btn-success"
                                  >
                                    <i class="fas fa-search-location"></i>
                                  </button>

                                  <button
                                    v-on:click="
                                      navigateTo('/blog/edit/' + blog.id)
                                    "
                                    class="btn btn-warning"
                                  >
                                    <i class="fas fa-edit"></i>
                                  </button>

                                  <button
                                    v-on:click="deleteBlog(blog)"
                                    class="btn btn-danger"
                                  >
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

              </div>
            </div>
          </div>
      
  </div>
</template>
<script>
import BlogService from "@/services/BlogService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      blogs: []
    };
  },
  async created() {
    this.blogs = (await BlogService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login"
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogService.index()).data;
    }
  }
};
</script>
<style scoped>
.contan {
  display: flex;
  justify-content: center;
}
.main {
  width: auto;
  /*background: rgb(204, 204, 204);
    height: 100vh;*/
}
</style>
