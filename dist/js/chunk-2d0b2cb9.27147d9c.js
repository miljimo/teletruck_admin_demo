(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2cb9"],{2643:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.loading?t._e():i("div",[i("div",{staticClass:"row"},[t._m(0),i("div",{staticClass:"col-md-3 col-8"},[i("div",{staticClass:"text-right"},[i("vs-button",{staticClass:"ml-5",attrs:{color:"dark",type:"filled"},on:{click:function(e){t.addData=!0}}},[t._v("Add New")])],1)])]),i("div",{staticClass:"mt-5"},[i("vs-card",[i("div",{staticClass:"p-2"},[i("div",{staticClass:"mb-4"},[i("p",{staticClass:"font-bold lead"},[t._v("All Contents")])]),i("vs-table",{attrs:{id:"div-with-loading","max-items":"10",data:t.contents,search:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.data;return t._l(s,(function(e,a){return i("vs-tr",{key:a},[i("vs-td",{attrs:{data:s[a].id}},[t._v("\n                "+t._s(t.moment.utc(new Date(s[a].created_at)).format("dddd, MMM Do 'YY"))+"\n              ")]),i("vs-td",{attrs:{data:s[a].name}},[i("span",{staticClass:"font-bold text-primary",on:{click:function(e){return t.viewAllPrices(s[a])}}},[t._v("\n                  "+t._s(s[a].name))])]),i("vs-td",{attrs:{data:s[a].si_unit}},[i("span",{staticClass:"text-small"},[t._v("\n                  "+t._s(t._f("capitalize")(s[a].si_unit))+"\n                ")])]),i("vs-td",[i("span",{staticClass:"text-small"},[t._v("\n                  "+t._s(t._f("capitalize")(s[a].pricing.length))+" Prices\n                ")])]),i("vs-td",[i("vs-button",{staticClass:"mr-2 mb-2",attrs:{size:"small"},on:{click:function(e){return t.viewAllPrices(s[a])}}},[t._v("View Prices")]),i("vs-button",{attrs:{size:"small",color:"dark"},on:{click:function(e){return t.addCategoryPrice(s[a].id)}}},[t._v("Add Price")])],1)],1)}))}}],null,!1,1356403990)},[i("template",{slot:"thead"},[i("vs-th",[t._v(" Date Created ")]),i("vs-th",[t._v(" Name ")]),i("vs-th",[t._v(" Unit ")]),i("vs-th",[t._v(" Pricing ")]),i("vs-th",[t._v(" Action ")])],1)],2)],1)])],1),i("vs-popup",{staticClass:"addPopup",attrs:{title:"Add Category",active:t.addData},on:{"update:active":function(e){t.addData=e}}},[i("div",[i("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm(e)}}},[i("div",{staticClass:"py-3"},[i("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Enter Category name"},model:{value:t.category.name,callback:function(e){t.$set(t.category,"name",e)},expression:"category.name"}})],1),i("div",{staticClass:"py-3"},[i("vs-select",{staticClass:"w-full",attrs:{label:"Select Unit"},model:{value:t.category.si_unit,callback:function(e){t.$set(t.category,"si_unit",e)},expression:"category.si_unit"}},[i("vs-select-item",{attrs:{value:"tonne",text:"Tonne"}}),i("vs-select-item",{attrs:{value:"litre",text:"Litre"}})],1)],1),i("div",{staticStyle:{border:"1px solid gainsboro",padding:"17px","border-radius":"9px","margin-top":"8px"}},[i("p",[t._v("Add Pricing")]),i("div",{staticClass:"py-1"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-4"},[i("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Size"},model:{value:t.price.size,callback:function(e){t.$set(t.price,"size",e)},expression:"price.size"}})],1),i("div",{staticClass:"col-md-5"},[i("vs-input",{staticClass:"w-full",attrs:{type:"number","label-placeholder":"Price"},model:{value:t.price.price,callback:function(e){t.$set(t.price,"price",e)},expression:"price.price"}})],1),i("div",{staticClass:"col-md-3 pl-0"},[i("vs-button",{staticStyle:{"margin-top":"16px",height:"40px"},attrs:{size:"small",color:"dark"},on:{click:function(e){return t.addPricing()}}},[t._v("Add")])],1)]),t.category.pricings.length>=1?i("p",{staticStyle:{"font-size":"12px","margin-top":"13px","font-style":"italic"}},[t._v("\n              "+t._s(t.category.pricings.length)+" Pricing added\n            ")]):t._e()])]),i("div",{staticClass:"mt-10"},[i("vs-button",{staticClass:"w-full my-3",attrs:{color:"dark",type:"filled"},on:{click:t.submitForm}},[t._v("Add Category")]),i("vs-button",{staticClass:"w-full mb-2",attrs:{color:"dark",type:"flat"},on:{click:function(e){t.addData=!1}}},[t._v("Cancel")])],1)])])]),i("vs-popup",{staticClass:"addPopup",attrs:{title:"Add Category pricing",active:t.addCategoryPriceView},on:{"update:active":function(e){t.addCategoryPriceView=e}}},[i("div",[i("form",{on:{submit:function(e){return e.preventDefault(),t.addPricee(e)}}},[i("div",{staticClass:"py-3"},[i("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Enter Size"},model:{value:t.addP.size,callback:function(e){t.$set(t.addP,"size",e)},expression:"addP.size"}})],1),i("div",{staticClass:"py-3"},[i("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Enter Price"},model:{value:t.addP.price,callback:function(e){t.$set(t.addP,"price",e)},expression:"addP.price"}})],1),i("div",{staticClass:"mt-10"},[i("vs-button",{staticClass:"w-full my-3",attrs:{color:"dark",type:"filled"},on:{click:t.addPricee}},[t._v("Add Pricing")]),i("vs-button",{staticClass:"w-full mb-2",attrs:{color:"dark",type:"flat"},on:{click:function(e){t.addCategoryPriceView=!1}}},[t._v("Cancel")])],1)])])]),i("vs-popup",{staticClass:"addPopup",attrs:{title:"Pricing for "+t.viewPreview.name,active:t.previewPop},on:{"update:active":function(e){t.previewPop=e}}},[i("div",[i("div",{staticClass:"py-3"},t._l(t.viewPreview.pricing,(function(e,s){return i("div",{key:s,staticStyle:{"border-bottom":"1px solid gainsboro","padding-bottom":"6px","margin-bottom":"16px"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-7"},[i("p",{staticClass:"text-small mb-1 text-gray"},[t._v("\n                Size - "+t._s(e.size)+"\n              ")]),i("p",[t._v(t._s(t._f("currency")(e.price,"₦",0)))])]),i("div",{staticClass:"col-md-5"},[i("div",{staticClass:"text-right"},[i("vs-button",{staticClass:"mr-2 mb-2",attrs:{size:"small",color:"dark",type:"border"},on:{click:function(i){return t.removePricing(e.id)}}},[t._v("\n                  Remove\n                ")])],1)])])])})),0),i("div",{staticClass:"mt-10"},[i("vs-button",{staticClass:"w-full mb-2",attrs:{color:"dark",type:"flat"},on:{click:function(e){t.previewPop=!1}}},[t._v("Cancel")])],1)])])],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"col-md-9 col-4"},[i("h3",{staticClass:"font-bold d-inline"},[t._v("Material Categories")])])}],o=(i("7f7f"),i("20d6"),{computed:{loading:function(){return this.$store.getters.pgLoading}},mounted:function(){this.getBl()},data:function(){return{contents:[],addCategoryPriceView:!1,categoryP:"",trucktype:"",addData:!1,table_options:{current_page:1},delAct:"",name:"",type:"",state:"",manager_id:"",plate_number:"",capacity:"",si_unit:"",category:{name:"",si_unit:"",pricings:[]},price:{size:"",price:""},addP:{size:"",price:"",id:""},previewPop:!1,viewPreview:{}}},watch:{"table_options.current_page":function(){this.getContents(!0)}},methods:{addCategoryPrice:function(t){this.addCategoryPriceView=!0,this.addP.id=t},viewAllPrices:function(t){this.previewPop=!0,this.viewPreview=t},deleteItem:function(t){this.delAct=t,this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm Delete",text:"Are you sure you want to delete this content",accept:this.deleteFunc})},removePricing:function(t){var e=this,i={path:"admin/materials/category/pricing/".concat(t,"/delete")};this.$vs.loading(),this.$store.dispatch("delContent",i).then((function(t){e.$vs.loading.close(),e.$vs.notify({title:"Price deleted",text:"Successfully removed pricing",color:"success",icon:"verified_user",position:"bottom-center"}),setTimeout((function(){location.reload()}),1e3)})).catch((function(t){e.$vs.loading.close("#div-with-loading > .con-vs-loading"),t.response?e.$vs.notify({title:"Pricing",text:t.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):e.$vs.notify({title:"Delete pricing",text:"Unable to delete pricing",color:"dark",icon:"error",position:"bottom-center"}),e.$store.commit("pgLoading",!1)}))},deleteFunc:function(){var t=this;this.$vs.loading({container:"#div-with-loading",scale:.6});var e=this.delAct;this.$store.dispatch("delContent",e).then((function(i){t.$vs.loading.close("#div-with-loading > .con-vs-loading"),t.contents.data.splice(t.contents.data.findIndex((function(t){return t.id===e})),1),t.$vs.notify({icon:"error",color:"dark",position:"bottom-center",title:"Content deleted",text:"Content was successfully deleted"})})).catch((function(e){t.$vs.loading.close("#div-with-loading > .con-vs-loading"),e.response?t.$vs.notify({title:"Delete content",text:e.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):t.$vs.notify({title:"Delete content",text:"Unable to delete this content",color:"dark",icon:"error",position:"bottom-center"})}))},getBl:function(){this.$store.commit("pgLoading",!0),this.getContents(!1)},addPricing:function(){this.category.pricings.push({size:this.price.size,price:this.price.price}),this.price.size="",this.price.price=""},getContents:function(t){var e=this;t&&this.$vs.loading({container:"#div-with-loading",scale:.6});var i={path:"admin/materials/category",pageNo:this.table_options.current_page};this.$store.dispatch("getContents",i).then((function(i){e.contents=i.data.data,t&&e.$vs.loading.close("#div-with-loading > .con-vs-loading"),e.$store.commit("pgLoading",!1)})).catch((function(t){e.$vs.loading.close("#div-with-loading > .con-vs-loading"),t.response?e.$vs.notify({title:"Get Contents",text:t.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):e.$vs.notify({title:"Get Contents",text:"Unable to get contents",color:"dark",icon:"error",position:"bottom-center"}),e.$store.commit("pgLoading",!1)}))},addPricee:function(){var t=this;this.$vs.loading();var e=new FormData;e.append("size",this.addP.size),e.append("price",this.addP.price);var i={path:"admin/materials/category/pricing/".concat(this.addP.id),data:e};this.$store.dispatch("create",i).then((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Add New Pricing",text:"Successfully added new price",color:"success",icon:"verified_user",position:"bottom-center"}),setTimeout((function(){location.reload()}),1e3)})).catch((function(e){t.$vs.loading.close(),e.response?t.$vs.notify({title:"New Pricing",text:e.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):t.$vs.notify({title:"New Pricing",text:"Unable to add new pricing",color:"dark",icon:"error",position:"bottom-center"})}))},submitForm:function(){var t=this;if(this.category.pricings.length<1)this.$vs.notify({title:"Add Pricing",text:"To continue add at least 1 Pricing",color:"dark",icon:"error",position:"bottom-center"});else{this.$vs.loading();var e={name:this.category.name,si_unit:this.category.si_unit,pricings:this.category.pricings},i={path:"admin/materials/category",data:e};this.$store.dispatch("create",i).then((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Create Truck profile",text:"Successfully created new profile",color:"success",icon:"verified_user",position:"bottom-center"}),setTimeout((function(){location.reload()}),1e3)})).catch((function(e){t.$vs.loading.close(),e.response?t.$vs.notify({title:"Create Truck",text:e.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):t.$vs.notify({title:"Create Truck",text:"Unable to Create Truck",color:"dark",icon:"error",position:"bottom-center"})}))}}}}),n=o,c=i("2877"),r=Object(c["a"])(n,s,a,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0b2cb9.27147d9c.js.map