<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Material Categories</h3>
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
            <p class="font-bold lead">All Contents</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="contents"
            search
          >
            <template slot="thead">
              <vs-th> Date Created </vs-th>
              <vs-th> Name </vs-th>
              <vs-th> Unit </vs-th>
              <vs-th> Pricing </vs-th>
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

                <vs-td :data="data[indextr].si_unit">
                  <span class="text-small">
                    {{ data[indextr].si_unit | capitalize }}
                  </span>
                </vs-td>

                <vs-td>
                  <span class="text-small">
                    {{ data[indextr].pricing.length | capitalize }} Prices
                  </span>
                </vs-td>

                <vs-td>
                  <vs-button
                    @click="viewAllPrices(data[indextr])"
                    size="small"
                    class="mr-2 mb-2"
                    >View Prices</vs-button
                  >
                  <vs-button
                    @click="addCategoryPrice(data[indextr].id)"
                    size="small"
                    color="dark"
                    >Add Price</vs-button
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <!-- <vs-pagination
            v-if="contents"
            class="mt-4"
            :total="Math.ceil(contents.total / 10)"
            v-model="table_options.current_page"
          ></vs-pagination> -->
        </div>
      </vs-card>
    </div>
    <vs-popup class="addPopup" title="Add Category" :active.sync="addData">
      <div>
        <form @submit.prevent="submitForm">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Category name"
              v-model="category.name"
            />
          </div>

          <div class="py-3">
            <vs-select
              class="w-full"
              label="Select Unit"
              v-model="category.si_unit"
            >
              <vs-select-item value="tonne" text="Tonne" />
              <vs-select-item value="litre" text="Litre" />
            </vs-select>
          </div>
          <div
            style="
              border: 1px solid gainsboro;
              padding: 17px;
              border-radius: 9px;
              margin-top: 8px;
            "
          >
            <p>Add Pricing</p>
            <div class="py-1">
              <div class="row">
                <div class="col-md-4">
                  <vs-input
                    class="w-full"
                    label-placeholder="Size"
                    v-model="price.size"
                  />
                </div>
                <div class="col-md-5">
                  <vs-input
                    class="w-full"
                    type="number"
                    label-placeholder="Price"
                    v-model="price.price"
                  />
                </div>
                <div class="col-md-3 pl-0">
                  <vs-button
                    @click="addPricing()"
                    style="margin-top: 16px; height: 40px"
                    size="small"
                    color="dark"
                    class=""
                    >Add</vs-button
                  >
                </div>
              </div>
              <p
                style="font-size: 12px; margin-top: 13px; font-style: italic"
                v-if="category.pricings.length >= 1"
              >
                {{ category.pricings.length }} Pricing added
              </p>
            </div>
          </div>

          <div class="mt-10">
            <vs-button
              @click="submitForm"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Add Category</vs-button
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
      title="Add Category pricing"
      :active.sync="addCategoryPriceView"
    >
      <div>
        <form @submit.prevent="addPricee">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Size"
              v-model="addP.size"
            />
          </div>

          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Price"
              v-model="addP.price"
            />
          </div>

          <div class="mt-10">
            <vs-button
              @click="addPricee"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Add Pricing</vs-button
            >
            <vs-button
              @click="addCategoryPriceView = false"
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
                  <vs-button
                    @click="removePricing(pricing.id)"
                    size="small"
                    color="dark"
                    class="mr-2 mb-2"
                    type="border"
                  >
                    Remove
                  </vs-button>
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
  },
  data() {
    return {
      contents: [],
      addCategoryPriceView: false,
      categoryP: "",
      trucktype: "",
      addData: false,
      table_options: {
        current_page: 1,
      },

      delAct: "",
      name: "",
      type: "",
      state: "",
      manager_id: "",
      plate_number: "",
      capacity: "",
      si_unit: "",
      category: {
        name: "",
        si_unit: "",
        pricings: [],
      },
      price: {
        size: "",
        price: "",
      },
      addP: {
        size: "",
        price: "",
        id: "",
      },
      previewPop: false,
      viewPreview: {},
    };
  },
  watch: {
    "table_options.current_page": function () {
      this.getContents(true);
    },
  },
  methods: {
    addCategoryPrice(id) {
      this.addCategoryPriceView = true;
      this.addP.id = id;
    },
    viewAllPrices(category) {
      this.previewPop = true;
      this.viewPreview = category;
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
    removePricing(id) {
      let apiData = {
        path: `admin/materials/category/pricing/${id}/delete`,
      };
      this.$vs.loading();

      this.$store
        .dispatch("delContent", apiData)
        .then((resp) => {
          this.$vs.loading.close();

          this.$vs.notify({
            title: "Price deleted",
            text: "Successfully removed pricing",
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });

          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Pricing",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Delete pricing",
              text: "Unable to delete pricing",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
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

          this.contents.data.splice(
            this.contents.data.findIndex(function (i) {
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
    addPricing() {
      this.category.pricings.push({
        size: this.price.size,
        price: this.price.price,
      });
      this.price.size = "";
      this.price.price = "";
    },
    getContents(divLoad) {
      if (divLoad) {
        this.$vs.loading({
          container: "#div-with-loading",
          scale: 0.6,
        });
      }
      let fetch = {
        path: "admin/materials/category",
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
    addPricee() {
      this.$vs.loading();
      let data = new FormData();
      data.append("size", this.addP.size);
      data.append("price", this.addP.price);

      let apiData = {
        path: `admin/materials/category/pricing/${this.addP.id}`,
        data,
      };
      this.$store
        .dispatch("create", apiData)
        .then((resp) => {
          this.$vs.loading.close();

          this.$vs.notify({
            title: "Add New Pricing",
            text: "Successfully added new price",
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
              title: "New Pricing",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "New Pricing",
              text: "Unable to add new pricing",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
    submitForm() {
      if (this.category.pricings.length < 1) {
        this.$vs.notify({
          title: "Add Pricing",
          text: "To continue add at least 1 Pricing",
          color: "dark",
          icon: "error",
          position: "bottom-center",
        });
      } else {
        this.$vs.loading();
        let data = {
          name: this.category.name,
          si_unit: this.category.si_unit,
          pricings: this.category.pricings,
        };

        let apiData = {
          path: "admin/materials/category",
          data,
        };
        this.$store
          .dispatch("create", apiData)
          .then((resp) => {
            this.$vs.loading.close();

            this.$vs.notify({
              title: "Create Truck profile",
              text: "Successfully created new profile",
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
                title: "Create Truck",
                text: err.response.data.message,
                color: "warning",
                icon: "error",
                position: "bottom-center",
              });
            } else {
              this.$vs.notify({
                title: "Create Truck",
                text: "Unable to Create Truck",
                color: "dark",
                icon: "error",
                position: "bottom-center",
              });
            }
          });
      }
    },
  },
};
</script>