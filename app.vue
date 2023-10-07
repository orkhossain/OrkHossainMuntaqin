<!-- <template>
  <div>
    <ImageSlider />
  </div>
</template>

<script>
import ImageSlider from "~/components/ImageSlider/App.vue";

export default {
  components: {
    ImageSlider,
  },
};
</script> -->

<script setup lang="ts">
import { useRoute } from 'vue-router'
const message = ref('Nuxt')

const route = useRoute()
</script>

<template>
  <NuxtExampleLayout
    repo="nuxt/examples"
    example="routing/middleware"
  >
    <NuxtPage />

    <template #nav>
      <nav class="flex align-center gap-4 p-4">
        <NuxtLink
          to="/"
          class="n-link-base"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/forbidden"
          class="n-link-base"
        >
          Forbidden
        </NuxtLink>
        <NuxtLink
          to="/redirect"
          class="n-link-base"
        >
          Redirect
        </NuxtLink>
      </nav>
    </template>

    <template #footer>
      <div class="text-center p-4 op-50">
        Current route: <code>{{ route.path }}</code>
      </div>
    </template>
  </NuxtExampleLayout>
</template>

