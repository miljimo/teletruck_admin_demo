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
          <!-- <vs-button color="dark" class="ml-5" type="border">Disable</vs-button>
          <vs-button
            @click="addData = true"
            color="dark"
            class="ml-5"
            type="filled"
            >Edit Material</vs-button
          > -->
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="row mb-10">
        <div class="col-3 col-md-2">
          <vs-avatar size="150px" :src="datacontent.images[0].file_url" />
        </div>
        <div class="col-9 col-md-6">
          <h2 class="mb-3">{{ datacontent.name }}</h2>
          <p class="font-light">
            {{ datacontent.description }}
          </p>
          <div class="mt-5">
            <p class="mb-2">
              <span class="font-bold">Category -</span>
              <span v-if="datacontent.category">{{
                datacontent.category.name
              }}</span
              >,
              <span class="font-bold">Unit -</span>
              <span v-if="datacontent.category">{{
                datacontent.category.si_unit
              }}</span>
            </p>

            <div v-if="datacontent.category">
              <p
                class="mb-2"
                style="
                  font-size: 12px;
                  text-transform: uppercase;
                  margin-top: 25px;
                "
              >
                Pricing
              </p>
              <vs-chip
                v-for="(pricing, index) in datacontent.category.pricing"
                :key="index"
                class="mr-2"
              >
                <span class="font-bold pr-1">Size - </span>
                {{ pricing.size }} -
                <span class="font-bold pr-1">Price - </span>
                {{ pricing.price | currency("₦", 0) }}
              </vs-chip>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2">
        <div class="mb-4">
          <p class="font-bold lead">All Orders ({{ contents.totalRecord }})</p>
        </div>

        <vs-table
          id="div-with-loading"
          max-items="10"
          :data="contents.records"
          search
        >
          <template slot="thead">
            <vs-th> Date </vs-th>
            <vs-th> Client </vs-th>
            <vs-th> Status </vs-th>
            <vs-th> Size</vs-th>
            <vs-th> Amount</vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].title">
                <router-link
                  :to="`/view-content/${data[indextr].id}`"
                  class="font-bold"
                >
                  {{ data[indextr].name }}</router-link
                >
              </vs-td>

              <vs-td :data="data[indextr].synopsis">
                <span class="text-small" v-html="data[indextr].synopsis"></span>
              </vs-td>
              <vs-td :data="data[indextr].pregnancy_week">
                {{ data[indextr].pregnancy_week }} - Week
              </vs-td>

              <!-- <vs-td :data="data[indextr].synopsis">
                  {{ data[indextr].synopsis }}
                </vs-td> -->

              <vs-td :data="data[indextr].id">
                <p class="text-small">Published</p>
                {{
                  moment
                    .utc(new Date(data[indextr].date_created))
                    .format("dddd, MMM Do 'YY")
                }}
              </vs-td>

              <vs-td>
                <vs-button
                  :to="`/edit-pregnancy-content/${data[indextr].id}`"
                  size="small"
                  class="mr-2 mb-2"
                  >Edit</vs-button
                >
                <vs-button
                  @click="deleteItem(data[indextr].id)"
                  size="small"
                  color="dark"
                  >Delete</vs-button
                >
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <vs-pagination
          v-if="contents"
          class="mt-4"
          :total="Math.ceil(contents.totalRecord / 10)"
          v-model="table_options.current_page"
        ></vs-pagination>
      </div>
    </div>

    <vs-popup
      class="addPopup"
      title="Add manager profile"
      :active.sync="addData"
    >
      <div>
        <form action="">
          <div class="my-3">
            <vs-input class="w-full" placeholder="First name" />
          </div>
          <div class="my-3">
            <vs-input class="w-full" placeholder="Last name" />
          </div>
          <div class="my-3">
            <vs-input class="w-full" placeholder="Email address" />
          </div>
          <div class="my-3">
            <vs-input class="w-full" placeholder="Phone number" />
          </div>
          <div class="mt-10">
            <vs-button color="dark" class="w-full my-3" type="filled"
              >Add manager profile</vs-button
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
    this.getData();
    this.getBl();
  },
  data() {
    return {
      contents: [],
      addData: false,
      datacontent: "",
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
    getData() {
      this.$store.commit("pgLoading", true);
      let fetch = {
        path: `admin/materials/${this.$route.params.id}`,
      };
      this.$store
        .dispatch("getContentsDetail", fetch)
        .then((resp) => {
          // console.log(resp.data.data);
          this.datacontent = resp.data.data;
          // console.log(this.datacontent);
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
          } else {
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