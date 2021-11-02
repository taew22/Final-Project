<template>
  <div>
    <h1>Edit Garden</h1>
    <br />

    <form v-on:submit.prevent="editGarden">
      <div class="form-group">
        <label>Title :</label>
        <input type="text" class="form-control" v-model="garden.title" />
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Garden type :</label>
          <select v-model="garden.status" class="form-control">
            <option disabled value="">Please select one</option>
            <option>สวนประดิษฐ์ [Formal styles]</option>
            <option>สวนธรรมชาติ (informal styles)</option>
            <option>สวนจินตนาการ (Imaginative Style)</option>
            <option>สวนนามธรรม (Abstract Style)</option>
          </select>
        </div>

        <div class="form-group col-md-6">
          <label>Set Time :</label>
          <input type="text" class="form-control" v-model="garden.category" />
        </div>
      </div>

      <p>
        <label> Content :</label>
        <vue-ckeditor
          v-model.lazy="garden.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($ecent)"
        />
      </p>
      <br />

      <!-- อัพรูปมา -->
      <form enctype="multipart/form-data" novalidate>
        <!-- กดอัพ -->
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <!-- <p v-if="isInitial || isSuccess"/> -->
          <p v-if="isInitial">
            Drag your files(s) <br />
            here to begin or click to browse
          </p>

          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
          <p v-if="isFailed">Upload Failed</p>
        </div>
        <br />
      </form>

      <!-- กดดัมรูป -->
      <div>
        <ul class="pictures">
          <transition-group tag="ul" name="fade" class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img
                style="margin-bottom: 5px"
                :src="BASE_URL + picture.name"
                alt="picture image"
              />
              <br />
              <P>
                <button
                  v-on:click.prevent="delFile(picture)"
                  class="btn btn-danger"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                  Delete
                </button>

                <button
                  v-on:click.prevent="useThumbnail(picture.name)"
                  class="btn btn-primary"
                >
                  <i class="fa fa-thumb-tack" aria-hidsden="true"></i>
                  Thumb
                </button>
              </P>
            </li>
          </transition-group>
        </ul>
      </div>
      <!-- โชว์รูป -->
      <transition name="fade">
        <div class="thumbnail-pic" v-if="garden.thumbnail != 'null'">
          <img :src="BASE_URL + garden.thumbnail" alt="thumbnail" />
        </div>
      </transition>

      <br>
      <hr>

      <!-- ปุ่ม -->
      <p>
        <button type="submit" class="btn btn-success">
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          Save
        </button>

        <router-link :to="{ name: 'gardens' }" class="btn btn-warning">
          <i class="fa fa-undo" aria-hidden="true"></i>
          Cancel
        </router-link>
      </p>

    </form>
  </div>
</template>

<script>
import GardenService from "@/services/GardenService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";


const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
          BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      //uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      garden: {
        title: "",
        thumbnail: "null",
        pictures: "null",  //pictues
        content: "",
        category: "",
        status: "",
      },
      config: {
      //  toolbar: [
      //    ["Bold", "Italic", "Underline", "Strike", "Subscript", "SuperScript"],
      //  ],
        height: 300,
      },
    };
  },
  methods: {
    async editGarden() {
      try {
        await GardenService.put(this.garden);
        this.$router.push({
          name: "gardens",
        });
      } catch (err) {
        console.log(err);
      }
    },

    onBlur (editor) {
          console.log(editor);
       },
          onFocus (editor) {
            console.log(editor);
          },

 created () {
      this.config.toolbar = [
        {
          name: "document",
          items: [
            "Source",
            "-",
            "Save",
            "NewPage",
            "Preview",
            "Print",
            "-",
            "Templates"
          ]
        },
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "PasteFrromWord",
            "-",
            "Undo",
            "Redo"
          ]
        },
        {
          name: "editing",
          items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
          },
        {
        name: "forms",
        items: [
          "From",
          "Checkbox",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
    },
    "/",
    {
        name: "basicstyles",
        items: [
          "Bold",
          "Itatic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
    },
    {
      name: "paragaph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language"
      ]
    },
    { name: "Links", items: ["Link", "Unlink", "Anchor"] },
    {
      name:"insert",
      items: [
        "Image",
        "Flash",
        "Table",
        "HorizontaRule",
        "Smiley",
        "PageBreak",
        "Iframe",
        "InsertPre"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"]},
    { name: "colors", items: ["TextColor", "BGColor"]},
    { name: "tools", items: ["Maximize", "ShowBlocks"]},
    { name: "about", items: ["About"]}

      ]
    },
    
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      //reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      //this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      //upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }

          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(filedName, fileList) {
      //handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      //append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(filedName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });

      //save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },

    //เรียกใช้ v-0n:cick.prevent ส่ง picture ไปลบ 
    async delFile (material){
      let result = confirm("Want to delete?")
      if (result) {
        let dataJSON = {
          "filename":material.name
        }

        await UploadService.delete(dataJSON)

        for (var i=0; i<this.pictures.length; i++){
          if(this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1)
            this.materialIndex--
            break
          }
        }
      }
    },

    /* thumbnail */
    useThumbnail (filename) {
      console.log(filename)
      this.garden.thumbnail = filename
    }
  },
  created() {
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    issaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },

  },

  
  components: {
    VueCkeditor
  },

  async created() {
    try {
      let gardenId = this.$route.params.gardenId;
      this.garden = (await GardenService.show(gardenId)).data;


    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>

</style>
