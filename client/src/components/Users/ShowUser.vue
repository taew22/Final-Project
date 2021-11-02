<template>
  <div>
    <h1><B>SHOW USER</B></h1> <br>

    <div>id : {{ user.id }}</div>
    <div>ชื่อนามสกุล : {{ user.name }} - {{ user.lastname }}</div>
    <div>email : {{ user.email }}</div>
    <div>password : {{ user.password }}</div>
    
    <hr>
      <button v-on:click="navigateTo('/user/edit/' + user.id)"  class="btn btn-info">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        Edit
      </button>
      <router-link :to="{ name: 'users' }" class="btn btn-warning">
          <i class="fa fa-undo" aria-hidden="true"></i> 
          Back 
      </router-link>

  </div>
</template>
<script>
import UserService from "@/services/UserService";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UserService.show(userId)).data;
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
