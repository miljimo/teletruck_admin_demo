<template>
  <div v-if="!loading">
    <h3 class="font-bold d-inline">All Pregnancy Contents</h3>
    <vs-button
      to="/add-pregnancy-content"
      color="primary"
      class="ml-5"
      type="filled"
      >Add New</vs-button
    >
    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
            <p class="font-bold lead">All ({{ contents.totalRecord }})</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="contents.records"
            search
          >
            <template slot="thead">
              <vs-th> Title </vs-th>

              <vs-th> Synopsis </vs-th>
              <vs-th> Week </vs-th>
              <vs-th> Date </vs-th>
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].title">
                  <router-link
                    :to="`/view-content/${data[indextr].id}`"
                    class="font-bold"
                  >
                    {{ data[indextr].name }}</router-link
                  >
                </vs-td>

                <vs-td :data="data[indextr].synopsis">
                  <span
                    class="text-small"
                    v-html="data[indextr].synopsis"
                  ></span>
                </vs-td>
                <vs-td :data="data[indextr].pregnancy_week">
                  {{ data[indextr].pregnancy_week }} - Week
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
                  <vs-button
                    :to="`/edit-pregnancy-content/${data[indextr].id}`"
                    size="small"
                    class="mr-2 mb-2"
                    >Edit</vs-button
                  >
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
            v-if="contents"
            class="mt-4"
            :total="Math.ceil(contents.totalRecord / 10)"
            v-model="table_options.current_page"
          ></vs-pagination>
        </div>
      </vs-card>
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
      contents: [],
      table_options: {
        current_page: 1,
      },
      delAct: "",
    };
  },
  watch: {
    "table_options.current_page": function () {
      this.getContents(true);
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
    deleteFunc() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      let contID = this.delAct;
      this.$store
        .dispatch("delContent", contID)
        .then((resp) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");

          this.contents.records.splice(
            this.contents.records.findIndex(function (i) {
              return i.id === contID;
            }),
            1
          );

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
      this.getContents(false);
    },

    getContents(divLoad) {
      if (divLoad) {
        this.$vs.loading({
          container: "#div-with-loading",
          scale: 0.6,
        });
      }
      let fetch = {
        type: "pregnancy",
        pageNo: this.table_options.current_page,
      };

      this.$store
        .dispatch("getContents", fetch)
        .then((resp) => {
          this.contents = resp.data.data;

          if (divLoad) {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Get Contents",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get Contents",
              text: "Unable to get contents",
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