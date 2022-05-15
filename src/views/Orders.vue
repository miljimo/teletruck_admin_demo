<template>
  <div>
    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
           
            <p class="font-bold lead">Orders ({{orders.length}})</p>
             <div class="container button-panel">
              <ul>
                <li> <input type="button" value="Create" /></li>
                <li>  <input type="button" value="Delete" /></li>
                <li>  <input type="button" value="Modified" /></li>
              </ul>
            </div>
          </div>
          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="orders"
            search
          >
            <template slot="thead">
              <vs-th> S/N </vs-th>
              <vs-th> Created </vs-th>
              <vs-th> Order ID </vs-th>
              <vs-th> Material </vs-th>
              <vs-th> Creator </vs-th>
              <vs-th>Total Amount</vs-th>
              <vs-th> Order Status</vs-th>
              <vs-th> </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(tr, i) in data" class="table-row-container">
              <vs-td>
                  <div class="select-order-container">
                      <label>{{i+1}}</label>
                      <input type="checkbox" 
                            :value="data[i].id" 
                            :id="data[i].uuid"
                            @change="selectTableRowCheckBox($event)" 
                            :checked="isChecked(data[i].id)" />
                  </div>
              </vs-td>
                <vs-td :data="data[i].id">
                  {{
                    moment
                      .utc(new Date(data[i].created_at))
                      .format("dddd, MMM Do 'YY")
                  }}
                </vs-td>
                <vs-td :data="data[i].order_number">
                  <span class="font-bold">
                    {{ data[i].order_number }}</span
                  >
                </vs-td>

                <vs-td
                  v-if="data[i].material"
                  :data="data[i].material.name"
                >
                  <span class="text-small">
                    {{ data[i].material.name}}
                  </span>
                </vs-td>

                <vs-td :data="data[i].owner.firstname">
                  <span class="text-small">
                    {{ data[i].owner.firstname }}
                    {{ data[i].owner.lastname  }}
                  </span>
                </vs-td>
                <vs-td>               
                  <label>N{{data[i].total_amount}}</label>
                </vs-td >

                <vs-td>               
                  <label>{{upperCase(data[i].order_status_text)}}</label>
                </vs-td >
                <vs-td>
                      <vs-button
                      :to="`order/${data[i].id}`"
                      size="small"
                      class="mr-2 mb-2">>></vs-button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <vs-pagination
            v-if="orderMeta"
            class="mt-4"
            :total="Math.ceil(orderMeta.total / 10)"
            v-model="orderMeta.current_page"
          ></vs-pagination>
        </div>
      </vs-card>
    </div>
  </div>
</template>
<script>
import internal from "stream";
import store from "../datastore/store";

export default {
  data:{
    selectedRow:[],
  },
  computed: {
    orders:(function(){  
      return this.$store.getters.getOrders
    }),
    orderMeta:(function(){
       return  this.$store.getters.getOrdersMeta
    })
  },
  created() {
    this.loadAllOrders()
  },
  methods: {
    upperCase:(function(letters){
     if(typeof letters == 'string'){
        return letters.toUpperCase();
     }
     return letters
    }),
    loadAllOrders() {
      this.$store.dispatch("getAllOrders", this.orderMeta.current_page).then((function(resp){
     
      }).bind(this))
    },
    downloadReciept:(function(order){
      alert(JSON.stringify(order))

    }),
    isChecked:(function(orderID){
      return this.$store.getters.getOrderSelectionStatus(orderID)
    }),
    selectTableRowCheckBox(evt){
     let el  =  evt.target;
      if(el){
        let  id =  parseInt(el.value)
        if(el.checked){
           this.$store.commit("selectedOrder", id)
           return ;
        }
        this.$store.commit("removeSelectedOrder", id)
      }
    }
  } 
}
</script>

<style scoped>
.button-panel{
  background-color: transparent;
  border-radius: 5px;
  padding:10px;
  margin-bottom: 50px;
  overflow: hidden;
}

.button-panel ul{
  padding:0px;
  margin:0px;
  float:right
}

.button-panel ul li{
  float:left;
  margin-right:10px;
  font-size:10px;
  cursor:pointer;

}

.button-panel ul li input[type='button']{
  padding:5px;
  background-color: #e6cc4c;
  border-radius: 5px;
  cursor:pointer;
  min-width:100px;
  box-shadow: 1px 1px 3px  #000;
  font-size:10px;
  border-width:0px;
}

.button-panel ul li input[type='button']:hover{
  background-color: #f2b226;
  font-size:12px;
}

.select-order-container{
  background-color:transparent !important;
  padding:0px;
  display:block;
  float:right;
}

.select-order-container input[type="checkbox"]{
  width:50px;
  height:20px;
}
.table-row-container:hover{
 background-color: #fff0e0;
 cursor:pointer;
}


</style>