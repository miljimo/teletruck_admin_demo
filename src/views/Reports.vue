<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div>
          <h1>Reports</h1>

          <div class="row mt-4">
            <div class="col-md-3">
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
            </div>
            <div class="col-md-3">
              <vs-card>
                <div class="p-3">
                  <div class="row">
                    <div class="col-9">
                      <h4 class="font-bold">43</h4>
                      <p class="mt-3">Total Companies</p>
                    </div>
                    <div class="col-3">
                      <h4>
                        <feather-icon class="mr-1" icon="HomeIcon" />
                      </h4>
                    </div>
                  </div>
                </div>
              </vs-card>
            </div>

            <div class="col-md-3">
              <vs-card>
                <div class="p-3">
                  <div class="row">
                    <div class="col-9">
                      <h4 class="font-bold">43</h4>
                      <p class="mt-3">Total Registered Users</p>
                    </div>
                    <div class="col-3">
                      <h4>
                        <feather-icon class="mr-1" icon="UsersIcon" />
                      </h4>
                    </div>
                  </div>
                </div>
              </vs-card>
            </div>

            <div class="col-md-3">
              <vs-card>
                <div class="p-3">
                  <div class="row">
                    <div class="col-9">
                      <h4 class="font-bold">₦3,100.00</h4>
                      <p class="mt-3">Total Wallet</p>
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
          </div>
          <vs-card class="mt-4">
            <vs-table
              id="div-with-loading"
              max-items="10"
              :data="allReports"
              search
            >
              <template slot="thead">
                <vs-th> Created </vs-th>
                <vs-th> Full name </vs-th>
                <vs-th> Email address </vs-th>
                <vs-th> Registration Date</vs-th>
                <vs-th> First Order</vs-th>
                <!-- <vs-th> Action </vs-th> -->
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    <!-- {{
                      moment
                        .utc(new Date(data[indextr].created_at))
                        .format("dddd, MMM Do 'YY")
                    }} -->
                    {{ data[indextr].date }}
                  </vs-td>
                  <vs-td :data="data[indextr].firstname">
                    <span
                      :to="`/view-profile/${data[indextr].id}`"
                      class="font-bold"
                      style="align-items: center; display: flex"
                    >
                      <vs-avatar
                        class="mr-2"
                        :src="data[indextr].profile_photo_url"
                      />
                      {{ data[indextr].fullname }}</span
                    >
                  </vs-td>

                  <vs-td :data="data[indextr].emailaddress">
                    <span
                      class="text-small"
                      v-html="data[indextr].emailaddress"
                    ></span>
                  </vs-td>
                  <vs-td :data="data[indextr].regDate">
                    {{ data[indextr].regDate }}
                  </vs-td>
                  <vs-td :data="data[indextr].orderDate">
                    {{ data[indextr].orderDate }}
                  </vs-td>

                  <!-- <vs-td>
                    <vs-button
                      :to="`/view-profile/${data[indextr].id}`"
                      size="small"
                      class="mr-2 mb-2"
                      >View</vs-button
                    >
                    <vs-button
                      @click="editCompany(data[indextr].id)"
                      size="small"
                      color="dark"
                      class="mr-2 mb-2"
                      >Edit</vs-button
                    >
                    <vs-button
                      @click="deleteItem(data[indextr].id)"
                      size="small"
                      color="dark"
                      class="mr-2 mb-2"
                      type="border"
                      >Deactivate</vs-button
                    >
                  </vs-td> -->
                </vs-tr>
              </template>
            </vs-table>
          </vs-card>
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
      allReports: [
        {
          date: "12th March, 2020",
          fullname: "Hughes Kiki",
          emailaddress: "hughes@gmail.com",
          regDate: "14th April, 2020",
          orderDate: "17th April, 2020",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
  created() {},
};
</script>
