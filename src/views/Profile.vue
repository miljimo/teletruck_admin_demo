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
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    // this.getBl();
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

  methods: {},
};
</script>