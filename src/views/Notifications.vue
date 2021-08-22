<template>
  <div>
    <div
      v-if="!loading"
      class="vx-card"
      style="max-width: 600px; margin: 0 auto"
    >
      <div class="vx-card__header">
        <div class="vx-card__title" style="width: 100%">
          <div class="vs-row w-full">
            <div class="vs-col sm:w-1/2 md:w-3/4 lg:w-3/4 xl:w-3/4">
              <h4 class>Notifications</h4>
            </div>
            <div class="vs-col sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
              <!-- <vs-button color="primary" icon="clear" icon-before @click="clearAll()">Clear All</vs-button> -->
            </div>
          </div>
          <!---->
        </div>
        <!---->
      </div>
      <div
        class="vx-card__collapsible-content vs-con-loading__container"
        id="div-with-loading"
        style="min-height: 500px"
      >
        <div class="vx-card__body">
          <ul class="vx-timeline">
            <li
              class="cursor-pointer"
              @click="ReadNotification(ntf, index)"
              v-for="(ntf, index) in contents"
              :key="index"
            >
              <div class="timeline-info">
                <!-- :class="[ntf.read.length < 1 ? 'text-primary' : '', 'font-semibold']" -->
                <p>{{ ntf.title | truncate(40) }}</p>
                <!-- <small v-if="ntf">{{ churchEmail }}</small> -->
              </div>
              <small class="text-grey activity-e-time">{{
                elapsedTime(ntf.createdAt)
              }}</small>
              <hr class="opacity-25 my-5" />
            </li>
            <p class="my-5 py-3" v-if="contents.length == 0">
              No Notification right now
            </p>
          </ul>
        </div>
        <!---->
      </div>
      <div
        class="vx-card__code-container collapsed"
        style="max-height: 0px; display: none"
      >
        <div class="code-content">
          <pre
            class="language-markup"
          ><code class="language-markup"></code></pre>
        </div>
      </div>
    </div>

    <vs-popup
      v-if="prevNotif"
      class="holamundo"
      :title="churchEmail"
      :active.sync="notificationPopUp"
    >
      <p class="mt-1 mb-1">{{ prevNotif.title }}</p>
      <p class="italic text-sm mb-5 mt-4">
        {{ elapsedTime(prevNotif.createdAt) }}
      </p>
      <vs-button
        color="primary"
        type="border"
        icon="clear"
        icon-before
        @click="clearNotification(prevNotif._id)"
        >Clear</vs-button
      >
    </vs-popup>
  </div>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.pgLoading;
    },
  },
  data() {
    return {
      Notifications: [
        {
          title: "Notification Title 1 here",
          createdAt: "12 March 2020",
        },
      ],
      contents: "",
      notificationPopUp: false,
      prevNotif: {},
      churchEmail: "",
    };
  },
  mounted() {
    // this.openLoadingInDiv();
    this.$store.commit("pgLoading", true);

    this.getContent();
    // this.getNotifications();
  },
  methods: {
    getContent() {
      let fetch = {
        path: "notifications",
      };

      this.$store
        .dispatch("getContents", fetch)
        .then((resp) => {
          console.log(resp.data.data);
          this.contents = resp.data.data;

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
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
    clearNotification(id) {
      this.notificationPopUp = false;
      this.openLoadingInDiv();
      this.$store
        .dispatch("clearNotification", id)
        .then((resp) => {
          //   console.log(resp);
          this.getNotifications();
          this.$vs.notify({
            title: "Clear Notification",
            text: "Notification Cleared",
            color: "success",
          });
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            if (err.response.status == 400) {
              console.log(err.response.data);
              this.$vs.notify({
                title: "Clear Notification",
                text: err.response.data,
                color: "warning",
              });
            } else {
              this.$vs.notify({
                title: "Clear Notification",
                text: "Unable to Clear Notification, try again!",
                color: "warning",
              });
            }
          } else {
            this.$vs.notify({
              title: "Clear Notification",
              text: "Unable to Clear Notification, try again!",
              color: "warning",
            });
          }
        });
    },
    clearAll() {
      this.openLoadingInDiv();
      this.$store
        .dispatch("clearNotifications")
        .then((resp) => {
          this.Notifications = [];
          //   console.log(resp);
          this.$vs.notify({
            title: "Clear Notifications",
            text: "All Notifications Cleared",
            color: "success",
          });
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          if (err.response) {
            if (err.response.status == 400) {
              console.log(err.response.data);
              this.$vs.notify({
                title: "Clear Notifications",
                text: err.response.data,
                color: "warning",
              });
            } else {
              this.$vs.notify({
                title: "Clear Notifications",
                text: "Unable to Clear Notifications, try again!",
                color: "warning",
              });
            }
          } else {
            this.$vs.notify({
              title: "Clear Notifications",
              text: "Unable to Clear Notifications, try again!",
              color: "warning",
            });
          }
        });
    },
    elapsedTime(startTime) {
      const x = new Date(startTime);
      const now = new Date();
      let timeDiff = now - x;
      timeDiff /= 1000;

      const seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      const minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      const hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      const days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      const years = timeDiff;

      if (years > 0) {
        return `${years + (years > 1 ? " Years " : " Year ")}ago`;
      } else if (days > 0) {
        return `${days + (days > 1 ? " Days " : " Day ")}ago`;
      } else if (hours > 0) {
        return `${hours + (hours > 1 ? " Hrs " : " Hour ")}ago`;
      } else if (minutes > 0) {
        return `${minutes + (minutes > 1 ? " Mins " : " Min ")}ago`;
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? " sec ago" : "just now");
      }

      return "Just Now";
    },
    ReadNotification(ntf, index) {
      // this.notificationPopUp = true;
      // this.churchEmail = this.Notifications[index].churchId.email;
      // this.prevNotif = ntf;
      // this.Notifications[index].read.push(this.prevNotif._id);
      // this.readReceipt(this.prevNotif._id);
    },
    readReceipt(id) {
      this.$store
        .dispatch("readNotification", id)
        .then((resp) => {})
        .catch((err) => {});
    },
    getNotifications() {
      let fetch = {
        path: "notifications",
      };

      this.$store
        .dispatch("getContents", fetch)
        .then((resp) => {
          this.Notifications = resp.data.data;

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
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
              text: "Unable to get Notifications",
              color: "dark",
              icon: "error",
              position: "bottom-center",
            });
          }
          this.$store.commit("pgLoading", false);
        });
    },
    openLoadingInDiv() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
    },
  },
};
</script>
        