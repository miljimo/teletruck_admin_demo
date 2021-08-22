<template>
  <div>
    <div v-if="!loading" class="row">
      <div class="col-md-5">
        <div>
          <h1>Dashboard</h1>
          <vs-tabs class="mt-4">
            <vs-tab label="Total Wallet">
              <vs-card
                class="my-4 p-4 bg-black"
                style="
                  background-image: url('/img/cardbg.svg');
                  background-size: cover;
                  background-position: center;
                "
              >
                <div>
                  <p class="mb-2 mt-5 text-white opacity-10">Total Wallet</p>
                  <h3 class="font-bold mb-0 text-white">
                    {{ walletData.balance | currency("₦", 0) }}
                  </h3>
                </div>
              </vs-card>
            </vs-tab>
            <!-- <vs-tab label="Withdrawal">
              <div class="con-tab-ejemplo">Service</div>
            </vs-tab>
            <vs-tab label="Balance">
              <div class="con-tab-ejemplo">login</div>
            </vs-tab> -->
          </vs-tabs>
          <hr class="my-5 opacity-25" />
          <vs-list-item title="Transactions">
            <vs-button to="/wallet" type="flat" color="danger"
              >See all</vs-button
            >
          </vs-list-item>
          <vs-list>
            <vs-list-item
              v-for="(order, index) in dashboardData.transactions"
              :key="index"
              v-if="index <= 2"
              class="px-0 my-3"
              title="Paid out #55,800 to Account Buba"
              subtitle="Apr 28 at 22:45"
            >
              <p class="text-gray text-small">- 55,800.00</p>
            </vs-list-item>
          </vs-list>
        </div>
      </div>
      <div class="col-md-7">
        <div class="row">
          <div class="col-md-6">
            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">{{ dashboardData.trips }}</h4>
                    <p class="mt-3">Total Trips</p>
                  </div>
                  <div class="col-3">
                    <h4>
                      <feather-icon class="mr-1" icon="TruckIcon" />
                    </h4>
                  </div>
                </div>
              </div>
            </vs-card>
          </div>
          <div class="col-md-6">
            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">{{ dashboardData.materials }}</h4>
                    <p class="mt-3">Total Materials</p>
                  </div>
                  <div class="col-3">
                    <h4>
                      <feather-icon class="mr-1" icon="BoxIcon" />
                    </h4>
                  </div>
                </div>
              </div>
            </vs-card>
          </div>

          <div class="col-md-6">
            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">
                      {{ dashboardData.payin | currency("₦") }}
                    </h4>
                    <p class="mt-3">Total Payin</p>
                  </div>
                  <div class="col-3">
                    <h4>
                      <feather-icon class="mr-1" icon="TrendingUpIcon" />
                    </h4>
                  </div>
                </div>
              </div>
            </vs-card>
          </div>
          <div class="col-md-6">
            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">
                      {{ dashboardData.payout | currency("₦") }}
                    </h4>
                    <p class="mt-3">Total Payout</p>
                  </div>
                  <div class="col-3">
                    <h4>
                      <feather-icon class="mr-1" icon="TrendingDownIcon" />
                    </h4>
                  </div>
                </div>
              </div>
            </vs-card>
          </div>
        </div>

        <div class="mt-3">
          <vs-list-item title="Recent Orders"> </vs-list-item>
          <vs-list>
            <vs-list-item
              v-for="(order, index) in dashboardData.recent_orders"
              :key="index"
              class="px-0 my-3"
              :title="`${order.material.name}, Total amount - ${order.total_amount} `"
              :subtitle="`${order.order_status_text} - ${moment
                .utc(new Date(order.created_at))
                .format('dddd, MMM Do YY')}`"
            >
              <!-- <vs-button color="success" class="ml-5" size="small"
                >Accept Order</vs-button
              > -->
            </vs-list-item>
          </vs-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dashboardData: {},
      walletData: {},
    };
  },
  computed: {
    loading() {
      return this.$store.getters.pgLoading;
    },
  },
  methods: {
    getContent() {
      let fetch = {
        path: "admin/reports/dashboard",
      };

      this.$store
        .dispatch("getDatacontent", fetch)
        .then((resp) => {
          // console.log(resp.data);
          this.dashboardData = resp.data.data;
          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Get Data",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get Data",
              text: "Unable to get Data",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },
    getWallet() {
      let fetch = {
        path: "wallet",
      };

      this.$store
        .dispatch("getDatacontent", fetch)
        .then((resp) => {
          this.walletData = resp.data.data;
          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            this.$vs.notify({
              title: "Get Data",
              text: err.response.data.message,
              color: "warning",
              icon: "error",
              position: "bottom-center",
            });
          } else {
            this.$vs.notify({
              title: "Get Data",
              text: "Unable to get Wallet data",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },
  },
  mounted() {
    this.$store.commit("pgLoading", true);
    this.getWallet();
    this.getContent();
  },
  created() {},
};
</script>
