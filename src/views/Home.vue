<template>
  <div>
    <div class="row">
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
                  <h3 class="font-bold mb-0 text-white">N6,390.68</h3>
                </div>
              </vs-card>
            </vs-tab>
            <vs-tab label="Withdrawal">
              <div class="con-tab-ejemplo">Service</div>
            </vs-tab>
            <vs-tab label="Balance">
              <div class="con-tab-ejemplo">login</div>
            </vs-tab>
          </vs-tabs>
          <hr class="my-5 opacity-25" />
          <vs-list-item title="Transactions">
            <vs-button type="flat" color="danger">See all</vs-button>
          </vs-list-item>
          <vs-list>
            <vs-list-item
              class="px-0 my-3"
              title="Paid out #55,800 to Account Buba"
              subtitle="Apr 28 at 22:45"
            >
              <p class="text-gray text-small">- 55,800.00</p>
            </vs-list-item>

            <vs-list-item
              class="px-0 my-3"
              title="Deposit from Bank"
              subtitle="Feb 29 at 22:45"
            >
              <p class="text-gray text-small">+ 86,800.00</p>
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
                    <h4 class="font-bold">23,423</h4>
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

            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">43</h4>
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

            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">₦3,100.00</h4>
                    <p class="mt-3">Total Wallet</p>
                  </div>
                  <div class="col-3">
                    <h4>
                      <feather-icon class="mr-1" icon="CreditCardIcon" />
                    </h4>
                  </div>
                </div>
              </div>
            </vs-card>

            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">₦3,100.00</h4>
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

            <vs-card>
              <div class="p-3">
                <div class="row">
                  <div class="col-9">
                    <h4 class="font-bold">₦3,290.68</h4>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
};
</script>
