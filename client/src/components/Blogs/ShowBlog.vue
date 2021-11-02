<template>
  <div>
    <h1>Show Blog</h1>
    <br>
    <!-- <p>id: {{ blog.id }}</p> -->
        <transition name="fade"> 
        <div class="" v-if="blog.thumbnail != 'null'">
          <img :src="BASE_URL+blog.thumbnail" alt="thumbnail" style="width:55%;">
        </div>
      </transition>
    <p><label>Title : </label> {{ blog.title }}</p>
    <!-- <p>ชื่อรูป: {{ blog.thumbnail }}</p> -->
    <!-- <p>pictures: {{ blog.pictures }}</p> -->
    <p><label>Content : </label> {{ blog.content }}</p>
    <p><label>Auther : </label> {{ blog.category }}</p>
    <p><label>Date : </label> {{ blog.status }}</p>
    <hr>

      <button v-on:click="navigateTo('/blog/edit/' + blog.id)"  class="btn btn-info">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        Edit
      </button>
      <router-link :to="{ name: 'blogs' }" class="btn btn-warning">
          <i class="fa fa-undo" aria-hidden="true"></i> 
          Back 
      </router-link>
    
  </div>
</template>

<script>
import BlogService from "@/services/BlogService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      blog: null,
    };
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>
