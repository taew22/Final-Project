<template>
  <div>
    <h1><B>LOGIN</B></h1><br>

    <form v-on:submit.prevent="onLogin">

      <label>Username :</label> 
      <input type="text" v-model="email" placeholder="Enter your Username"><br>
      <label>Password :</label>
      <input type="password" v-model="password"  placeholder="Enter your password">
      <br>
      <hr>

      <p><button type="submit" class="btn btn-success"> 
        <i class="fas fa-sign-in-alt"></i>
        Login</button>
        </p>

      <div class="error" v-if="error">{{error}}</div>
    </form>
  </div>
</template>

<script>
import AuthenService from '@/services/AuthenService'

export default {
  data() {
    return {
      email:'',
      password:'',
      error: null
    };
  },
  methods: {
    async onLogin (){
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        });

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'gardens'
        })

      } catch(error) {
        console.log(error);
        this.error = error.response.data.error //ฟ้อง error ถ้าใส่รหัสผิด หรือรหัสไม่มีอยู่ในคลัง
        this.email = ''
        this.password = ''
      }
    },
  },
};
</script>
<style scoped>
  .error {
    color:red;
  }
</style>
