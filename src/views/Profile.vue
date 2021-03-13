<template>
  <div id="page-user-view">
    <div id="user-data">
      <vx-card class="mb-4 vs-con-loading__container" id="div-with-loading">
        <div class="mb-8">
          <h3>My Profile</h3>
        </div>
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img
                v-if="adminInfo.img"
                :src="'https://d2meuqd6gjekk6.cloudfront.net/'+adminInfo.imgx400"
                class="logowidth"
              />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">First Name</td>
                <td>{{adminInfo.firstName | capitalize}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Last Name</td>
                <td>{{adminInfo.lastName | capitalize}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email Address</td>
                <td>{{adminInfo.email}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Phone Number</td>
                <td>{{adminInfo.countryCode}}{{adminInfo.phoneNumber}}</td>
              </tr>
              <tr>
                <td class="font-semibold">Role</td>
                <td>{{adminInfo.type | capitalize}}</td>
              </tr>
            </table>
            <div class="vx-col w-full flex mt-5" id="account-manage-buttons">
              <vs-button
                icon-pack="feather"
                icon="icon-edit"
                class="mr-4"
                @click="$router.push({
                  path: '/update-admin-profile/'
                })"
              >Update Profile</vs-button>
              <vs-button
                color="dark"
                class="mr-4"
                @click="changePasswordPop = true;"
              >Change Password</vs-button>
            </div>
          </div>
        </div>
      </vx-card>

      <!-- Change Password -->
      <!-- Transaction Pop-up -->
      <vs-popup class="passwordPopup" title="Change Password" :active.sync="changePasswordPop">
        <form class="p-3">
          <div class>
            <vs-input
              type="password"
              v-validate="'required'"
              ref="password"
              label="Your Current Password"
              name="currentPassword"
              v-model="currentPassword"
              class="mt-4 w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('currentPassword')"
            >{{ errors.first('currentPassword') }}</span>
          </div>

          <div class>
            <vs-input
              type="password"
              v-validate="'required|min:6|max:20'"
              ref="password"
              label="Your New Password"
              name="password"
              v-model="password"
              class="mt-4 w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('password')"
            >{{ errors.first('password') }}</span>
          </div>

          <div class>
            <vs-input
              type="password"
              v-validate="'required|min:6|max:20|confirmed:password'"
              data-vv-as="password"
              label="Confirm New Password"
              name="confirm_password"
              v-model="confirm_password"
              class="mt-4 w-full"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('confirm_password')"
            >{{ errors.first('confirm_password') }}</span>
          </div>

          <vs-button
            ref="loadableButton"
            id="button-with-loading"
            type="filled"
            @click.prevent="submitForm"
            class="mt-8 mb-5 block w-full vs-con-loading__container"
          >Change Password</vs-button>
        </form>
      </vs-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminInfo: "",
      changePasswordPop: false,
      backgroundLoading: "primary",
      colorLoading: "#fff",
      password: "",
      currentPassword: "",
      confirm_password: "",
    };
  },
  components: {},
  computed: {},
  methods: {
    openLoadingInDiv() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
    },
    setloading() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45,
      });
    },
    changePassword() {
      this.setloading();
      let changePass = {
        currentPassword: this.currentPassword,
        confirmNewPassword: this.confirm_password,
        newPassword: this.password,
      };
      this.$store
        .dispatch("changePassword", changePass)
        .then((resp) => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
          this.currentPassword = "";
          this.confirm_password = "";
          this.password = "";
          this.changePasswordPop = false;

          this.$vs.notify({
            title: "Password",
            text: "Password Changed successfully!",
            color: "success",
          });
        })
        .catch((err) => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");

          if (err.response) {
            if (err.response.status == 400) {
              // console.log(err.response.data);
              this.$vs.notify({
                title: "Password",
                text: err.response.data,
                color: "warning",
              });
            } else {
              this.$vs.notify({
                title: "Password",
                text: "Unable to change password, try again!",
                color: "warning",
              });
            }
          } else {
            this.$vs.notify({
              title: "Password",
              text: "Unable to change password, try again!",
              color: "warning",
            });
          }
        });
    },
    submitForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.changePassword();
        } else {
          // form have errors
        }
      });
    },
  },
  mounted() {
    this.adminInfo = JSON.parse(localStorage.getItem("adminData"));

    // this.openLoadingInDiv();
  },
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
