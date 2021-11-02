<template>
  <div>
    <h1><B>CREATE USER</B></h1>

    <br>

      <form v-on:submit.prevent = " createUser">

        
        <div class="form-group">
          <label>First name :</label>
          <input type="text" class="form-control" placeholder="First name" v-model="user.name" required>
        </div>
        <div class="form-group">
          <label>Last name :</label>
          <input type="text" class="form-control" placeholder="Last name" v-model="user.lastname" required>
        </div>
      
      <div class="row">
        <div class="col">
          <label>Email :</label>
          <input type="text" class="form-control" placeholder="Email" v-model="user.email" required>
        </div>
        <div class="col">
          <label>Password :</label>
          <input type="text" class="form-control" placeholder="Password" v-model="user.password" required>
          <small id="passwordHelpInline" class="text-muted">
            Must be 8-20 characters long.
          </small>
        </div>
      </div>
       <hr>


        <p>
        <button type="submit" class="btn btn-success">
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          Save
          </button>
      
        <router-link :to="{ name: 'users' }" class="btn btn-warning">
          <i class="fa fa-undo" aria-hidden="true"></i>
          Cancel
        </router-link>
        </p>

      </form>
  </div>
</template>
<script>
import UserService from '@/services/UserService'

export default{
  data () {
    return {
      user : {
        name : '',
        lastname : '',
        email : '',
        password : '',
        status : 'active'
      }
    }
  },
  methods: {
    async createUser () {
      try {
        await UserService.post(this.user)
          this.$router.push({
            name : 'users'
        })
      }catch (error) {
        console.log(error)
      }
    }
  },
}
</script>
<style scoped>

</style>
