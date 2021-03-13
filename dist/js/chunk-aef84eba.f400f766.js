(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aef84eba"],{3837:function(t,s,e){"use strict";var a=e("c4b7"),i=e.n(a);i.a},"4faa":function(t,s,e){"use strict";var a={users:[]},i=(e("20d6"),{SET_USERS:function(t,s){t.users=s},REMOVE_RECORD:function(t,s){var e=t.users.findIndex((function(t){return t.id===s}));t.users.splice(e,1)}}),n=e("bb36"),o={fetchUsers:function(t){var s=t.commit;return new Promise((function(t,e){n["a"].get("/api/user-management/users").then((function(e){s("SET_USERS",e.data),t(e)})).catch((function(t){e(t)}))}))},fetchUser:function(t,s){return new Promise((function(t,e){n["a"].get("/api/user-management/users/".concat(s)).then((function(s){t(s)})).catch((function(t){e(t)}))}))},removeRecord:function(t,s){var e=t.commit;return new Promise((function(t,a){n["a"].delete("/api/user-management/users/".concat(s)).then((function(a){e("REMOVE_RECORD",s),t(a)})).catch((function(t){a(t)}))}))}},r={};s["a"]={isRegistered:!1,namespaced:!0,state:a,mutations:i,actions:o,getters:r}},c4b7:function(t,s,e){},e2c8:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"page-user-view"}},[e("vs-alert",{attrs:{color:"danger",title:"User Not Found",active:t.user_not_found},on:{"update:active":function(s){t.user_not_found=s}}},[e("span",[t._v("User record with id: "+t._s(t.$route.params.userId)+" not found.")]),e("span",[e("span",[t._v("Check")]),e("router-link",{staticClass:"text-inherit underline",attrs:{to:{name:"page-user-list"}}},[t._v("All Users")])],1)]),t.user_data?e("div",{attrs:{id:"user-data"}},[e("vx-card",{staticClass:"mb-base",attrs:{title:"Account"}},[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col",attrs:{id:"avatar-col"}},[e("div",{staticClass:"img-container mb-4"},[e("img",{staticClass:"rounded w-full",attrs:{src:t.user_data.avatar}})])]),e("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-1"}},[e("table",[e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Username")]),e("td",[t._v(t._s(t.user_data.username))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Name")]),e("td",[t._v(t._s(t.user_data.name))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Email")]),e("td",[t._v(t._s(t.user_data.email))])])])]),e("div",{staticClass:"vx-col flex-1",attrs:{id:"account-info-col-2"}},[e("table",[e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Status")]),e("td",[t._v(t._s(t.user_data.status))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Role")]),e("td",[t._v(t._s(t.user_data.role))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Company")]),e("td",[t._v(t._s(t.user_data.company))])])])]),e("div",{staticClass:"vx-col w-full flex",attrs:{id:"account-manage-buttons"}},[e("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"app-user-edit",params:{userId:t.$route.params.userId}}}},[t._v("Edit")]),e("vs-button",{attrs:{type:"border",color:"danger","icon-pack":"feather",icon:"icon-trash"},on:{click:t.confirmDeleteRecord}},[t._v("Delete")])],1)])]),e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col lg:w-1/2 w-full"},[e("vx-card",{staticClass:"mb-base",attrs:{title:"Information"}},[e("table",[e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Birth Date")]),e("td",[t._v(t._s(t.user_data.dob))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Mobile")]),e("td",[t._v(t._s(t.user_data.mobile))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Website")]),e("td",[t._v(t._s(t.user_data.website))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Languages")]),e("td",[t._v(t._s(t.user_data.languages_known.join(", ")))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Gender")]),e("td",[t._v(t._s(t.user_data.gender))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Contact")]),e("td",[t._v(t._s(t.user_data.contact_options.join(", ")))])])])])],1),e("div",{staticClass:"vx-col lg:w-1/2 w-full"},[e("vx-card",{staticClass:"mb-base",attrs:{title:"Social Links"}},[e("table",[e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Twitter")]),e("td",[t._v(t._s(t.user_data.social_links.twitter))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Facebook")]),e("td",[t._v(t._s(t.user_data.social_links.facebook))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Instagram")]),e("td",[t._v(t._s(t.user_data.social_links.instagram))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Github")]),e("td",[t._v(t._s(t.user_data.social_links.github))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("CodePen")]),e("td",[t._v(t._s(t.user_data.social_links.codepen))])]),e("tr",[e("td",{staticClass:"font-semibold"},[t._v("Slack")]),e("td",[t._v(t._s(t.user_data.social_links.slack))])])])])],1)]),e("vx-card",[e("div",{staticClass:"vx-row"},[e("div",{staticClass:"vx-col w-full"},[e("div",{staticClass:"flex items-end px-3"},[e("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"LockIcon"}}),e("span",{staticClass:"font-medium text-lg leading-none"},[t._v("Permissions")])],1),e("vs-divider")],1)]),e("div",{staticClass:"block overflow-x-auto"},[e("table",{staticClass:"w-full permissions-table"},[e("tr",t._l(["Module","Read","Write","Create","Delete"],(function(s){return e("th",{key:s,staticClass:"font-semibold text-base text-left px-3 py-2"},[t._v(t._s(s))])})),0),t._l(t.user_data.permissions,(function(s,a){return e("tr",{key:a},[e("td",{staticClass:"px-3 py-2"},[t._v(t._s(a))]),t._l(s,(function(a,i){return e("td",{key:i+a,staticClass:"px-3 py-2"},[e("vs-checkbox",{staticClass:"pointer-events-none",model:{value:s[i],callback:function(e){t.$set(s,i,e)},expression:"val[name]"}})],1)}))],2)}))],2)])])],1):t._e()],1)},i=[],n=e("4faa"),o={data:function(){return{user_data:null,user_not_found:!1}},computed:{userAddress:function(){var t="";for(var s in this.user_data.location)t+="".concat(s," ");return t}},methods:{confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm Delete",text:'You are about to delete "'.concat(this.user_data.username,'"'),accept:this.deleteRecord,acceptText:"Delete"})},deleteRecord:function(){this.$router.push({name:"app-user-list"}),this.showDeleteSuccess()},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"User Deleted",text:"The selected user was successfully deleted"})}},created:function(){var t=this;n["a"].isRegistered||(this.$store.registerModule("userManagement",n["a"]),n["a"].isRegistered=!0);var s=this.$route.params.userId;this.$store.dispatch("userManagement/fetchUser",s).then((function(s){t.user_data=s.data})).catch((function(s){404!==s.response.status?console.error(s):t.user_not_found=!0}))}},r=o,c=(e("3837"),e("2877")),l=Object(c["a"])(r,a,i,!1,null,null,null);s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-aef84eba.f400f766.js.map