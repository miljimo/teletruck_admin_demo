<template>
  <div v-if="!loading">
    <h3 class="font-bold d-inline">All Videos</h3>
    <vs-button to="/add-video" color="primary" class="ml-5" type="filled"
      >Add New</vs-button
    >
    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
            <p class="font-bold lead" v-if="videos.pagination">
              All ({{ videos.pagination.total_record }})
            </p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="videos.records"
            search
          >
            <template slot="thead">
              <vs-th> Title </vs-th>

              <vs-th> Synopsis </vs-th>
              <!-- <vs-th> Tags </vs-th> -->
              <vs-th> Date </vs-th>
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].title">
                  <p
                    @click="viewVideo(data[indextr])"
                    class="font-bold text-primary cursor-pointer"
                  >
                    {{ data[indextr].name }}
                  </p>
                </vs-td>

                <vs-td :data="data[indextr].synopsis">
                  <span
                    class="text-small"
                    v-html="data[indextr].synopsis"
                  ></span>
                </vs-td>

                <!-- <vs-td :data="data[indextr].synopsis">
                  {{ data[indextr].synopsis }}
                </vs-td> -->

                <vs-td :data="data[indextr].id">
                  <p class="text-small">Published</p>
                  {{
                    moment
                      .utc(new Date(data[indextr].date_created))
                      .format("dddd, MMM Do 'YY")
                  }}
                </vs-td>

                <vs-td>
                  <!-- <vs-button
                    :to="`edit-blog/${data[indextr].id}`"
                    size="small"
                    class="mr-2 mb-2"
                    >Edit</vs-button
                  > -->
                  <vs-button
                    @click="deleteItem(data[indextr].id)"
                    size="small"
                    color="dark"
                    >Delete</vs-button
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-pagination
            v-if="videos.pagination"
            class="mt-4"
            :total="Math.ceil(videos.pagination.total_record / 10)"
            v-model="table_options.current_page"
          ></vs-pagination>
        </div>
      </vs-card>

      <vs-popup :title="videoContent.name" :active.sync="videoPopup">
        <p class="text-small mb-2">
          {{ moment.utc(videoContent.date_created).format("dddd, MMM Do 'YY") }}
        </p>
        <p>
          <span v-html="videoContent.synopsis"></span>
        </p>
        <div class="my-10">
          <youtube
            style="width: 100%"
            player-width="100%"
            :video-id="viewPreviewID"
          ></youtube>
        </div>
      </vs-popup>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.pgLoading;
    },
  },
  mounted() {
    this.getBl();
  },
  data() {
    return {
      videoPopup: false,
      videoContent: {},
      videos: [],
      viewPreviewID: "",
      table_options: {
        current_page: 1,
      },
      delAct: "",
    };
  },
  watch: {
    "table_options.current_page": function () {
      this.getVideos(true);
    },
  },
  methods: {
    deleteItem(id) {
      this.delAct = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm Delete`,
        text: `Are you sure you want to delete this content`,
        accept: this.deleteFunc,
      });
    },
    viewVideo(video) {
      console.log(video);
      this.videoPopup = true;
      this.videoContent = video;
      this.viewPreviewID = this.$youtube.getIdFromURL(video.embed_link);
    },
    deleteFunc() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      let contID = this.delAct;
      this.$store
        .dispatch("deleteVideo", contID)
        .then((resp) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");

          this.videos.records.splice(
            this.videos.records.findIndex(function (i) {
              return i.id === contID;
            }),
            1
          );

          //   console.log(this.videos.records);

          this.$vs.notify({
            icon: "error",
            color: "dark",
            position: "bottom-center",
            title: "Content deleted",
            text: "Content was successfully deleted",
          });
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Delete content",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Delete content",
              text: "Unable to delete this content",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
    getBl() {
      this.$store.commit("pgLoading", true);
      this.getVideos(false);
    },

    getVideos(divLoad) {
      if (divLoad) {
        this.$vs.loading({
          container: "#div-with-loading",
          scale: 0.6,
        });
      }
      let pageNo = this.table_options.current_page;
      this.$store
        .dispatch("getVideos", pageNo)
        .then((resp) => {
          this.videos = resp.data;
          //   console.log(resp.data.data);
          if (divLoad) {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }
          this.videos = resp.data.data;

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Get videos",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get videos",
              text: "Unable to get videos",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },
  },
};
</script>