<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">My Profile</h3>
      </div>
    </div>

    <div class="mt-5">
      <div class="row">
        <div class="col-md-5">
          <vs-card>
            <div class="p-4">
              <vs-avatar
                size="150px"
                class="mb-5"
                src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
              />
              <h3>Adeniran Opeyemi</h3>
              <p>adeniran.opeyemi.ao@gmail.com</p>

              <div class="mt-10">
                <vs-button
                  @click="editprofile = true"
                  color="dark"
                  type="filled"
                  >Edit profile</vs-button
                >
                <vs-button
                  @click="changepassword = true"
                  color="dark"
                  class="ml-5"
                  type="border"
                  >Change password</vs-button
                >
              </div>
            </div>
          </vs-card>
        </div>
      </div>
    </div>

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
              v-model="value1"
            />
          </div>
          <div class="my-3">
            <vs-input
              class="w-full"
              type="password"
              placeholder="New password"
              v-model="value1"
            />
          </div>
          <div class="my-3">
            <vs-input
              class="w-full"
              type="password"
              placeholder="Confirm new password"
              v-model="value1"
            />
          </div>

          <div class="mt-10">
            <vs-button color="dark" class="w-full my-3" type="filled"
              >Change password</vs-button
            >
            <vs-button color="dark" class="w-full mb-2" type="flat"
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
              >Change password</vs-button
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
      changepassword: false,
      editprofile: false,
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
      //   this.$store.commit("pgLoading", true);
      //   this.getContents(false);
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