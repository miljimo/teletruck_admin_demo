<template>
     <vs-card style="min-height: 508px">
                <div class="p-3">
                <div class="error-container" v-if='has_error'> 
                    <div><button @click="clearError">
                    X
                    </button></div>
                    <labeL> {{message}}</labeL>
                    </div>

                </div>
                <div class="mb-3">
                        <h4 class="">{{ order.id }}</h4>
                </div>
           
          </vs-card>
</template>

<script>
   export default {

       props:{
           order: Object,
           message:String
       },
       computed:{
          has_error:(function(){
              if(this.message){
                return  ( this.message.trim() != "")
              }
              return false;
          })
       },       
       methods:{
         clearError:(function(e){
            this.message="";
         }),
         upperCase:(function(letters){
             if (typeof letters =="string"){
                 return letters.toUpperCase()
             }
             return letters;
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
