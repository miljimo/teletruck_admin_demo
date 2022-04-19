<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Materials</h3>
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
            <p class="font-bold lead">All</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="contents.data"
            search
          >
            <template slot="thead">
              <vs-th> Created </vs-th>
              <vs-th> Name </vs-th>
              <vs-th> Category </vs-th>
              <vs-th> SI Unit </vs-th>
              <vs-th> Pricing</vs-th>
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
                <vs-td :data="data[indextr].name">
                  <span
                    @click="viewAllPrices(data[indextr])"
                    class="font-bold text-primary"
                  >
                    {{ data[indextr].name }}</span
                  >
                </vs-td>

                <vs-td
                  v-if="data[indextr].category"
                  :data="data[indextr].category.name"
                >
                  <span class="text-small">
                    {{ data[indextr].category.name | capitalize }}
                  </span>
                </vs-td>

                <vs-td
                  v-if="data[indextr].category"
                  :data="data[indextr].category.si_unit"
                >
                  <span class="text-small">
                    {{ data[indextr].category.si_unit | capitalize }}
                  </span>
                </vs-td>

                <vs-td v-if="data[indextr].category">
                  <span class="text-small">
                    {{ data[indextr].category.pricing.length | capitalize }}
                    Prices
                  </span>
                </vs-td>

                <vs-td>
                  <vs-button
                    @click="viewAllPrices(data[indextr].category)"
                    size="small"
                    class="mr-2 mb-2"
                    >View Prices</vs-button
                  >
                  <vs-button
                    :to="`/material/${data[indextr].id}`"
                    size="small"
                    color="dark"
                    >View Material</vs-button
                  >
                  <vs-button
                    @click="editData = true"
                    size="small"
                    class="ml-2 mb-2"
                    >Edit Material</vs-button
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

    <vs-popup
      class="addPopup"
      :title="`Pricing for ${viewPreview.name}`"
      :active.sync="previewPop"
    >
      <div>
        <div class="py-3">
          <div
            v-for="(pricing, index) in viewPreview.pricing"
            :key="index"
            style="
              border-bottom: 1px solid gainsboro;
              padding-bottom: 6px;
              margin-bottom: 16px;
            "
          >
            <div class="row">
              <div class="col-md-7">
                <p class="text-small mb-1 text-gray">
                  Size - {{ pricing.size }}
                </p>
                <p>{{ pricing.price | currency("₦", 0) }}</p>
              </div>
              <div class="col-md-5">
                <div class="text-right">
                  <!-- <vs-button
                    @click="removePricing(pricing.id)"
                    size="small"
                    color="dark"
                    class="mr-2 mb-2"
                    type="border"
                  >
                    Remove
                  </vs-button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <vs-button
            @click="previewPop = false"
            color="dark"
            class="w-full mb-2"
            type="flat"
            >Cancel</vs-button
          >
        </div>
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
      categories: [],
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
      previewPop: false,
      viewPreview: {},
    };
  },
  watch: {
    "table_options.current_page": function() {
      this.getContents(true);
    },
  },
  methods: {
    viewAllPrices(category) {
      this.previewPop = true;
      this.viewPreview = category;
    },

    getCategories() {
      let fetch = {
        path: "/admin/materials/category",
      };

      this.$store
        .dispatch("getContents", fetch)
        .then((resp) => {
          this.categories = resp.data.data;

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
            this.contents.records.findIndex(function(i) {
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
      // console.log(event.target.files);
      // this.images = event.target.files;
      for (var i = 0; i < event.target.files.length; ++i) {
        this.images.push(event.target.files[i]);
      }
    },
    submitForm() {
      this.$vs.loading();
      let data = new FormData();
      data.append("name", this.name);
      data.append("description", this.description);
      data.append("category_id", this.category_id);
      // data.append("images[]", this.images);
      for (let i = 0; i < this.images.length; i++) {
        data.append("images[]", this.images[i]);
      }

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
