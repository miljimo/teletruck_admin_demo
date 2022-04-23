
<template>
<div>
    <div class="header">
      <h3 class="title-header">Total Trucks ({{trucks.length}}) </h3>
    </div>

    <div class="content">
         <vs-table
              id="div-with-loading"
              max-items="10"
              :data="trucks"
              search
            >
              <template slot="thead">
             
                <vs-th> Title </vs-th>
                <vs-th> Date Registered </vs-th>
                <vs-th> Truck type </vs-th>
                <vs-th> Status </vs-th>
                <vs-th> Plate number </vs-th>
                <vs-th> Tracker ID </vs-th>
                <vs-th> Action </vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="i" v-for="(tr, i) in data">
                <!-- Name -->
                 <vs-td :data="data[i].name">
                  <router-link
                    :to="`/truck/${data[i].id}`"
                    class="font-bold"
                  >{{ data[i].name }}</router-link>
                </vs-td>

                <!-- Date Registered -->
                <vs-td :data="data[i].id">
                  {{
                    moment
                      .utc(new Date(data[i].created_at))
                      .format("dddd, MMM Do 'YY")
                  }}
                </vs-td>

                <!-- Truck Type -->
                <vs-td :data="data[i].type">
                  <span class="text-small" v-html="data[i].type"></span>
                </vs-td>

                <!-- Truck Status -->
                <vs-td :data="data[i].state">
                  <span class="text-small">{{
                    data[i].state | capitalize
                  }}</span>
                </vs-td>

                 <!-- Truck Plate Number -->
                <vs-td :data="data[i].plate_number">
                  {{ data[i].plate_number }}
                </vs-td>

                 <!--Tracker ID-->
                <vs-td :data="data[i].device_id">
                  {{ data[i].device_id }}
                </vs-td>

                 <!-- Truck Operations -->
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
    </div>
  </div>  
</template>

<script>
   "use strict"

   export default{

     props:{
       id: Number
     },
      mounted(){
        console.log(this.manager)
        this.getManagerTrucks();
      },
      
      data(){
         return{
            trucks: new Array()
         }
      },

      methods:{
        getManagerTrucks(){
          let request = {
                      path: `/admin/managers/trucks/${this.id}`
                    };

      this.$store.dispatch("getContents", request)
        .then((response) => {
          if( (response.status != 200) || (response.data == null)){
            this.trucks = new Array();
          }
          // if the status did not complete display error message
          if (response.data.status != true){
            this.$vs.notify({
              title: "Error",
              text: response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
            return;
          }
         this.trucks = response.data.data.data;

        }).catch((err) => {
          //server log here
          console.log(err);

          if ( (err != null)  && (err.response != null)){
            this.$vs.notify({
                title: "Error",
                text: err.response.data.message,
                color: "warning",
                icon: "error",
                position: "bottom-center",
              });
          }
        });
      }
   }
}

</script>


<style scoped>
.header{
  margin:0px;
  padding:0px;
}
   .title-header{
      background-color: transparent;
      padding:10px;
      border-radius: 5px;

   }

</style>