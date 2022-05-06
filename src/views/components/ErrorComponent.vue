<template>
     <div class="error-container" v-if="closed">
         <div class="header">
             <input type="button" @onclick="closeWindow" value="X"/>
         </div>
         <div >
            <ul>
              <li :key="index" v-for="(item, index) in messages">
                {{item}}
              </li>
             </ul>
         </div>
     </div>
</template>

<script>


export default {

         props:{
              title:String,
              messages: Array,
              closed :Boolean,
         },
         
         data:(function(){
             return{
                 
             }
         }),
         mounted:(function(){
          
         }),
         methods:{

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
    overflow:hidden;
    min-height:30px;
  }
  .error-container input[type='button']{
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

  .error-container ul{
    margin:0px;
    padding:0px;
  }

.error-container ul li{
    margin:0px;
    padding:2px;
    font-style: italic;
    color:rgb(184, 131, 34) !important;
    font-size:12px;
  }
</style>