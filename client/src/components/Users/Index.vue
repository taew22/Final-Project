<template>
  <div>
    <h1><B>USERs </B></h1>

    <div class="d-flex justify-content-between ">
      <h4>Number of user {{ users.length }}</h4>
      <button v-on:click="navigateTo('/user/create')" class="btn btn-success">
        <i class="fas fa-plus-square"></i>
        New User
      </button>
    </div>
    <hr />
    <br />

    <div class="col-lg-12">
      <div class="all-blog-posts">
        <div class="row">

          <div class="col-lg-4" v-for="user in users" v-bind:key="user.id">
            <div class="blog-post">
              <!-- <div class="blog-thumb" v-if="blog.thumbnail != 'null'">
                 <img
                          :src="BASE_URL + blog.thumbnail"
                          alt="thumbnail"
                        />
              </div> -->

              <div class="down-content con" style="background:#f7f7f7">
                <span>{{ user.id }}</span>

                <a>
                    <h4>{{ user.name }} - {{ user.lastname }}</h4>
                </a>

                <ul class="post-info">
                  <!-- <li><a>Admin</a></li>
                  <li></li>
                    <a>{{ blog.category }}</a>
                  </li> -->
                </ul>
                <p style="word-wrap:break-word;">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                  {{ user.email }} <br>
                  <i class="fa fa-key" aria-hidden="true"></i>
                  Hide<!-- {{ user.password}} -->
                </p>
                <!-- รายละเอียด -->

                <div class="post-options">
                  <div class="row">
                    <div class="col-lg-12">
                      <ul class="post-tags" style=" display: flex; justify-content:center;">
                        <li>
                          
                          <button
                            v-on:click="navigateTo('/user/'+ user.id)" class="btn btn-success">
                            <i class="fas fa-search-location"></i>
                          </button>

                          <button
                            v-on:click="navigateTo('/user/edit/'+ user.id)" class="btn btn-warning">
                            <i class="fas fa-edit"></i>
                          </button>

                          <button
                            v-on:click="deleteUser(user)" class="btn btn-danger" >
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
import UsersService from "@/services/UserService";

export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("Want To Delete?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>
<style scoped></style>
