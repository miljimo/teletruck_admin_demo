<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-9 col-4">
        <h3 class="font-bold d-inline">Trucks</h3>
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
          <div class="mb-4">
            <p class="font-bold lead">All ({{ trucks_meta.total }})</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="trucks"
            search
          >
            <template slot="thead">
              <vs-th> Truck's Name </vs-th>
              <vs-th> Registered Date </vs-th>
              <vs-th> Truck type </vs-th>
              <vs-th> Truck State </vs-th>
              <vs-th> Plate number </vs-th>
              <vs-th> Device ID </vs-th>
              <vs-th> Action </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(tr, i) in data">

                 <vs-td :data="data[i].name">
                  <router-link
                    :to="`/truck/${data[i].id}`"
                    class="font-bold"
                  >
                    {{ data[i].name }}</router-link
                  >
                </vs-td>

                <vs-td :data="data[i].id">
                  {{
                    moment
                      .utc(new Date(data[i].created_at))
                      .format("dddd, MMM Do 'YY")
                  }}
                </vs-td>

               

                <vs-td :data="data[i].type">
                  <span class="text-small" v-html="data[i].type"></span>
                </vs-td>
                <vs-td :data="data[i].state">
                  <span class="text-small">{{
                    data[i].state | capitalize
                  }}</span>
                </vs-td>
                <vs-td :data="data[i].plate_number">
                  {{ data[i].plate_number }}
                </vs-td>
                <vs-td :data="data[i].device_id">
                  {{ data[i].device_id }}
                </vs-td>
                <vs-td>
                  <vs-button
                    :to="`/truck/${data[i].id}`"
                    size="small"
                    class="mr-2 mb-2"
                    >View</vs-button
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-pagination
            v-if="trucks_meta"
            class="mt-4"
            :total="Math.ceil(trucks_meta.total / 10)"
            v-model="table_options.current_page"
          ></vs-pagination>
        </div>
      </vs-card>
    </div>
    <vs-popup class="addPopup" title="Add Truck" :active.sync="addData">
      <div>
        <form @submit.prevent="submitForm">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Truck name"
              v-model="name"
            />
          </div>
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter truck type"
              v-model="type"
            />
          </div>

          <div class="py-3">
            <vs-select
              class="w-full"
              label="Select truck state"
              v-model="state"
            >
              <vs-select-item value="good" text="Good" />
              <vs-select-item value="bad" text="Bad" />
              <vs-select-item value="fair" text="Fair" />
            </vs-select>
          </div>

          <div class="py-3">
            <vs-select class="w-full" label="Select Unit" v-model="si_unit">
              <vs-select-item value="tonne" text="Tonne" />
              <vs-select-item value="litre" text="Litre" />
            </vs-select>
          </div>

          <div class="py-3">
            <vs-input
              class="w-full"
              type="number"
              label-placeholder="Enter Capacity"
              v-model="capacity"
            />
          </div>

          <div class="py-3">
            <vs-select
              class="w-full"
              label="Select Company"
              v-model="manager_id"
            >
              <vs-select-item
                v-for="(manager, index) in managers"
                :key="index"
                :value="manager.id"
                :text="`${manager.firstname} ${manager.lastname} `"
              />
            </vs-select>
          </div>
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter Plate number"
              v-model="plate_number"
            />
          </div>
          <div class="mt-10">
            <vs-button
              @click="submitForm"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Add truck</vs-button
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
      :title="`Update Tracker ID for ${activeTruck.name}`"
      :active.sync="updateTrack"
    >
      <div>
        <form @submit.prevent="submitFormTrackID">
          <div class="py-3">
            <vs-input
              class="w-full"
              label-placeholder="Enter tracker ID"
              v-model="device_id"
            />
          </div>
          <div class="mt-10">
            <vs-button
              @click="submitFormTrackID"
              color="dark"
              class="w-full my-3"
              type="filled"
              >Update track ID</vs-button
            >
            <vs-button
              @click="updateTrack = false"
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
    trucks(){
        return this.$store.getters.all_trucks;
    },
    trucks_meta(){
       return this.$store.getters.all_trucks_meta;
    }
  },
  created(){
    this.loadTrucks()
  },
  mounted() {
    this.getBl();
    
  },
  data() {
    return {
      trucktype: "",
      addData: false,
      table_options: {
        current_page: 1,
      },
  
      delAct: "",
      name: "",
      type: "",
      state: "",
      manager_id: "",
      plate_number: "",
      capacity: "",
      si_unit: "",
      activeTruck: {},
      updateTrack: false,
      device_id: "",
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
    updateTrackID(truck) {
      this.updateTrack = true;
      this.activeTruck = truck;
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

          this.contents.data.splice(
            this.contents.data.findIndex(function (i) {
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
    },
    loadTrucks() {
      let fetchCriteria = {
        path: "admin/trucks",
        pageNo: this.table_options.current_page,
      };
      this.$store.dispatch("loadTrucksFromServer", fetchCriteria)
    },
    submitForm() {
      this.$vs.loading();
      let data = new FormData();
      data.append("name", this.name);
      data.append("type", this.type);
      data.append("state", this.state);
      data.append("manager_id", this.manager_id);
      data.append("plate_number", this.plate_number);
      data.append("capacity", this.capacity);
      data.append("si_unit", this.si_unit);

      let apiData = {
        path: "admin/trucks",
        data,
      };
      this.$store
        .dispatch("create", apiData)
        .then((resp) => {
          this.$vs.loading.close();

          this.$vs.notify({
            title: "Create Truck profile",
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
              title: "Create Truck",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Create Truck",
              text: "Unable to Create Truck",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
  },
};
</script>