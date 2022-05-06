<template>
     <vs-card style="min-height: 508px">
            <div class="p-3">
              <div class="error-container" v-if='message != ""'> 
                <div><button @click="clearError">
                  X
                  </button></div>
                   <labeL> {{message}}</labeL>
                </div>

              <div class="mb-3">
                <p class="small font-light">Status</p>
                <h5 v-if="truck.status == '2'" class="text-success">
                  Enabled
                </h5>
                <h5 v-else class="text-danger">Disabled</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Manager</p>
                <h5 class="">{{truck.manager_id }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">State</p>
                <h5 class="">{{ truck.state }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Plate number</p>
                <h5 class="">{{truck.plate_number }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Truck type</p>
                <h5 class="">{{ truck.type }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Truck Unit</p>
                <h5 class="">{{ truck.si_unit }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Truck Capacity</p>
                <h5 class="">{{ truck.capacity }}</h5>
              </div>
              <div class="mb-3">
                <p class="small font-light">Device ID</p>
                <h5 class="">{{ truck.device_id }}</h5>
              </div>

               <div class="mb-3">
                <p class="small font-light">Longitude</p>
                <h5 class="">{{ truck.longitude }}</h5>
              </div>
               <div class="mb-3">
                <p class="small font-light">Latitude</p>
                <h5 class="">{{ truck.latitude }}</h5>
              </div>
              

               <div class="mb-3">
                <p class="small font-light">Last Update Date</p>
                <h5 class="">{{ truck.updated_at}}</h5>
              </div>

             
            </div>
          </vs-card>
</template>

<script>
   export default {

       props:{
           truck: Object,
           message:String
       },
       methods:{
         clearError:(function(e){
            this.message="";
         })
       }
   }
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

.error-container label{
    margin:0px;
    padding:2px;
    font-style: italic;
    color:rgb(150, 56, 19) !important;
    font-size:12px;
  }

</style>
