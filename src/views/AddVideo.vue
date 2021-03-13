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
                placeholder="Video Title"
                class="font-bold w-full"
                v-model="video.name"
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
              <h4>Embed Link</h4>
              <vs-input
                size="large"
                type="url"
                class="font-bold w-full mt-5"
                v-model="video.embed_link"
              />
            </div>
            <div class="mb-10">
              <h4>Synopsis</h4>
              <!-- synopsis -->
              <quill-editor
                class="mt-5 smEditor"
                v-model="video.synopsis"
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
          </div>
        </vs-card>
      </div>
      <div class="col-md-4">
        <vs-card>
          <div class="p-3">
            <div class="mb-5">
              <p class="lead">Maternal Status</p>

              <vs-select class="mb-4 w-full" v-model="video.maternal_id">
                <vs-select-item
                  :key="index"
                  :value="item.id"
                  :text="item.name"
                  v-for="(item, index) in maternalStatus"
                />
              </vs-select>
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
      video: {
        name: "",
        maternal_id: "",
        synopsis: "",
        embed_link: "",
      },
      name: "",
      maternal_id: "",
      tags: "",
      // album_id: "",
      synopsis: "",
      body: "",
      image: "",
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
      synopsis: "",
      body: "",
      content: ``,
      maternalStatus: [],
    };
  },
  mounted() {
    this.getStatus();
  },
  methods: {
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

    saveContent() {
      this.$vs.loading();
      let video = {
        name: this.video.name,
        maternal_id: parseInt(this.video.maternal_id),
        synopsis: this.video.synopsis,
        embed_link: this.video.embed_link,
      };
      this.$store
        .dispatch("addVideo", video)
        .then((resp) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Add Video",
            text: resp.data.message,
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });

          this.video.name = "";
          this.video.maternal_id = "";
          this.video.synopsis = "";
          this.video.embed_link = "";
        })
        .catch((err) => {
          this.$vs.loading.close();
          if (err.response) {
            this.$vs.notify({
              title: "Add Video",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Add Blog",
              text: "Unable to add new video",
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