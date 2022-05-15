<template>
    <div class="container">       
            <div class="row container">
                <vs-card>
                <div class="row">
                        <div class="col-md-4">
                            <label>Order Number: <strong>{{order.order_number}}</strong></label>
                        </div>
                        <div class="col-sm">
                        <label>Total Amount : {{getMoneyFormat(order.sum_total)}}</label>
                        </div>
                        <div class="col-sm">
                            Status : <strong>{{upperCase(order.order_status_text)}}</strong>
                        </div>
                  
                </div>

                 <div class="row">
                        <div class="col-md-4">
                            <label>Payment Made On: <strong>{{order.paid_at}}</strong></label>
                        </div>
                        <div class="col-sm">
                        <label>Created On : {{order.created_at}}</label>
                        </div>
                        <div class="col-sm">
                           Last Updated On : <strong>{{order.updated_at}}</strong>
                        </div>
                  
                </div>
                </vs-card>

            </div>
     

       <div class="container">
          <div class='row'>
              <div class="col-md-4">
                    <vs-card>
                       <section class="container">
                           <div class="row order-column-detail">
                               <div class="col">
                                  <h5>User Detail</h5>
                                  <hr />
                               </div>
                           </div>

                            <div class="row order-column-detail">
                               <div class="col">
                                   <label>User ID:</label>
                                   <span> {{order.user_id}}</span>
                               </div>
                           </div>

                           <div class="row order-column-detail">
                               <div class="col">
                                   <label>FirstName:</label>
                                   <span> {{order.owner.firstname}}</span>
                               </div>
                           </div>

                            <div class="row order-column-detail">
                               <div class="col">
                                   <label>Lastname:</label>
                                   <span> {{order.owner.lastname}}</span>
                               </div>
                           </div>

                           <div class="row order-column-detail">
                               <div class="col">
                                   <label>Email:</label>
                                   <span> {{order.owner.email}}</span>
                               </div>
                           </div>

                            <div class="row order-column-detail">
                               <div class="col">
                                   <label>Phone:</label>
                                   <span> {{order.owner.phone}}</span>
                               </div>
                           </div>


                       </section>
                    </vs-card>

                    <!--Order detail-->

                     <vs-card vs-if="order.order != null">
                       <section class="container" vs-if="order.material != 'undefined'">
                           <div class="row order-column-detail">
                               <div class="col">
                                  <h5>Order Summary</h5>
                                  <hr />
                               </div>
                           </div>

                            <div class="row order-column-detail">
                               <div class="col">
                                   <label>Order ID:</label>
                                   <span> {{order.id}}</span>
                               </div>
                           </div>

                           <div class="row order-column-detail">
                               <div class="col">
                                   <label>Item:</label>
                                   <span> {{order.material.name}}, <label>
                                       {{order.material.description}}
                                   </label></span>
                               </div>
                           </div>

                            <div class="row order-column-detail">
                               <div class="col">
                                   <label>Payment Method:</label>
                                   <span> {{order.order.payment_method}}</span>
                               </div>
                           </div>

                           <div class="row order-column-detail">
                               <div class="col">
                                   <label>Reference:</label>
                                   <span> {{order.order.payment_reference}}</span>
                               </div>
                           </div>

                       </section>
                    </vs-card>
              </div>
              <div class="col-md-8">
                  <vs-card>
                  <div class="container">
                      <div class="row">
                          <div class="col-md-9">
                              <strong>Shipping Address:</strong> {{order.order.shipping_address}}
                          </div>
                          <div class="col-md-3" >
                              <vs-button v-if="order.truck_id != null"
                              :to="`/truck/${order.truck_id}`"
                              class="font-bold"
                              >Track Truck</vs-button>
                            <label v-else>
                                <strong class="no-truck-attached">No Truck Attached</strong>
                            </label>

                          </div>


                      </div>

                      <!--Display order items , at the moment only images are provided-->
                     <div class="col-md-12">
                         
                        <vs-table
                            max-items="10"
                            :data="order.material.images"
                            search
                        >   

                         <template slot="thead">
                               <vs-th> Image</vs-th>
                                <vs-th> ID </vs-th>
                                
                        </template>

                         <template slot-scope="{ data }">
                                <vs-tr :key="i" v-for="(tr, i) in data">
                                   <vs-td>
                                       <vs-image size="50px" :src="data[i].file_url" />
                                   </vs-td>
                                   <vs-td>{{data[i].id}}</vs-td>
                                </vs-tr>


                        </template>

                        </vs-table>
                     </div>
                  </div>
                  </vs-card>
              </div>

          </div>
       </div>
        

    </div>
</template>

<script>
import OrderInfo from "./OrderDirectInformation.vue"

export default {
    components: [
        OrderInfo
    ],
    data() {
        return {}
    },
    computed: {
        order: (function () {
            return this.$store.getters.getSelectedOrder
        }),
        message: (function () {
            return "error"
        })
    },
    mounted() {
        this.fetchOrders()
    },
    methods: {
        fetchOrders: (function () {
            let playload = {
                id: this.$route.params.id
            }
            this.$store.dispatch("getOrderDetail", playload)
        }),
        getMoneyFormat:(function(amount){
            var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
          
            });
            return formatter.format(amount)
        }),
        upperCase:(function(letter){
            if (typeof letter == "string"){
                return letter.toUpperCase()
            }
            return letter;
        })
    }
}
</script>

<style scoped>
.order-column-detail {
    display: block;
    overflow: hidden;
    margin:10px;
    font-size:0.90em;
}
.order-column-detail label{
    font-weight: bold;
  
    width: 50px !important;
    float:left;
}

.order-column-detail span{
    float:right;
}

.no-truck-attached{
    color:#ff9e3d;
    font-size:12px;
    font-style:italic;
}

</style>