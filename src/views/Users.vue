<template>
  <div v-if="!loading">
    <h3 class="font-bold d-inline">All Users</h3>

    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
            <p class="font-bold lead">All ({{ users.totalRecord }})</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="users.records"
            search
          >
            <template slot="thead">
              <vs-th> Name </vs-th>

              <vs-th> Email </vs-th>
              <vs-th> Phone </vs-th>
              <vs-th> Role </vs-th>
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].title">
                  <p
                    @click="viewUser(data[indextr].id)"
                    class="font-bold text-primary cursor-pointer"
                  >
                    {{ data[indextr].firstname }}
                    {{ data[indextr].lastname }}
                  </p>
                </vs-td>

                <vs-td :data="data[indextr].email">
                  <span class="text-small" v-html="data[indextr].email"></span>
                </vs-td>

                <vs-td :data="data[indextr].phone">
                  {{ data[indextr].phone }}
                </vs-td>
                <vs-td :data="data[indextr].role">
                  {{ data[indextr].role | capitalize }}
                </vs-td>

                <vs-td>
                  <vs-button
                    @click="viewUser(data[indextr].id)"
                    size="small"
                    class="mr-2 mb-2"
                    >View</vs-button
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-pagination
            v-if="users"
            class="mt-4"
            :total="Math.ceil(users.totalRecord / 10)"
            v-model="table_options.current_page"
          ></vs-pagination>
        </div>
      </vs-card>
    </div>
    <vs-sidebar
      position-right
      parent="body"
      default-index="1"
      color="primary"
      class="userSidebar"
      spacer
      v-model="viewBar"
    >
      <div class="header-sidebar px-2 pt-5" slot="header">
        <h4>{{ userPreview.firstname }} {{ userPreview.lastname }}</h4>
      </div>
      <div class="my-10 px-3">
        <vs-list-item
          class="mb-4"
          :title="userPreview.email"
          subtitle="Email address"
        ></vs-list-item>
        <vs-list-item
          class="mb-4"
          :title="userPreview.phone"
          subtitle="Phone number"
        ></vs-list-item>

        <vs-list-item
          class="mb-4"
          :title="userPreview.gender"
          subtitle="Gender"
        ></vs-list-item>
        <vs-list-item
          class="mb-4"
          :title="userPreview.children"
          subtitle="Children"
        ></vs-list-item>
        <vs-list-item
          class="mb-4"
          :title="userPreview.maternal"
          subtitle="Maternal"
        ></vs-list-item>
        <vs-list-item
          class="mb-4"
          :title="userPreview.role"
          subtitle="Role"
        ></vs-list-item>
      </div>
    </vs-sidebar>
  </div>
</template>
<script>
import UserSidebar from "./AppComponent/UserSidebar";
export default {
  computed: {
    loading() {
      return this.$store.getters.pgLoading;
    },
  },
  components: {
    UserSidebar,
  },
  mounted() {
    this.getBl();
  },
  data() {
    return {
      users: [],
      table_options: {
        current_page: 1,
      },
      userPreview: {},
      viewBar: false,
      delAct: "",
    };
  },
  watch: {
    "table_options.current_page": function () {
      this.getUsers(true);
    },
  },
  methods: {
    getBl() {
      this.$store.commit("pgLoading", true);
      this.getUsers(false);
    },
    viewUser(id) {
      this.$vs.loading();
      let userId = id;

      this.$store
        .dispatch("getUser", userId)
        .then((resp) => {
          this.$vs.loading.close();
          console.log(resp.data.data);
          this.userPreview = resp.data.data;
          this.viewBar = true;
        })
        .catch((err) => {
          this.$vs.loading.close();
          if (err.response) {
            this.$vs.notify({
              title: "Get user info",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get user info",
              text: "Unable to Get user info",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
    getUsers(divLoad) {
      if (divLoad) {
        this.$vs.loading({
          container: "#div-with-loading",
          scale: 0.6,
        });
      }
      let pageNo = this.table_options.current_page;
      this.$store
        .dispatch("getUsers", pageNo)
        .then((resp) => {
          this.users = resp.data;
          if (divLoad) {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Get Blogs",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get Blogs",
              text: "Unable to get blogs",
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