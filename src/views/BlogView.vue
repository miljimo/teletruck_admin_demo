<template>
  <div v-if="!loading">
    <vs-card>
      <div class="p-3">
        <div class="mb-4">
          <vs-button
            @click="$router.back()"
            color="primary"
            class="font-weight-bold"
            type="flat"
          >
            <vs-icon icon="keyboard_arrow_left" class="mr-2"></vs-icon>
            Back</vs-button
          >
        </div>
        <div class="row justify-content-center">
          <div class="col-md-7">
            <h2 class="my-5 font-bold">{{ content.name }}</h2>
            <div class="mt-10" v-if="content.tag">
              <vs-chip
                v-for="(tag, index) in content.tag"
                :key="index"
                class="mr-2"
              >
                {{ tag }}
              </vs-chip>
            </div>
            <img
              :src="content.image"
              class="mb-10 mt-10"
              style="width: 100%"
              alt=""
            />
            <div v-html="content.body" class="mb-10"></div>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {
    loading() {
      return this.$store.getters.pgLoading;
    },
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.getBlog();
  },
  methods: {
    getBlog() {
      this.$store.commit("pgLoading", true);
      let id = this.$route.params.id;

      this.$store
        .dispatch("getBlog", id)
        .then((resp) => {
          this.content = resp.data.data;

          this.$store.commit("pgLoading", false);
        })
        .catch((err) => {
          this.$store.commit("pgLoading", false);
        });
    },
  },
};
</script>