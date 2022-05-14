<template>
  <div>
    <div class="mt-5">
      <vs-card>
        <div class="p-2">
          <div class="mb-4">
            <p class="font-bold lead">All</p>
          </div>

          <vs-table
            id="div-with-loading"
            max-items="10"
            :data="orders"
            search
          >
            <template slot="thead">
              <vs-th> Created </vs-th>
              <vs-th> Order ID </vs-th>
              <vs-th> Material </vs-th>
              <vs-th> Creator </vs-th>
              <vs-th>Total Amount</vs-th>
              <vs-th> Order Status</vs-th>
              <vs-th> Action(s) </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(tr, i) in data">
                <vs-td :data="data[i].id">
                  {{
                    moment
                      .utc(new Date(data[i].created_at))
                      .format("dddd, MMM Do 'YY")
                  }}
                </vs-td>
                <vs-td :data="data[i].order_number">
                  <span class="font-bold text-primary">
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
                  <label>{{data[i].order_status_text}}</label>
                </vs-td >
                <vs-td>
                    <vs-button
                    :to="`orders/${data[i].id}`"
                    size="small"
                    class="mr-2 mb-2"
                    >>></vs-button>
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
export default {
  computed: {
    orders:(function(){  
      return this.$store.getters.getOrders
    }),
    orderMeta:(function(){
       return  this.$store.getters.getOrdersMeta
    })
  },
  mounted() {
    this.loadAllOrders()
  },
  data() {
    return {
      categories: [],
      trucktype: "",
      addData: false,
      table_options: {
        current_page: 1,
      },
      delAct: "",
      name: "",
      size: "",
      description: "",
      price: "",
      images: [],
      category_id: "",
      previewPop: false,
      viewPreview: {},
    };
  },
  watch: {
    "table_options.current_page": function () {
    },
  },
  methods: {
    openOrderPage(orderID) {
      
    },
    loadAllOrders() {
      this.$store.dispatch("getAllOrders", this.table_options.current_page).then((function(resp){
     
      }).bind(this))
    },
    addImages(event) {
      // console.log(event.target.files);
      // this.images = event.target.files;
      for (var i = 0; i < event.target.files.length; ++i) {
        this.images.push(event.target.files[i]);
      }
    },
    submitForm() {
      this.$vs.loading();
      let data = new FormData();
      data.append("name", this.name);
      data.append("description", this.description);
      data.append("category_id", this.category_id);
      // data.append("images[]", this.images);
      for (let i = 0; i < this.images.length; i++) {
        data.append("images[]", this.images[i]);
      }

      let apiData = {
        path: "admin/materials",
        data,
      };
      this.$store
        .dispatch("create", apiData)
        .then((resp) => {
          this.$vs.loading.close();

          this.$vs.notify({
            title: "Create Material",
            text: "Successfully created new material",
            color: "success",
            icon: "verified_user",
            position: "bottom-center",
          });

          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((err) => {
          this.$vs.loading.close();
          if (err.response) {
            this.$vs.notify({
              title: "Create Material",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Create Material",
              text: "Unable to Create Material",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
        });
    },
  },
};
</script>