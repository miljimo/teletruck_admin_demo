<template>
  <div>
    <div class="auth-wrapper auth-v2">
      <div class="row auth-inner m-0">
        <div class="d-none d-lg-flex align-items-center px-0 col-lg-6">
          <div
            class="w-100 d-lg-flex align-items-center justify-content-center"
            style="
              background-image: url(/img/truck.png);
              height: 100vh;
              background-size: cover;
            "
          ></div>
        </div>
        <div class="d-flex align-items-center auth-bg p-lg-5 col-lg-6 aligndiv">
          <div class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
            <div class="row">
              <div class="col-md-8">
                <div class="vx-card__title mb-12">
                  <h3 class="pb-10 font-bold">Sign In to Admin</h3>
                </div>
                <form class="mt-5">
                  <div>
                    <vs-input
                      name="email"
                      v-validate="'required'"
                      v-model="email"
                      icon-no-border
                      label-placeholder="Email"
                      class="w-full"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('email')"
                      >{{ errors.first("email") }}</span
                    >

                    <vs-input
                      type="password"
                      v-validate="'required'"
                      name="password"
                      v-model="password"
                      icon-no-border
                      label-placeholder="Password"
                      class="w-full mt-8"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('password')"
                      >{{ errors.first("password") }}</span
                    >

                    <div class="my-5">
                      <router-link to class="text-small text-dark"
                        >Forgot password?</router-link
                      >
                    </div>
                    <vs-button
                      color="dark"
                      @click.prevent="submitForm"
                      class="block mt-10 w-full"
                      >Sign in</vs-button
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      this.$vs.loading();
      this.$validator.validateAll().then((result) => {
        if (result) {
          let data = new FormData();

          data.append("email", this.email);
          data.append("password", this.password);

          this.$store
            .dispatch("login", data)
            .then((resp) => {
              this.$vs.loading.close();

              this.$vs.notify({
                title: "Login",
                text: "Successfully logged in",
                color: "success",
                icon: "verified_user",
                position: "bottom-center",
              });
              let token = resp.data.data.token;
              let user = JSON.stringify(resp.data.data);

              token = this.CryptoJS.AES.encrypt(
                token,
                this.$passPhrase
              ).toString();

              user = this.CryptoJS.AES.encrypt(
                user,
                this.$passPhrase
              ).toString();

              localStorage.setItem("token", token);
              localStorage.setItem("user", user);
              location.reload();

              // this.$router.push("/");
            })
            .catch((err) => {
              // console.log("Failed");
              this.$vs.loading.close();
              if (err.response) {
                this.$vs.notify({
                  title: "Login",
                  text: err.response.data.message,
                  color: "warning",
                  icon: "error",
                  position: "bottom-center",
                });
              } else {
                this.$vs.notify({
                  title: "Login",
                  text: "Unable to Login",
                  color: "dark",
                  icon: "error",
                  position: "bottom-center",
                });
              }
            });
        } else {
          // form have errors
        }
      });
    },
  },
};
</script>

<style lang="scss">
.toastification-close-icon[data-v-55dd3057],
.toastification-title[data-v-55dd3057] {
  line-height: 26px;
}
.toastification-title[data-v-55dd3057] {
  color: inherit;
}
.auth-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
}
.auth-wrapper .auth-inner {
  width: 100%;
  position: relative;
}
.auth-wrapper.auth-v1 {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
}
.auth-wrapper.auth-v1 .auth-inner:before {
  width: 244px;
  height: 243px;
  content: " ";
  position: absolute;
  top: -54px;
}

[dir="ltr"] .auth-wrapper.auth-v1 .auth-inner:before {
  left: -46px;
}
[dir="rtl"] .auth-wrapper.auth-v1 .auth-inner:before {
  right: -46px;
}
@media (max-width: 575.98px) {
  .auth-wrapper.auth-v1 .auth-inner:before {
    display: none;
  }
}
.auth-wrapper.auth-v1 .auth-inner:after {
  width: 272px;
  height: 272px;
  content: " ";
  position: absolute;
  bottom: -55px;
  z-index: -1;
}

[dir="ltr"] .auth-wrapper.auth-v1 .auth-inner:after {
  right: -75px;
}
[dir="rtl"] .auth-wrapper.auth-v1 .auth-inner:after {
  left: -75px;
}
@media (max-width: 575.98px) {
  .auth-wrapper.auth-v1 .auth-inner:after {
    display: none;
  }
}
.auth-wrapper.auth-v2 {
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}
.auth-wrapper.auth-v2 .auth-inner {
  height: 100vh;
  overflow-y: auto;
  height: calc(var(--vh, 1vh) * 100);
}
.auth-wrapper.auth-v2 .brand-logo {
  position: absolute;
  top: 2rem;
  z-index: 1;
}
[dir] .auth-wrapper.auth-v2 .brand-logo {
  margin: 0;
}
[dir="ltr"] .auth-wrapper.auth-v2 .brand-logo {
  left: 2rem;
}
[dir="rtl"] .auth-wrapper.auth-v2 .brand-logo {
  right: 2rem;
}
.auth-wrapper.auth-v1 .auth-inner {
  max-width: 400px;
}
.auth-wrapper .brand-logo {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
[dir] .auth-wrapper .brand-logo {
  margin: 1rem 0 2rem 0;
}
.auth-wrapper .brand-logo .brand-text {
  font-weight: 600;
}
[dir] .auth-wrapper .auth-footer-btn .btn {
  padding: 0.6rem !important;
}
[dir="ltr"] .auth-wrapper .auth-footer-btn .btn:not(:last-child) {
  margin-right: 1rem;
}
[dir="rtl"] .auth-wrapper .auth-footer-btn .btn:not(:last-child) {
  margin-left: 1rem;
}
@media (min-width: 1200px) {
  .auth-wrapper.auth-v2 .auth-card {
    width: 400px;
  }
}
[dir] .auth-wrapper .auth-bg {
  background-color: #fff;
}
[dir] .dark-layout .auth-wrapper .auth-bg {
  background-color: #283046;
}
.brand-logo svg {
  height: 28px;
  width: 40.95px;
}
html[dir="rtl"] svg.feather {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.aligndiv {
  align-items: center;
  display: flex;
  padding: 0px 55px;
}
</style>
