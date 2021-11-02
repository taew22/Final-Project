<template>
  <div>
    <h1><b>EDIT USER</b></h1>
    <br />

    <form v-on:submit.prevent ="editUser">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Name :</label>
          <input
            type="text"
            v-model="user.name"
            required
            class="form-control"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Lastname</label>
          <input
            type="text"
            v-model="user.lastname"
            required
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Email : </label>
        <input type="text" v-model="user.email" required class="form-control" />
      </div>
      <div class="form-group">
        <label>Password :</label>
        <input
          type="text"
          v-model="user.password"
          required
          class="form-control"
        />
      </div>
      <br />
      <hr />
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
import UsersService from '@/services/UserService'

    export default {
         data () {
            return{
            user:{
                name : '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },
    methods:{
        async editUser() {
            try {
                await UsersService.put(this.user)
                this.$router.push({
                    name: 'users'
                })
            } catch (error) {
                console.log(error)
            }
        },
        navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    },
      async created () { 
          try {
              let userId = this.$route.params.userId
              this.user = (await UsersService.show(userId)).data
            } catch (error) {
                console.log(error)
            }

}
    }

</script>
<style scoped>


</style>