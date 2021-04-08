<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Invoices</h3>
      </div>
      <div class="col-md-3 col-8">
        <div class="text-right">
          <vs-button
            @click="addData = true"
            color="dark"
            class="ml-5"
            type="filled"
            >Add New</vs-button
          >
        </div>
      </div>
    </div>

    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
            <p class="font-bold lead">All ({{ contents.total }})</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="contents.data"
            search
          >
            <template slot="thead">
              <vs-th> Date </vs-th>
              <vs-th> Invoice ID </vs-th>
              <vs-th> Status </vs-th>
              <vs-th> Client </vs-th>
              <vs-th> Manager </vs-th>
              <vs-th> Amount </vs-th>
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
    <vs-popup class="addPopup" title="Add Truck" :active.sync="addData">
      <div>
        <form action="">
          <div class="my-3">
            <vs-input class="w-full" placeholder="Enter plate number" />
          </div>
          <div class="my-3">
            <vs-select class="w-full" label="Select truck type">
              <vs-select-item :value="'flatbed'" :text="'Flatbed'" />
            </vs-select>
          </div>

          <div class="my-3">
            <vs-select class="w-full" label="Select truck state">
              <vs-select-item :value="'Goodmode'" :text="'Good mode'" />
            </vs-select>
          </div>

          <div class="my-3">
            <vs-select class="w-full" label="Select manager">
              <vs-select-item :value="'kabiru'" :text="'Kabiru Salam'" />
            </vs-select>
          </div>

          <div class="mt-10">
            <vs-button color="dark" class="w-full my-3" type="filled"
              >Add truck</vs-button
            >
            <vs-button color="dark" class="w-full mb-2" type="flat"
              >Cancel</vs-button
            >
          </div>
        </form>
      </div>
    </vs-popup>
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
      trucktype: "",
      addData: false,
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
        path: "admin/invoices",
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