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
            <div class="mt-10">
              <vs-chip color="primary" class="mr-2">
                {{ content.content_type | capitalize }} Content
              </vs-chip>
              <vs-chip class="mr-2" v-if="content.maternal">
                {{ content.maternal | capitalize }}
              </vs-chip>
              <vs-chip class="mr-2" v-if="content.month">
                {{ content.month | capitalize }} Month
              </vs-chip>
              <vs-chip class="mr-2" v-if="content.pregnancy_week">
                Pregnancy - {{ content.pregnancy_week | capitalize }} Month
              </vs-chip>
            </div>
            <img
              :src="content.image"
              class="mb-10 mt-10"
              style="width: 100%"
              alt=""
            />
            <div v-html="content.body" class="mb-10"></div>
            <div v-if="content.mother_body.name">
              <hr class="opacity-3" />
              <h4 class="mt-5">Mother's content</h4>
              <h5>{{ content.mother_body.name }}</h5>
              <img
                :src="content.mother_body.image"
                class="mb-10 mt-10"
                style="width: 100%"
                alt=""
              />
              <div v-html="content.mother_body.body" class="mb-10"></div>
            </div>

            <div v-if="content.your_baby.name">
              <hr class="opacity-3" />
              <h4 class="mt-5">Baby's content</h4>
              <h5>{{ content.your_baby.name }}</h5>
              <img
                :src="content.your_baby.image"
                class="mb-10 mt-10"
                style="width: 100%"
                alt=""
              />
              <div v-html="content.your_baby.body" class="mb-10"></div>
            </div>
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
    this.getContent();
  },
  methods: {
    getContent() {
      this.$store.commit("pgLoading", true);
      let id = this.$route.params.id;

      this.$store
        .dispatch("getContent", id)
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