<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Settings</h3>
      </div>
    </div>

    <div class="mt-5">
      <div class="row">
        <div class="col-md-5">
          <vs-card>
            <div class="p-4">
              <div class="row">
                <div class="col-md-3">
                  <vs-avatar
                    size="100px"
                    class="mb-5"
                    :src="user.profile_photo_url"
                  />
                </div>
                <div class="col-md-9">
                  <div class="col-md-9">
                    <h3 class="mb-2">{{ user.name }}</h3>
                    <p class="mb-2">{{ user.email }}</p>
                    <p class="text-small">{{ user.phone }}</p>
                    <vs-chip class="mt-3">
                      {{ user.user_type }}
                    </vs-chip>
                  </div>
                </div>
              </div>

              <div class="flex mt-10">
                <!-- <vs-button
                  @click="editprofile = true"
                  color="dark"
                  type="filled"
                  >Edit profile</vs-button
                > -->
                <vs-button
                  @click="changepassword = true"
                  color="dark"
                  type="border"
                  >Change password</vs-button
                >
                <vs-button
                  @click="addDeliveryPrice"
                  color="dark"
                  class="ml-5"
                  type="border"
                  >Add Delivery Price</vs-button
                >
              </div>
            </div>
          </vs-card>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
            <p class="font-bold lead">All Delivery Price</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="contents"
            search
          >
            <template slot="thead">
              <vs-th> Date Created </vs-th>
              <vs-th> Place </vs-th>
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

                <vs-td :data="data[indextr].price">
                  <span class="text-small">
                    {{ data[indextr].price | capitalize }}
                  </span>
                </vs-td>

                <vs-td>
                  <vs-button
                    @click="editDeliveryPrice(data[indextr].id)"
                    size="small"
                    class="mr-2 mb-2"
                    >Edit Price</vs-button
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

    <vs-popup
      class="addPopup"
      title="Add Category"
      :active.sync="addDeliveryPriceView"
    >
      <div>
        <form @submit.prevent="submitForm">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Location"
              v-model="addD.name"
            />
          </div>

          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="price"
              v-model="addD.price"
            />
          </div>

          <div class="mt-10">
            <vs-button
              @click="submitForm"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Add Price</vs-button
            >
            <vs-button
              @click="addDeliveryPriceView = true"
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
      title="Add Category"
      :active.sync="editDeliveryPriceView"
    >
      <div>
        <form @submit.prevent="editDPrice">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Location"
              v-model="editD.name"
            />
          </div>

          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="price"
              v-model="editD.price"
            />
          </div>

          <div class="mt-10">
            <vs-button
              @click="editDPrice"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Edit Price</vs-button
            >
            <vs-button
              @click="editDeliveryPriceView = true"
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
      title="Change password"
      :active.sync="changepassword"
    >
      <div>
        <form action="">
          <div class="my-3">
            <vs-input
              class="w-full"
              type="password"
              placeholder="Current password"
              v-model="form.current_password"
            />
          </div>
          <div class="my-3">
            <vs-input
              class="w-full"
              type="password"
              placeholder="New password"
              v-model="form.password"
            />
          </div>
          <div class="my-3">
            <vs-input
              class="w-full"
              type="password"
              placeholder="Confirm new password"
              v-model="form.password_confirmation"
            />
          </div>

          <div class="mt-10">
            <vs-button
              @click="changePasswordForm"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Change password</vs-button
            >
            <vs-button
              @click="changepassword = false"
              color="dark"
              class="w-full mb-2"
              type="flat"
              >Cancel</vs-button
            >
          </div>
        </form>
      </div>
    </vs-popup>

    <vs-popup class="addPopup" title="Edit profile" :active.sync="editprofile">
      <div>
        <form action="">
          <div class="my-3">
            <vs-input
              class="w-full"
              placeholder="First name"
              v-model="value1"
            />
          </div>
          <div class="my-3">
            <vs-input class="w-full" placeholder="Last name" v-model="value1" />
          </div>
          <div class="my-3">
            <vs-input
              class="w-full"
              type="email"
              placeholder="Email address"
              v-model="value1"
            />
          </div>

          <div class="my-3">
            <vs-input
              class="w-full"
              placeholder="Profile image"
              v-model="value1"
            />
          </div>

          <div class="mt-10">
            <vs-button color="dark" class="w-full my-3" type="filled"
              >Edit Profile</vs-button
            >
            <vs-button
              @click="editprofile = false"
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
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.getBl();
  },
  data() {
    return {
      contents: [],
      changepassword: false,
      editprofile: false,
      addDeliveryPriceView: false,
      editDeliveryPriceView: false,
      trucktype: "",
      addData: false,
      table_options: {
        current_page: 1,
      },
      delAct: "",
      form: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
      addD: {
        price: "",
        name: "",
      },
      editD: {
        price: "",
        id: "",
        name: "",
      },
    };
  },
  watch: {
    "table_options.current_page": function() {
      this.getContents(true);
    },
  },

  methods: {
    addDeliveryPrice() {
      this.addDeliveryPriceView = true;
    },
    editDeliveryPrice(id) {
      this.editDeliveryPriceView = true;
      this.editD.id = id;
    },

    editDPrice() {
      this.$vs.loading();
      let data = {
        price: this.editD.price,
        id: this.editD.id,
        name: this.editD.name,
      };

      let apiData = {
        path: `/admin/delivery-pricing/update`,
        method: "PUT",
        data: data,
      };

      this.$store
        .dispatch("update", apiData)
        .then((resp) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Price updated",
            text: "Successfully updated pricing",
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
              title: "Update pricing",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Update pricing",
              text: "Unable to update pricing",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },

    submitForm() {
      this.$vs.loading();
      let data = {
        price: this.addD.price,
        name: this.addD.name,
      };

      let apiData = {
        path: `/admin/delivery-pricing`,
        method: "POST",
        data: data,
      };

      this.$store
        .dispatch("create", apiData)
        .then((resp) => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Delivery Place created",
            text: "Successfully created delivery pricing",
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
              title: "create delivery pricing",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "create delivery pricing",
              text: "Unable to create delivery pricing",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },

    changePasswordForm() {
      if (this.form.password == this.form.password_confirmation) {
        this.$vs.loading();
        let data = this.form;

        let apiData = {
          path: "profile/update/password",
          data,
        };
        this.$store
          .dispatch("create", apiData)
          .then((resp) => {
            this.$vs.loading.close();

            this.$vs.notify({
              title: "Password update",
              text: "Successfully updated password",
              color: "success",
              icon: "verified_user",
              position: "bottom-center",
            });

            setTimeout(() => {
              this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
              });
            }, 1000);
          })
          .catch((err) => {
            this.$vs.loading.close();
            if (err.response) {
              this.$vs.notify({
                title: "Password update",
                text: err.response.data.message,
                color: "warning",
                icon: "error",
                position: "bottom-center",
              });
            } else {
              this.$vs.notify({
                title: "Password update",
                text: "Unable to update password",
                color: "dark",
                icon: "error",
                position: "bottom-center",
              });
            }
          });
      } else {
        this.$vs.notify({
          title: "Password mismatch",
          text: "Check the password and try again",
          color: "dark",
          icon: "error",
          position: "bottom-center",
        });
      }
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
        path: "/admin/delivery-pricing",
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
