<template>
  <div v-if="!loading">
    <vs-card>
      <div class="p-3">
        <div class="mb-4">
          <vs-button
            @click="$router.back()"
            color="primary"
            class="font-weight-bold"
            type="flat"
          >
            <vs-icon icon="keyboard_arrow_left" class="mr-2"></vs-icon>
            Back</vs-button
          >
        </div>
        <div class="row">
          <div class="col-md-9">
            <div class="">
              <vs-input
                size="large"
                placeholder="Pregnancy Content Title"
                class="font-bold w-full"
                v-model="name"
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="text-right">
              <!-- <vs-button color="primary" type="border" class="mr-2">
                <vs-icon icon="visibility" class="mr-1"></vs-icon>
                Preview</vs-button
              > -->
              <vs-button @click="saveContent" color="primary" type="filled"
                >Save</vs-button
              >
            </div>
          </div>
        </div>
      </div>
    </vs-card>
    <div class="row">
      <div class="col-md-8">
        <vs-card class="mb-5">
          <div class="p-3">
            <div class="mb-10">
              <h4>Synopsis</h4>
              <!-- synopsis -->
              <quill-editor
                class="mt-5 smEditor"
                v-model="synopsis"
                :options="editorOption"
              >
                <div id="toolbar" slot="toolbar">
                  <!-- Add a bold button -->
                  <button class="ql-bold">Bold</button>
                  <button class="ql-italic">Italic</button>

                  <!-- Add font size dropdown -->
                  <select class="ql-size">
                    <option value="small" />
                    <!-- Note a missing, thus falsy value, is used to reset to default -->
                    <option selected />
                    <option value="large" />
                    <option value="huge" />
                  </select>

                  <select class="ql-font">
                    <option selected="selected" />
                    <option value="serif" />
                    <option value="monospace" />
                  </select>

                  <!-- Add subscript and superscript buttons -->
                  <button class="ql-script" value="sub" />
                  <button class="ql-script" value="super" />

                  <!-- You can also add your own -->
                </div>
              </quill-editor>
            </div>

            <div class="mb-5">
              <h4>Body</h4>
              <!-- synopsis -->
              <quill-editor class="mt-5 smEditor" v-model="body" />
            </div>
          </div>
        </vs-card>

        <vs-card class="mb-5">
          <div class="p-3">
            <div class="mb-5">
              <h4 class="mb-5">Baby</h4>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-5">
                    <p class="lead">Title</p>
                    <vs-input
                      v-model="your_baby.name"
                      class="w-full mt-2"
                      placeholder=""
                    />
                  </div>
                  <div class="mb-5">
                    <img
                      :src="your_baby.image"
                      class="mb-4"
                      alt=""
                      style="width: 100%; border-radius: 23px"
                    />
                    <p class="lead">Image</p>
                    <vs-input
                      class="w-full mt-2"
                      placeholder=""
                      type="file"
                      @change="addImage($event, 'babyImage')"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <p class="lead">Body</p>
                  <quill-editor
                    class="mt-5 smEditor"
                    v-model="your_baby.body"
                    :options="newOption"
                  >
                    <div id="nbar" slot="toolbar">
                      <!-- Add a bold button -->
                      <button class="ql-bold">Bold</button>
                      <button class="ql-italic">Italic</button>

                      <!-- Add font size dropdown -->
                      <select class="ql-size">
                        <option value="small" />
                        <!-- Note a missing, thus falsy value, is used to reset to default -->
                        <option selected />
                        <option value="large" />
                        <option value="huge" />
                      </select>

                      <select class="ql-font">
                        <option selected="selected" />
                        <option value="serif" />
                        <option value="monospace" />
                      </select>

                      <!-- Add subscript and superscript buttons -->
                      <button class="ql-script" value="sub" />
                      <button class="ql-script" value="super" />

                      <!-- You can also add your own -->
                    </div>
                  </quill-editor>
                </div>
              </div>
            </div>
          </div>
        </vs-card>

        <vs-card class="mb-5">
          <div class="p-3">
            <div class="mb-5">
              <h4 class="mb-5">Mother</h4>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-5">
                    <p class="lead">Title</p>
                    <vs-input
                      v-model="mother_body.name"
                      class="w-full mt-2"
                      placeholder=""
                    />
                  </div>
                  <div class="mb-5">
                    <img
                      :src="mother_body.image"
                      class="mb-4"
                      alt=""
                      style="width: 100%; border-radius: 23px"
                    />
                    <p class="lead">Image</p>
                    <vs-input
                      class="w-full mt-2"
                      placeholder=""
                      type="file"
                      @change="addImage($event, 'motherImage')"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <p class="lead">Body</p>
                  <quill-editor
                    class="mt-5 smEditor"
                    v-model="mother_body.body"
                    :options="newOptionMother"
                  >
                    <div id="newOptionMother" slot="toolbar">
                      <!-- Add a bold button -->
                      <button class="ql-bold">Bold</button>
                      <button class="ql-italic">Italic</button>

                      <!-- Add font size dropdown -->
                      <select class="ql-size">
                        <option value="small" />
                        <!-- Note a missing, thus falsy value, is used to reset to default -->
                        <option selected />
                        <option value="large" />
                        <option value="huge" />
                      </select>

                      <select class="ql-font">
                        <option selected="selected" />
                        <option value="serif" />
                        <option value="monospace" />
                      </select>

                      <!-- Add subscript and superscript buttons -->
                      <button class="ql-script" value="sub" />
                      <button class="ql-script" value="super" />

                      <!-- You can also add your own -->
                    </div>
                  </quill-editor>
                </div>
              </div>
            </div>
          </div>
        </vs-card>
      </div>
      <div class="col-md-4">
        <vs-card>
          <div class="p-3">
            <div class="mb-5">
              <p class="lead">Pregnancy Week</p>

              <vs-input
                class="mb-4 w-full"
                placeholder="Month"
                type="number"
                v-model="pregnancy_week"
              />
            </div>

            <div class="mb-5">
              <p class="lead">Maternal Status</p>

              <vs-select class="mb-4 w-full" v-model="maternal_id">
                <vs-select-item
                  :key="index"
                  :value="item.id"
                  :text="item.name"
                  v-for="(item, index) in maternalStatus"
                />
              </vs-select>
            </div>
            <div class="mb-5">
              <img
                :src="image"
                class="mb-4"
                alt=""
                style="width: 100%; border-radius: 23px"
              />

              <p class="lead">Banner image</p>

              <vs-input
                @change="addImage($event, 'image')"
                class="w-full mt-2"
                placeholder=""
                type="file"
              />
            </div>

            <div class="mb-5">
              <p class="lead">Baby Size image</p>
              <img
                :src="baby_size_image"
                class="mb-4"
                alt=""
                style="width: 100%; border-radius: 23px"
              />
              <vs-input
                @change="addImage($event, 'baby_size_image')"
                class="w-full mt-2"
                placeholder=""
                type="file"
              />
            </div>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  computed: {
    loading() {
      return this.$store.getters.pgLoading;
    },
  },
  data() {
    return {
      pregnancy_week: "",
      maternal_id: "",
      name: "",
      synopsis: "",
      body: "",
      image: "",
      baby_size_image: "",
      your_baby: {
        name: "",
        body: "",
        image: "",
      },
      mother_body: {
        name: "",
        image: "",
        body: "",
      },
      editorOption: {
        modules: {
          toolbar: "#toolbar",
        },
      },
      newOption: {
        modules: {
          toolbar: "#nbar",
        },
      },
      newOptionMother: {
        modules: {
          toolbar: "#newOptionMother",
        },
      },

      editorOption2: {
        modules: {
          toolbar: "#toolbar",
        },
      },
      content: ``,
      maternalStatus: [],
    };
  },
  mounted() {
    this.getContent();
    this.getStatus();
  },
  methods: {
    getContent() {
      this.$store.commit("pgLoading", true);
      let id = this.$route.params.id;

      this.$store
        .dispatch("getContent", id)
        .then((resp) => {
          this.content = resp.data.data;

          this.pregnancy_week = this.content.pregnancy_week;
          this.maternal_id = this.content.maternal_id;
          this.name = this.content.name;
          this.synopsis = this.content.synopsis;
          this.body = this.content.body;
          this.image = this.content.image;
          this.baby_size_image = this.content.baby_size_image;
          this.your_baby = this.content.your_baby;
          this.mother_body = this.content.mother_body;

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$store.commit("pgLoading", false);
        });
    },
    getStatus() {
      this.$store.commit("pgLoading", true);
      // this.$vs.loading();
      this.$store
        .dispatch("getMaternal")
        .then((resp) => {
          this.maternalStatus = resp.data;
          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$store.commit("pgLoading", false);
        });
    },
    getBase64(file, field) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (field == "image") {
          this.image = reader.result;
          console.log("Image");
        } else if (field == "baby_size_image") {
          this.baby_size_image = reader.result;
          console.log("Baby Image size");
        } else if (field == "babyImage") {
          this.your_baby.image = reader.result;
          console.log("Baby Image");
        } else if (field == "motherImage") {
          this.mother_body.image = reader.result;
          console.log("Mother Image");
        }
      };
      reader.onerror = (error) => {
        return false;
      };
    },
    addImage(event, field) {
      this.getBase64(event.target.files[0], field);
    },
    saveContent() {
      this.$vs.loading();
      let content = {
        path: "pregnancy",
        data: {
          content_id: parseInt(this.$route.params.id),
          pregnancy_week: parseInt(this.pregnancy_week),
          maternal_id: parseInt(this.maternal_id),
          name: this.name,
          synopsis: this.synopsis,
          body: this.body,
          image: this.image,
          baby_size_image: this.baby_size_image,
          your_baby: this.your_baby,
          mother_body: this.mother_body,
        },
      };

      this.$store
        .dispatch("editContent", content)
        .then((resp) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Edit Content",
            text: "Content editted successful",
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });
          // if (resp.data.status) {
          //   this.$vs.notify({
          //     title: "Add Blog",
          //     text: "New Blog added successful",
          //     color: "success",
          //     icon: "verified_user",
          //     position: "bottom-center",
          //   });
          // }
        })
        .catch((err) => {
          this.$vs.loading.close();
          if (err.response) {
            this.$vs.notify({
              title: "Edit Content",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Edit Content",
              text: "Unable to Edit content",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
  },
};
</script>