(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7ca0"],{"51b0":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.loading?t._e():s("div",[t._m(0),s("div",{staticClass:"mt-5"},[s("vs-card",[s("div",{staticClass:"p-2"},[s("div",{staticClass:"mb-4"},[s("p",{staticClass:"font-bold lead"},[t._v("All ("+t._s(t.contents.total)+")")])]),s("vs-table",{attrs:{id:"div-with-loading","max-items":"10",data:t.contents.data,search:""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,(function(e,n){return s("vs-tr",{key:n},[s("vs-td",{attrs:{data:a[n].title}},[s("router-link",{staticClass:"font-bold",attrs:{to:"/view-content/"+a[n].id}},[t._v("\n                  "+t._s(a[n].name))])],1),s("vs-td",{attrs:{data:a[n].synopsis}},[s("span",{staticClass:"text-small",domProps:{innerHTML:t._s(a[n].synopsis)}})]),s("vs-td",{attrs:{data:a[n].pregnancy_week}},[t._v("\n                "+t._s(a[n].pregnancy_week)+" - Week\n              ")]),s("vs-td",{attrs:{data:a[n].id}},[s("p",{staticClass:"text-small"},[t._v("Published")]),t._v("\n                "+t._s(t.moment.utc(new Date(a[n].date_created)).format("dddd, MMM Do 'YY"))+"\n              ")]),s("vs-td",[s("vs-button",{staticClass:"mr-2 mb-2",attrs:{to:"/edit-pregnancy-content/"+a[n].id,size:"small"}},[t._v("Edit")]),s("vs-button",{attrs:{size:"small",color:"dark"},on:{click:function(e){return t.deleteItem(a[n].id)}}},[t._v("Delete")])],1)],1)}))}}],null,!1,1144297952)},[s("template",{slot:"thead"},[s("vs-th",[t._v(" Date ")]),s("vs-th",[t._v(" Invoice ID ")]),s("vs-th",[t._v(" Status ")]),s("vs-th",[t._v(" Client ")]),s("vs-th",[t._v(" Company ")]),s("vs-th",[t._v(" Amount ")]),s("vs-th",[t._v(" Status ")]),s("vs-th",[t._v(" Action ")])],1)],2),t.contents?s("vs-pagination",{staticClass:"mt-4",attrs:{total:Math.ceil(t.contents.totalRecord/10)},model:{value:t.table_options.current_page,callback:function(e){t.$set(t.table_options,"current_page",e)},expression:"table_options.current_page"}}):t._e()],1)])],1),s("vs-popup",{staticClass:"addPopup",attrs:{title:"Add Truck",active:t.addData},on:{"update:active":function(e){t.addData=e}}},[s("div",[s("form",{attrs:{action:""}},[s("div",{staticClass:"my-3"},[s("vs-input",{staticClass:"w-full",attrs:{placeholder:"Enter plate number"}})],1),s("div",{staticClass:"my-3"},[s("vs-select",{staticClass:"w-full",attrs:{label:"Select truck type"}},[s("vs-select-item",{attrs:{value:"flatbed",text:"Flatbed"}})],1)],1),s("div",{staticClass:"my-3"},[s("vs-select",{staticClass:"w-full",attrs:{label:"Select truck state"}},[s("vs-select-item",{attrs:{value:"Goodmode",text:"Good mode"}})],1)],1),s("div",{staticClass:"my-3"},[s("vs-select",{staticClass:"w-full",attrs:{label:"Select manager"}},[s("vs-select-item",{attrs:{value:"kabiru",text:"Kabiru Salam"}})],1)],1),s("div",{staticClass:"mt-10"},[s("vs-button",{staticClass:"w-full my-3",attrs:{color:"dark",type:"filled"}},[t._v("Add truck")]),s("vs-button",{staticClass:"w-full mb-2",attrs:{color:"dark",type:"flat"}},[t._v("Cancel")])],1)])])])],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-9 col-4"},[s("h3",{staticClass:"font-bold d-inline"},[t._v("Invoices")])]),s("div",{staticClass:"col-md-3 col-8"},[s("div",{staticClass:"text-right"})])])}],o=(s("20d6"),{computed:{loading:function(){return this.$store.getters.pgLoading}},mounted:function(){this.getBl()},data:function(){return{contents:[],trucktype:"",addData:!1,table_options:{current_page:1},delAct:""}},watch:{"table_options.current_page":function(){this.getContents(!0)}},methods:{deleteItem:function(t){this.delAct=t,this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm Delete",text:"Are you sure you want to delete this content",accept:this.deleteFunc})},deleteFunc:function(){var t=this;this.$vs.loading({container:"#div-with-loading",scale:.6});var e=this.delAct;this.$store.dispatch("delContent",e).then((function(s){t.$vs.loading.close("#div-with-loading > .con-vs-loading"),t.contents.records.splice(t.contents.records.findIndex((function(t){return t.id===e})),1),t.$vs.notify({icon:"error",color:"dark",position:"bottom-center",title:"Content deleted",text:"Content was successfully deleted"})})).catch((function(e){t.$vs.loading.close("#div-with-loading > .con-vs-loading"),e.response?t.$vs.notify({title:"Delete content",text:e.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):t.$vs.notify({title:"Delete content",text:"Unable to delete this content",color:"dark",icon:"error",position:"bottom-center"})}))},getBl:function(){this.$store.commit("pgLoading",!0),this.getContents(!1)},getContents:function(t){var e=this;t&&this.$vs.loading({container:"#div-with-loading",scale:.6});var s={path:"admin/invoices",pageNo:this.table_options.current_page};this.$store.dispatch("getContents",s).then((function(s){e.contents=s.data.data,t&&e.$vs.loading.close("#div-with-loading > .con-vs-loading"),e.$store.commit("pgLoading",!1)})).catch((function(t){e.$vs.loading.close("#div-with-loading > .con-vs-loading"),t.response?e.$vs.notify({title:"Get Contents",text:t.response.data.message,color:"warning",icon:"error",position:"bottom-center"}):e.$vs.notify({title:"Get Contents",text:"Unable to get contents",color:"dark",icon:"error",position:"bottom-center"}),e.$store.commit("pgLoading",!1)}))}}}),i=o,l=s("2877"),c=Object(l["a"])(i,a,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0c7ca0.d2ba186a.js.map