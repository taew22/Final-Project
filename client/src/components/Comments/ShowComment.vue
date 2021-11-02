<template>
  <div>
    <h1><B>COMMENT</B></h1>
    <br />

    <transition name="fade">
      <div class="" v-if="comment.thumbnail != 'null'">
        <img
          :src="BASE_URL + comment.thumbnail"
          alt="thumbnail"
          style="width:45%;"
        />
      </div>
    </transition>
    <br />

    <p><B>Image Name :</B> {{ comment.thumbnail }}</p>
    <p><B>Name :</B> {{ comment.title }}</p>

    <p><B>Content :</B> {{ comment.content }}</p>
    <br />
    <hr />

    <p>
      <button class="btn btn-info" v-on:click="navigateTo('/comment/edit/' + comment.id)" >
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        Edit
      </button>
      <router-link :to="{ name: 'comments' }" class="btn btn-warning">
        <i class="fa fa-undo" aria-hidden="true"></i>
        Cancel
      </router-link>
    </p>
  </div>
</template>

<script>
import CommentsService from "@/services/CommentsService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      comment: null
    };
  },
  async created() {
    try {
      let commentId = this.$route.params.commentId;
      this.comment = (await CommentsService.show(commentId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style scoped></style>
