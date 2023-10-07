<template>
  <div
    v-if="containerAvailable"
    ref="container"
    class="floating-images-container"
  >
    <div
      v-for="(image, index) in images"
      :key="index"
      class="floating-image"
      :style="getImageStyle(index)"
    >
      <img
        :src="image"
        alt="Floating Image"
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        // Add other image URLs here
      ],
      mouseX: 0,
      mouseY: 0,
      imagePositions: [],
      containerAvailable: false,
    };
  },
  mounted() {
    this.containerAvailable = true;
    document.addEventListener("mousemove", this.handleMouseMove);
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.handleMouseMove);
  },
  methods: {
    getRandomPosition() {
      if (!this.containerAvailable) return { x: 0, y: 0 };
      const containerWidth = this.$refs.container.clientWidth;
      const containerHeight = this.$refs.container.clientHeight;
      const x = Math.random() * (containerWidth - 200);
      const y = Math.random() * (containerHeight - 200);
      return { x, y };
    },
    getImageStyle(index) {
      if (!this.containerAvailable) return { x: 0, y: 0 };
      const containerWidth = this.$refs.container.clientWidth;
      const containerHeight = this.$refs.container.clientHeight;
      const parallaxX = (this.mouseX - containerWidth / 2) / 20;
      const parallaxY = (this.mouseY - containerHeight / 2) / 20;
      const { x, y } = this.imagePositions[index] || this.getRandomPosition();
      this.imagePositions[index] = { x, y };
      return {
        transform: `translate(${parallaxX + x}px, ${parallaxY + y}px)`,
        transition: "transform 10s linear",
      };
    },
    handleMouseMove(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    },
  },
};
</script>

<style scoped>
html {
  height: 100vh;
  width: 100vw;
}
.floating-images-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-image {
  position: absolute;
  transition: transform 0.3s ease-in-out;
  img {
    max-width: 20%;
    height: auto;
  }
}
</style>
