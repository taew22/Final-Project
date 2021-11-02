<template>
  <div>
    <header class="">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand"><h2>Land Scaping<em>.</em></h2></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item ">
                <router-link :to="{ name: 'gardens' }" class="nav-link"> Gardens </router-link>
                <span class="sr-only">(current)</span>
                <!-- <a class="nav-link" href="index.html">Garden</a> -->
              </li> 

              <li class="nav-item">
                <!-- <a class="nav-link" href="about.html">Blog</a> -->
                <router-link :to="{ name: 'blogs' }" class="nav-link"> Blogs </router-link>
              </li>

              <li class="nav-item">
                <!-- <a class="nav-link" href="blog.html">Comment</a> -->
                <router-link :to="{ name: 'comments' }" class="nav-link"> Comments</router-link>
              </li>
              
              <li class="nav-item">
                <!-- <a class="nav-link" href="post-details.html">Users</a> -->
                <router-link :to="{ name: 'users' }" class="nav-link"> Users </router-link>
              </li>

              <li class="nav-item">
                <!-- <a class="nav-link" href="contact.html">Sign in</a> -->
                <router-link :to="{ name: 'login' }" class="nav-link"> Login </router-link>
              </li>

              <li class="nav-item">
                <!-- <a class="nav-link" href="contact.html">Sign in</a> -->
                <a class="nav-link" v-on:click.prevent="logout">
                    <i class="fas fa-sign-out-alt" style="font-size:25px;"></i>
                </a> 
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
    
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
<style scoped>
.nv-navbar {
  background-color: palegoldenrod;
  width: 100%;
  padding: 0px 0px 0px 0px;
}
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.nv-navbar .nav li {
  float: left;
}
.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: gray;
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: darkslategrey;
}
.nv-navbar .nav li a.router-link-active {
  background-color: gold;
  color: darkolivegreen;
}
.clearfix {
  clear: left;
}
</style>
