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

          <label v-if="current_truck.status == '2'">
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
         <!-- Truck Details Component Here -->
         <TruckDetailsComponent :truck="current_truck"
          :message="truck_meta.message"
         />

        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <vs-card>
                <div class="p-3">
                  <div class="row">
                    <div class="col-9">
                      <h4 class="font-bold">{{current_truck.name }}</h4>
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
                      <h4 class="font-bold">{{total_trips}}</h4>
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
          <vs-card>
              <GoogleMapViewer  
               :disabled="current_truck.status != '2'"
              :longitude="current_truck.longitude" 
              :name="current_truck.name"
              :iconUrl="trackerIcon"
              :latitude="current_truck.latitude"/>
          </vs-card>
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
      :title="`Update Tracker ID for ${current_truck.name}`"
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
          <div class="message-container" v-if="truck_meta.message !== ''">
            {{truck_meta.message}}
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

import GoogleMapViewer       from "./components/maps/GoogleMapViewer.vue";
import TruckDetailsComponent from "./components/TrucksComponent/TruckDetailsComponent.vue";
const markerIcon            = require("./../assets/images/truck.png");

export default {
  
  components:{
      GoogleMapViewer ,
       TruckDetailsComponent
  },
  computed: {
    current_truck(){  
      let truck = this.$store.getters.getCurrentTruck
      this.device_id = truck.device_id
      return truck 
    },
    truck_meta(){ 
       return this.$store.getters.getTruckMeta;
    },
  },
created(){
  this.fetchCurrentTruck();  
},
mounted() {
 this.updateTrackerContinuously()
},
data() {
    return {
      trackerIcon:markerIcon,
      loading:false,
      message:"",
      total_trips:0,     
      contents: [],   
      addData: false,
      updateTrack: false,
      device_id:0,
      table_options: {
        current_page: 1,
      },
      delAct: ""
    };
  },
  watch: {
     
  },
  methods: {
    update(){
       this.$forceUpdate()
    },
    updateTrackerContinuously(){
       this.$store.dispatch("pollTrackerDataFromServer", this.$route.params.id);
    },
    refreshPage(){
        setTimeout(() => {
            location.reload();
          }, 1000);
    },
    submitFormTrackID() {
      let playload = {
        id: this.current_truck.id,
        device_id:  this.device_id,
      };
      this.$store.dispatch("attachTruckTracker",playload)
    },
    disableTruck(){
       let data ={
        id: this.current_truck.id,
        device_id:  this.device_id,
       }

       let fetch = {
        path: `admin/trucks/${this.$route.params.id}/approve`,
        data
      };

       this.$store
        .dispatch("create", fetch)
        .then((resp) => {
        this.refreshPage()

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
   fetchCurrentTruck() {
      this.$store.dispatch("getTruckFromServer", this.$route.params.id)
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

<style scoped>
 .message-container{
   font-style:italic;
   display:block;
   color:red;
   text-align:center;

 }
</style>