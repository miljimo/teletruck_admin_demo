<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        <div>
          <h1>Wallet</h1>
          <div class="my-10 mx-3">
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
          </div>
          <hr class="my-5 opacity-25" />
          <vs-button color="dark" class="ml-5" type="filled"
            >Fund Wallet</vs-button
          >
          <vs-button color="dark" class="ml-5" type="border"
            >Make Withdrawal</vs-button
          >
        </div>
      </div>
      <div class="col-md-7">
        <vs-list-item title="Transactions">
          <vs-button type="flat" color="danger">See all</vs-button>
        </vs-list-item>

        <vs-tabs class="mt-4">
          <vs-tab label="All">
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
          </vs-tab>
          <vs-tab label="Today">
            <div class="con-tab-ejemplo">Service</div>
          </vs-tab>
          <vs-tab label="Last week">
            <div class="con-tab-ejemplo">login</div>
          </vs-tab>
        </vs-tabs>
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
