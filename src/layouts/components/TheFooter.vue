<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <p>
      <span>Copyright &copy;</span>
      <span class="mr-1">{{ new Date().getFullYear() }}</span>
      <a href="$" target="_blank" rel="nofollow">Teletruck</a>
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p>
    <span class="md:flex hidden items-center">
      <span>Hand-crafted & Made with</span>
      <feather-icon
        icon="HeartIcon"
        svgClasses="stroke-current text-danger w-6 h-6"
        class="ml-2"
      />
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String,
    },
  },
};
</script>
