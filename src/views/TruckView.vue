<template>
  <div v-if="!loading">
    <div class="row">
      <div class="col-md-4 col-4">
        <vs-button @click="$router.go(-1)" color="dark" type="flat"
          >← Back</vs-button
        >
      </div>
      <div class="col-md-8 col-8">
        <div class="text-right">
          <vs-button @click="updateTrack = true" color="dark" class="ml-5"
            >Update Device ID</vs-button
          >
          <vs-button 
          @click="disableTruck()"
          color="dark" 
          class="ml-5" 
          type="border">

          <label v-if="datacontent.status == '2'">
            Disable
          </label>

          <label v-else  >
           Enable
          </label>
          
          </vs-button>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="row">
        <div class="col-md-4">
          <vs-card style="min-height: 508px">
            <div class="p-3">
              <div class="mb-3">
                <p class="small font-light">Status</p>
                <h5 v-if="datacontent.status == '2'" class="text-success">
                  Enabled
                </h5>
                <h5 v-else class="text-danger">Disabled</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Manager</p>
                <h5 class="">{{ datacontent.manager_id }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">State</p>
                <h5 class="">{{ datacontent.state }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Plate number</p>
                <h5 class="">{{ datacontent.plate_number }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Truck type</p>
                <h5 class="">{{ datacontent.type }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Truck Unit</p>
                <h5 class="">{{ datacontent.si_unit }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Truck Capacity</p>
                <h5 class="">{{ datacontent.capacity }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Device ID</p>
                <h5 class="">{{ datacontent.device_id }}</h5>
              </div>
            </div>
          </vs-card>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <vs-card>
                <div class="p-3">
                  <div class="row">
                    <div class="col-9">
                      <h4 class="font-bold">{{ datacontent.name }}</h4>
                      <h5 class="mt-3 text-dark opacity-25">Truck Name</h5>
                    </div>
                    <div class="col-3">
                      <h4>
                        <feather-icon class="mr-1" icon="TrucksIcon" />
                      </h4>
                    </div>
                  </div>
                </div>
              </vs-card>
            </div>
            <div class="col-md-6">
              <vs-card>
                <div class="p-3">
                  <div class="row">
                    <div class="col-9">
                      <h4 class="font-bold">-</h4>
                      <h5 class="mt-3 text-dark opacity-25">Total Trips</h5>
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
          </div>
          <div>
            <GmapMap
              :center="{
                lat: 10.0,
                lng: 10.0,
              }"
              :zoom="7"
              style="width: 100%; height: 393px"
            >
              <GmapMarker
                :position="getPosition"
                :clickable="true"
                :draggable="true"
                @click="center = getPosition"
              />
            </GmapMap>
          </div>
        </div>
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

    <vs-popup
      class="addPopup"
      :title="`Update Tracker ID for ${datacontent.name}`"
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
    getPosition() {
      let position = {
        lat: this.datacontent.latitude,
        lng: this.datacontent.longitude,
      };
      return position;
    },
  },
  mounted() {
    this.getData();
    this.getBl();
  },
  data() {
    return {
      contents: [],
      datacontent: {},
      device_id: "",
      addData: false,
      updateTrack: false,
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
    submitFormTrackID() {
      this.$vs.loading();
      let data = {
        id: this.datacontent.id,
        device_id: this.device_id,
      };

      let apiData = {
        path: "admin/trucks/device-id",
        data,
      };
      this.$store
        .dispatch("update", apiData)
        .then((resp) => {
          this.$vs.loading.close();

          this.$vs.notify({
            title: "Tracker ID Update",
            text: "Successfully updated tracker ID",
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
              title: "Tracker ID Update",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Tracker ID Update",
              text: "Unable to Update tracker ID",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
    disableTruck(){
       let data ={
        id: this.datacontent.id,
        device_id: this.device_id,
       }

       let fetch = {
        path: `admin/trucks/${this.$route.params.id}/approve`,
        data
      };

       this.$store
        .dispatch("create", fetch)
        .then((resp) => {
          if(resp.data.status !== true){
            this.$vs.notify({
              title: "Warning:",
              text: resp.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
            return ;
          }

         // activated or other message
          this.$vs.notify({
            title: "Message",
            text: resp.data.message,
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });

        }).catch((err) => {
          try{
             this.$vs.notify({
              title: "Get Data",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          }catch(e){
             console.log(e);
          }
        });

    },
    getData() {
      this.$store.commit("pgLoading", true);
      let fetch = {
        path: `admin/trucks/${this.$route.params.id}`,
      };
      this.$store
        .dispatch("getContentsDetail", fetch)
        .then((resp) => {
        
          //get all the data from the response.
          let success  =  resp.data.status;
          let message  =  resp.data.message;
          let data     =  resp.data.data;

          if(success !== true){
            this.$vs.notify({
              title: "Error:",
              text: message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
            return false;
          }
          this.datacontent = data;
          console.log(this.datacontent);
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