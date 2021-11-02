<template>
  <div>
    <div class="d-flex justify-content-between ">
      <h1><b>GARDEN</b></h1>
      <button v-on:click="navigateTo('/garden/create')" class="btn btn-success">
        <i class="fas fa-plus-square"></i>
        New Garden
      </button>
    </div>
    <br />
    <hr />
    <br />

    <div class="col-lg-12">
      <div class="all-blog-posts">
        <div class="row">
          <div
            class="col-lg-6"
            v-for="garden in gardens"
            v-bind:key="garden.id"
          >
            <div class="blog-post">
              <div class="blog-thumb" v-if="garden.thumbnail != 'null'">
                <img :src="BASE_URL + garden.thumbnail" alt="thumbnail" />
              </div>

              <div class="down-content">
                <span>{{ garden.title }}</span
                ><!-- ชื่อสวน -->
                <a><h4>{{ garden.thumbnail }}</h4></a><!-- ส่วนชื่อรูป -->
                <ul class="post-info">
                  <li><a>Admin</a></li>
                  <!-- อันนี้ไม่ต้องแก้ -->
                  <li><a>{{ garden.category }}</a></li>
                  <!-- อันนี้ส่วนวันเวลาที่ลง -->
                </ul>
                <p class="limit">
                  {{ garden.content }}
                </p>
                <div class="post-options">
                  <div class="row">
                    <div class="col-6">
                      <ul class="post-tags">
                        <i class="fas fa-tag" style="color:orange"></i>
                        <li>
                          <a>{{ garden.status }}</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-6">
                      <ul class="post-share">
                        <li>
                          <button
                            v-on:click="navigateTo('/garden/' + garden.id)"
                            class="btn btn-success"
                          >
                            <i class="fas fa-search-location"></i>
                          </button>

                          <button
                            v-on:click="navigateTo('/garden/edit/' + garden.id)"
                            class="btn btn-warning"
                          >
                            <i class="fas fa-edit"></i>
                          </button>

                          <button
                            v-on:click="deleteGarden(garden)"
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
import GardenService from "@/services/GardenService";

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      gardens: []
    };
  },
  async created() {
    this.gardens = (await GardenService.index()).data;
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
    async deleteGarden(garden) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await GardenService.delete(garden);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.gardens = (await GardenService.index()).data;
    }
  }
};
</script>
<style scoped>
.thumbnail-pic {
  width: 35%;
}
</style>
