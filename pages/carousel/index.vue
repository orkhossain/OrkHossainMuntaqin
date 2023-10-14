<template>
  <div>
    <swiper
      :effect="'coverflow'"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :coverflow-effect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :modules="modules"
      :initial-slide="currentImageIndex"
      class="mySwiper"
    >
      >
      <swiper-slide
        v-for="(imageUrl, index) in images"
        :key="index"
      >
        <div
          class="imageViewer"
          style="position: relative;"
        >
          <img
            :src="imageUrl"
          >
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
  
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/effect-coverflow";
  import "swiper/css/pagination";
  
  import "./style.css";
  
  // import required modules
  import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    props: {
      images: {
      type: Array,
      default: null, // Set a default value, e.g., 0
    },    
      currentImageIndex: {
      type: Number,
      default: 0, // Set a default value, e.g., 0
    },
    customFunction:  {
      type: Function,
      default: null, // Set a default value, e.g., 0
    },
    
},

    setup() {
      return {
        modules: [Autoplay,EffectCoverflow, Pagination],
      };
    },
    methods: {
    // You can call the function in your component
    hideFullScreenImage() {
      if (typeof this.customFunction === 'function') {
        this.customFunction();
      }
    },
  },
  };
  </script>
  