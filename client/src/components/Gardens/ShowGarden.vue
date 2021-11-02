<template>
  <div>
    <!--  <p>id: {{ garden.id }}</p> -->

    <transition name="fade">
      <div v-if="garden.thumbnail != 'null'">
        <img :src="BASE_URL + garden.thumbnail" style="width:75%" />
      </div>
    </transition>
    <br />

    <div><h4>{{ garden.title }}</h4>{{ garden.status }}</div> <br>

    <p>{{ garden.content }}</p>

    <br />
    <hr>
    <p>
      <button v-on:click="navigateTo('/garden/edit/' + garden.id)"  class="btn btn-info">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        Edit
      </button>
      <router-link :to="{ name: 'gardens' }" class="btn btn-warning">
          <i class="fa fa-undo" aria-hidden="true"></i> 
          Back 
      </router-link>
    </p>
  </div>
</template>

<script>
import GardenService from "@/services/GardenService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      garden: null
    };
  },
  async created() {
    try {
      let gardenId = this.$route.params.gardenId;
      this.garden = (await GardenService.show(gardenId)).data;
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
<style scoped>
.thumbnail-pic {
  width: 35%;
}
</style>
