<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Materials (12)</h3>
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
      <!-- <div class="row">
        <div class="col-md-3">
          <vs-card>
            <div class="p-3">
              <div class="row">
                <div class="col-9">
                  <h4 class="font-bold">23</h4>
                  <p class="mt-3">Total Materials</p>
                </div>
                <div class="col-3">
                  <h4>
                    <feather-icon class="mr-1" icon="BoxIcon" />
                  </h4>
                </div>
              </div>
            </div>
          </vs-card>
        </div>

        <div class="col-md-3">
          <vs-card>
            <div class="p-3">
              <div class="row">
                <div class="col-9">
                  <h4 class="font-bold">Graphites</h4>
                  <p class="mt-3">Total Selling</p>
                </div>
                <div class="col-3">
                  <h4>
                    <feather-icon class="mr-1" icon="TrendingUpIcon" />
                  </h4>
                </div>
              </div>
            </div>
          </vs-card>
        </div>
      </div> -->
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
              <vs-th> Created </vs-th>
              <vs-th> Full name </vs-th>
              <vs-th> Email address </vs-th>
              <vs-th> Phone</vs-th>
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].id">
                  {{
                    moment
                      .utc(new Date(data[indextr].created_at))
                      .format("dddd, MMM Do 'YY")
                  }}
                </vs-td>
                <vs-td :data="data[indextr].firstname">
                  <router-link
                    :to="`/view-profile/${data[indextr].id}`"
                    class="font-bold"
                    style="align-items: center; display: flex"
                  >
                    <vs-avatar
                      class="mr-2"
                      :src="data[indextr].profile_photo_url"
                    />
                    {{ data[indextr].firstname }}
                    {{ data[indextr].lastname }}</router-link
                  >
                </vs-td>

                <vs-td :data="data[indextr].email">
                  <span class="text-small" v-html="data[indextr].email"></span>
                </vs-td>
                <vs-td :data="data[indextr].phone">
                  {{ data[indextr].phone }}
                </vs-td>

                <vs-td>
                  <vs-button
                    :to="`/view-profile/${data[indextr].id}`"
                    size="small"
                    class="mr-2 mb-2"
                    >View</vs-button
                  >
                  <vs-button
                    @click="deleteItem(data[indextr].id)"
                    size="small"
                    color="dark"
                    >Disable</vs-button
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-pagination
            v-if="contents"
            class="mt-4"
            :total="Math.ceil(contents.total / 10)"
            v-model="table_options.current_page"
          ></vs-pagination>
        </div>
      </vs-card>
    </div>
    <vs-popup class="addPopup" title="Add Material" :active.sync="addData">
      <div>
        <form @submit.prevent="submitForm">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter material name"
              v-model="name"
            />
          </div>

          <div class="py-3">
            <label class="text-small">Description</label>
            <vs-textarea class="w-full mb-0" v-model="description" />
          </div>

          <div class="py-3">
            <vs-select
              class="w-full"
              label="Select Category"
              v-model="category_id"
            >
              <vs-select-item
                v-for="(category, index) in categories"
                :key="index"
                :value="category.id"
                :text="`${category.name}`"
              />
            </vs-select>
          </div>

          <div class="py-3">
            <vs-input
              class="w-full mt-5"
              type="file"
              multiple
              accept="image/*"
              label="Material Images"
              @change="addImages($event)"
            />
          </div>

          <div class="mt-10">
            <vs-button
              @click="submitForm"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Add material</vs-button
            >
            <vs-button
              @click="addData = false"
              color="dark"
              class="w-full mb-2"
              type="flat"
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
    this.getCategories();
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
      name: "",
      size: "",
      description: "",
      price: "",
      images: [],
      category_id: "",
    };
  },
  watch: {
    "table_options.current_page": function () {
      this.getContents(true);
    },
  },
  methods: {
    getCategories() {
      let fetch = {
        path: "/admin/materials/category",
      };

      this.$store
        .dispatch("getContents", fetch)
        .then((resp) => {
          this.categories = resp.data.data;
          // console.log(resp.data.data);
          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Get Data",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get Data",
              text: "Unable to get Data",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },
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
        path: "admin/materials",
        pageNo: this.table_options.current_page,
      };

      this.$store
        .dispatch("getContents", fetch)
        .then((resp) => {
          // console.log(resp.data.data);
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
              title: "Get Data",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get Data",
              text: "Unable to get Data",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },
    addImages(event) {
      console.log(event.target.files);
      this.images = event.target.files;
      // for (var i = 0; i < event.target.files.length; ++i) {
      //   console.log(event.target.files[i]);
      //   this.images.push(event.target.files[i]);
      // }
      // console.log(this.images);
    },
    submitForm() {
      this.$vs.loading();
      let data = new FormData();
      data.append("name", this.name);
      data.append("description", this.description);
      data.append("category_id", this.category_id);
      data.append("images", this.images);

      let apiData = {
        path: "admin/materials",
        data,
      };
      this.$store
        .dispatch("create", apiData)
        .then((resp) => {
          this.$vs.loading.close();

          this.$vs.notify({
            title: "Create Material",
            text: "Successfully created new material",
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });

          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((err) => {
          this.$vs.loading.close();
          if (err.response) {
            this.$vs.notify({
              title: "Create Material",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Create Material",
              text: "Unable to Create Material",
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