<template>
    <div>
        <vs-card>
         <!--Render the sub component here kf router url matches-->
          <h1>Order Number : {{$route.params.id}}</h1>
     
       </vs-card>
   
    </div>
</template>

<script>

export default{
    data(){
        return {}
    },
    computed:{
       orderID:(function(){
           return $route.params.id;
       }).bind(this)
    },
    mounted(){
       if(this.fetchOrders) this.fetchOrders()
    },
    methods:{
            fetchOrders:(function(){
                let playload={
                id:this.orderID
                }
                this.$store.dispatch("getOrderDetails", playload)
            }).bind(this)
   }
}
</script>

<style scoped>

</style>