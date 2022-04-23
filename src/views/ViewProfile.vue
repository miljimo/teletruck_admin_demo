<template>
  <div v-if="!loading">
    <div class="row">

      <div class="col-md-8 col-4">
        <vs-button @click="$router.go(-1)" color="dark" type="flat"
          >← Back</vs-button
        >
      </div>
      <div class="col-md-4 col-8">
        <div class="text-right">
          <vs-button
            @click="toggleStatus()"
            color="dark"
            class="ml-5"
            type="border"
          >
            <span v-if="datacontent.status_text == 'active'">Deactivate</span>
            <span v-else>Activate</span>
          </vs-button>
          <vs-button
            @click="editCompany"
            color="dark"
            class="ml-5"
            type="filled"
            >Edit profile</vs-button
          >
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="row mb-10" style="align-items: center">
        <div class="col-md-2">
          <vs-avatar size="150px" :src="datacontent.profile_photo_url" />
        </div>

        <div class="col-md-3" v-if="datacontent.profile">
          <p class="text-small mb-2 text-grey">Company Profile</p>
          <h2 class="mb-2">
            {{ datacontent.profile.company_name }}
          </h2>
          <p class="">
            <span class="text-underline text-black font-light text-small">{{
              datacontent.profile.office_address
            }}</span>
          </p>
        </div>

        <div class="col-md-3">
          <p class="text-small mb-2 text-grey">Manager Profile</p>
          <h2 class="mb-2">
            {{ datacontent.firstname }} {{ datacontent.lastname }}
          </h2>
          <p class="">
            <a
              class="text-underline text-black font-light text-small"
              :href="`mailto:${datacontent.email}`"
              >{{ datacontent.email }}</a
            >
          </p>
          <p class="">
            <a
              class="text-underline text-black font-light text-small"
              :href="`tel:${datacontent.phone}`"
              >{{ datacontent.phone }}</a
            >
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <vs-card>
            <div class="p-3">
              <div class="row">
                <div class="col-9">
                  <h4 class="font-bold">-</h4>
                  <p class="mt-3">Total Trips</p>
                </div>
                <div class="col-3">
                  <h4>
                    <feather-icon class="mr-1" icon="MapIcon" />
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
                  <h4 class="font-bold">-</h4>
                  <p class="mt-3">Total Trips</p>
                </div>
                <div class="col-3">
                  <h4>
                    <feather-icon class="mr-1" icon="TruckIcon" />
                  </h4>
                </div>
              </div>
            </div>
          </vs-card>
        </div>
      </div>

    
    </div>

    <vs-popup
      class="addPopup"
      title="Edit Company profile"
      :active.sync="editView"
    >
      <div>
        <form @submit.prevent="editProfile">
          <div class="row">
            <div class="col-md-12">
              <div class="py-3">
                <vs-input
                  class="w-full"
                  label-placeholder="Company name"
                  v-model="edit.company_name"
                />
              </div>
            </div>
          </div>

          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Company address"
              v-model="edit.company_address"
            />
          </div>

          <div>
            <div class="py-3">
              <div class="row">
                <div class="col-md-6">
                  <vs-input
                    class="w-full"
                    label-placeholder="Manager First name"
                    v-model="edit.firstname"
                  />
                </div>
                <div class="col-md-6">
                  <vs-input
                    class="w-full"
                    label-placeholder="Manager Last name"
                    v-model="edit.lastname"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="py-3">
              <vs-input
                class="w-full"
                label-placeholder="Manager Email"
                v-model="edit.email"
              />
            </div>
          </div>
          <div>
            <div class="py-3">
              <vs-input
                class="w-full"
                label-placeholder="Manager Phone number"
                v-model="edit.phone"
              />
            </div>
          </div>

          <div class="mt-10">
            <vs-button
              @click="editProfile"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Edit Company Profile</vs-button
            >
            <vs-button
              @click="editView = false"
              color="dark"
              class="w-full mb-2"
              type="flat"
              >Cancel</vs-button
            >
          </div>
        </form>
      </div>
    </vs-popup>
     <ManagerTruckComponent  :id ="this.$route.params.id"/>
  </div>
 

</template>
<script>
// Component Importations
import ManagerTruckComponent from './components/TrucksComponent/ManagerTruckComponent.vue';

export default {
    components: {
        ManagerTruckComponent
    },

    computed: {
        loading() {
            return this.$store.getters.pgLoading;
        },
    },
    mounted() {
        this.getData();
        this.getBl();
    },
    data() {
        return {
            contents: [],
            addData: false,
            table_options: {
                current_page: 1,
            },
            datacontent: {},
            delAct: "",
            editView: false,
            editData: {},
            edit: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                company_name: "",
                company_address: "",
                id: "",
            },
        };
    },
    watch: {
        "table_options.current_page": function () {
            this.getContents(true);
        },
    },
    methods: {
        editCompany() {
            this.editView = true;
            this.edit.id = this.datacontent.id;
            this.edit.firstname = this.datacontent.firstname;
            this.edit.lastname = this.datacontent.lastname;
            this.edit.email = this.datacontent.email;
            this.edit.phone = this.datacontent.phone;
            this.edit.company_name = this.datacontent.profile.company_name;
            this.edit.company_address = this.datacontent.profile.office_address;
        },
        editProfile() {
            this.$vs.loading();
            let data = new FormData();
            data.append("firstname", this.edit.firstname);
            data.append("lastname", this.edit.lastname);
            data.append("email", this.edit.email);
            data.append("phone", this.edit.phone);
            data.append("company_name", this.edit.company_name);
            data.append("company_address", this.edit.company_address);
            let apiData = {
                path: `/admin/managers/${this.edit.id}/update`,
                data,
            };
            this.$store
                .dispatch("create", apiData)
                .then((resp) => {
                this.$vs.loading.close();
                this.$vs.notify({
                    title: "Edit Company Profile",
                    text: "Successfully editted new profile",
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
                        title: "Edit Company Profile",
                        text: err.response.data.message,
                        color: "warning",
                        icon: "error",
                        position: "bottom-center",
                    });
                }
                else {
                    this.$vs.notify({
                        title: "Create Company Profile",
                        text: "Unable to edit Company Profile",
                        color: "dark",
                        icon: "error",
                        position: "bottom-center",
                    });
                }
            });
        },
        getData() {
            this.$store.commit("pgLoading", true);
            let fetch = {
                path: `admin/managers/${this.$route.params.id}`,
            };
            this.$store
                .dispatch("getContentsDetail", fetch)
                .then((resp) => {
                // console.log(resp.data.data);
                this.datacontent = resp.data.data;
                this.$store.commit("pgLoading", false);
            })
                .catch((err) => {
                if (err.response) {
                    this.$vs.notify({
                        title: "Get Data",
                        text: err.response.data.message,
                        color: "warning",
                        icon: "error",
                        position: "bottom-center",
                    });
                }
                else {
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
        toggleStatus() {
            this.$vs.loading({
                container: "#div-with-loading",
                scale: 0.6,
            });
            let id = this.$route.params.id;
            let data = {
                id,
            };
            let apiData = {
                path: `/admin/managers/${id}/toggle-status`,
                data,
            };
            this.$store
                .dispatch("create", apiData)
                .then((resp) => {
                this.$vs.loading.close();
                this.$vs.notify({
                    title: "Company status",
                    text: "Status changed successfully",
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
                        title: "Company status",
                        text: err.response.data.message,
                        color: "warning",
                        icon: "error",
                        position: "bottom-center",
                    });
                }
                else {
                    this.$vs.notify({
                        title: "Company status",
                        text: "Unable to Change status",
                        color: "dark",
                        icon: "error",
                        position: "bottom-center",
                    });
                }
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
                this.contents.records.splice(this.contents.records.findIndex(function (i) {
                    return i.id === contID;
                }), 1);
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
                }
                else {
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
        getAllManagerTrucks() {
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
            }).catch((err) => {
                alert(err);
                this.$vs.loading.close("#div-with-loading > .con-vs-loading");
                if (err.response) {
                    this.$vs.notify({
                        title: "Get Contents",
                        text: err.response.data.message,
                        color: "warning",
                        icon: "error",
                        position: "bottom-center",
                    });
                }
                else {
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
    components: { ManagerTruckComponent }
};
</script>