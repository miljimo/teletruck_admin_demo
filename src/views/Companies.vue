<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Companies({{managers_meta.total}})</h3>
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
          <div class="error-container" v-if="has_error"> 
            <div><button @click="clearError">
               X
              </button></div>
            <ul>
              <li :key="index" v-for="(item, index) in error_messages">
                {{item}}
              </li>
             </ul>
          </div>
          <div class="mb-4">
            <p class="font-bold lead">Found ({{ managers_meta.total }})</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="managers"
            search
          >
            <template slot="thead">
              <vs-th>ID</vs-th>
              <vs-th> Created </vs-th>
              <vs-th> Company </vs-th>
              <vs-th> Manager </vs-th>
              <vs-th> Email address </vs-th>
              <vs-th> Phone</vs-th>
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  {{data[indextr].id}}
                </vs-td>
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
                    <span v-if="data[indextr].profile">
                      {{ data[indextr].profile.company_name }}</span
                    >
                  </router-link>
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
                    @click="toggleStatus(data[indextr].id)"
                    size="small"
                    color="dark"
                    class="mr-2 mb-2"
                    type="border">

                    <span v-if="isManagerEnable(data[indextr].status)">Deactivate</span>
                    <span v-else>Activate</span>
                  </vs-button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-pagination
            v-if="managers_meta"
            class="mt-4"
            :total="Math.ceil(managers_meta.total / 10)"
            v-model="table_options.current_page"
          ></vs-pagination>
        </div>
      </vs-card>
    </div>
    <vs-popup
      class="addPopup"
      title="Add Company profile"
      :active.sync="addData"
    >
      <div>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-12">
              <div class="py-3">
                <vs-input
                  class="w-full"
                  label-placeholder="Company name"
                  v-model="company_name"
                />
              </div>
            </div>
          </div>

          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Company address"
              v-model="company_address"
            />
          </div>
          <div>
            <div class="py-3">
              <div class="row">
                <div class="col-md-6">
                  <vs-input
                    class="w-full"
                    label-placeholder="Manager First name"
                    v-model="firstname"
                  />
                </div>
                <div class="col-md-6">
                  <vs-input
                    class="w-full"
                    label-placeholder="Manager Last name"
                    v-model="lastname"
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
                v-model="email"
              />
            </div>
          </div>
          <div>
            <div class="py-3">
              <vs-input
                max-length="11"
                class="w-full"
                label-placeholder="Manager Phone number"
                v-model="phone"
              />
            </div>
          </div>

          <div>
            <div class="py-3">
              <div class="row">
                <div class="col-md-6">
                  <vs-input
                    class="w-full"
                    label-placeholder="Password"
                    v-model="password"
                  />
                </div>
                <div class="col-md-6">
                  <vs-input
                    class="w-full"
                    label-placeholder="Confirm Password"
                    v-model="password_confirmation"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <vs-button
              @click="submitForm"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Add Company Profile</vs-button
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
  </div>
</template>
<script>import internal from "stream";

export default {

  computed: {
   
    loading() {
      return this.$store.getters.pgLoading;
    },
    managers(){
      return this.$store.getters.getManagers;
    },
    error_messages(){
      return this.$store.getters.getErrors;
    },
    managers_meta(){
      return this.$store.getters.getManagersMetadata;
    },
     has_error(){
        return (this.error_messages.length >  0)
     }
    
  },
  mounted() {
    this.getBl();   
  },
  data() {
    return {
      contents: [],
      addData: false,
      table_options: {
        current_page: 1,
      },
      editView: false,
      delAct: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      company_name: "",
      company_address: "",
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
    clearError(){
        this.$store.commit("clearErrors")
    },
    refreshPage(){
      setTimeout(() => {
            location.reload();
          }, 1000);
    },
    toggleStatus(id) {
      this.clearError();
      this.$store.dispatch("toggleManagerActivation", id);
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

    isManagerEnable(statusText){
       return (parseInt(statusText)  ===2);
    },
    getContents(divLoad) {
      let fetch = {
        path: "admin/managers",
        pageNo: this.table_options.current_page,
      };

      this.$store.dispatch("loadManagersFromServer", fetch);
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
            text: "Successfully updated",
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });
          this.refreshPage();
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
          } else {
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
    submitForm() {
      if (
        this.password !== this.password_confirmation &&
        this.password.length < 8
      ) {
        this.$vs.notify({
          icon: "error",
          color: "dark",
          position: "bottom-center",
          title: "Password mismatch or character length is less than 8",
          text: "check password again",
        });
      } else {
        this.$vs.loading();
        let data = new FormData();
        data.append("firstname", this.firstname);
        data.append("lastname", this.lastname);
        data.append("email", this.email);
        data.append("phone", this.phone);
        data.append("password", this.password);
        data.append("password_confirmation", this.password_confirmation);
        data.append("company_name", this.company_name);
        data.append("company_address", this.company_address);

        let apiData = {
          path: "admin/managers",
          data,
        };
        this.$store
          .dispatch("create", apiData)
          .then((resp) => {
            this.$vs.loading.close();

            this.$vs.notify({
              title: "Create Company Profile",
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
                title: "Create Company Profile",
                text: err.response.data.message,
                color: "warning",
                icon: "error",
                position: "bottom-center",
              });
            } else {
              this.$vs.notify({
                title: "Create Company Profile",
                text: "Unable to Create Company Profile",
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

<style scoped>
  .error-container{
    margin:0px;
    padding:5px;
    position:relative;
    background-color:#ffe6cc;
    border-radius:5px;
  }
  .error-container button{
    margin:0px;
    padding:5px;
    font-size:12px;
    font-weight: bold;
    border:0px;
    background-color:#ff9933;
    border-radius:4px;
    color: #fff2e6 ;
    cursor:pointer;
    float:right;

  }

  .error-container ul{
    margin:0px;
    padding:0px;
  }

.error-container ul li{
    margin:0px;
    padding:2px;
    font-style: italic;
    color:red !important;
    font-size:12px;
  }

</style>