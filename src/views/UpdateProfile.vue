<template>
  <vs-card class="p-5">
    <a href="javascript:void()" @click="$router.go(-1)">← Back</a>
    <h4 class="inline-block ml-2">Update Admin Profile</h4>
    <div class="contained-example-container vs-con-loading__container" id="div-with-loading">
      <div class="vx-row">
        <div class="vx-col w-full lg:w-1/4 xl:w-1/4">
          <div class="churchimg">
            <div class="img-container mt-6 pt-4 text-center">
              <img v-if="imgpreview" :src="previewUrl" class="logowidth" />
              <div v-else>
                <img
                  v-if="adminImage"
                  :src="'https://d2meuqd6gjekk6.cloudfront.net/'+adminImage"
                  class="logowidth"
                />
              </div>
              <div class="mt-5">
                <div class v-if="imgpreview">
                  <vs-button
                    @click="saveImageUpload()"
                    color="warning"
                    type="filled"
                    class="mr-2 mb-2"
                  >Save Image</vs-button>
                  <vs-button @click="imgpreview = false" color="danger" type="flat">Cancel</vs-button>
                </div>
                <div v-else>
                  <input id="fileUpload" @change="handleFileChange($event)" type="file" hidden />
                  <vs-button
                    @click="changeImage()"
                    color="dark"
                    type="filled"
                    class="mr-2 mb-2"
                  >Change Image</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vx-col w-full lg:w-3/4 xl:w-3/4">
          <form class="mt-4">
            <div class="vx-row">
              <div class="vx-col w-1/2 pt-3">
                <vs-input
                  label-placeholder="First Name"
                  v-model="admin.firstName"
                  name="input1"
                  class="w-full mt-5"
                />
              </div>
              <div class="vx-col w-1/2 pt-3">
                <vs-input
                  label-placeholder="Last Name"
                  v-model="admin.lastName"
                  name="input1"
                  class="w-full mt-5"
                />
              </div>

              <div class="vx-col w-1/2 pt-3">
                <vs-input
                  label-placeholder="Country Code"
                  v-model="admin.countryCode"
                  name="input1"
                  class="w-full mt-5"
                />
              </div>

              <div class="vx-col w-1/2 pt-3">
                <vs-input
                  label-placeholder="Phone Number"
                  v-model="admin.phoneNumber"
                  name="input1"
                  class="w-full mt-5"
                />
              </div>
              <!-- <div class="vx-col w-1/2 pt-3">
                <vs-input
                  label-placeholder="Email"
                  v-model="admin.email"
                  name="input1"
                  type="email"
                  class="w-full mt-5"
                />
              </div>-->
            </div>
            <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">Update Profile</vs-button>
          </form>
        </div>
      </div>
    </div>
  </vs-card>
</template>
<script>
import vSelect from "vue-select";
export default {
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      imgpreview: false,
      adminImg: "",
      imageDataUpload: "",
      previewUrl: "",
      adminImage: "",
      adminType: ["admin", "accounting", "customerCare"],
      admin: {
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        img: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  mounted() {
    let adminData = JSON.parse(localStorage.getItem("adminData"));
    // console.log(adminData);
    this.admin = {
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      countryCode: adminData.countryCode,
      phoneNumber: adminData.phoneNumber,
    };
    this.adminImage = adminData.imgx400;
  },
  methods: {
    openLoadingInDiv() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
    },
    handleFileChange: function (event) {
      //   console.log(event.target.files[0]);
      const file = event.target.files[0];
      this.imageDataUpload = file;
      this.previewUrl = URL.createObjectURL(file);
      this.imgpreview = true;
      //   this.church.Logo = event.target.files[0];
    },
    saveImageUpload() {
      this.openLoadingInDiv();
      let profileImage = {
        image: this.imageDataUpload,
      };
      this.$store
        .dispatch("updateProfileImage", profileImage)
        .then((resp) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          this.resetAdminStorage();
          this.$vs.notify({
            title: "Profile Image",
            text: "Profile Image updated successfully!",
            color: "success",
          });
          this.imgpreview = false;
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            if (err.response.status == 400) {
              //        console.log(err.response.data);
              this.$vs.notify({
                title: "Profile Image",
                text: err.response.data,
                color: "warning",
              });
            } else {
              this.$vs.notify({
                title: "Profile Image",
                text: "Unable to edit profile image, try again!",
                color: "warning",
              });
            }
          } else {
            this.$vs.notify({
              title: "Profile Image",
              text: "Unable to edit profile image, try again!",
              color: "warning",
            });
          }
        });
    },

    changeImage() {
      document.getElementById("fileUpload").click();
      //   console.log(event.target.files[0]);
      //   this.church.Logo = event.target.files[0];
    },
    resetAdminStorage() {
      this.$store
        .dispatch("getAdmin")
        .then((resp) => {
          this.$router.go(0);
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        });
    },
    submitForm() {
      this.openLoadingInDiv();
      console.log(this.admin);
      let editAdmin = this.admin;
      this.$store
        .dispatch("editAdminAccount", editAdmin)
        .then((resp) => {
          //        console.log(resp.data);
          this.resetAdminStorage();
          this.$vs.notify({
            title: "Edit Admin Account",
            text: "Admin Account editted successfully!",
            color: "success",
          });
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");

          if (err.response) {
            if (err.response.status == 400) {
              //        console.log(err.response.data);
              this.$vs.notify({
                title: "Edit Admin Account",
                text: err.response.data,
                color: "warning",
              });
            } else {
              this.$vs.notify({
                title: "Edit Admin Account",
                text: "Unable to Update Profile, try again!",
                color: "warning",
              });
            }
          } else {
            this.$vs.notify({
              title: "Edit Admin Account",
              text: "Unable to Update Profile, try again!",
              color: "warning",
            });
          }
        });
    },
  },
};
</script>
