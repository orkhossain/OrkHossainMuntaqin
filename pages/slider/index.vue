<template>
  <body>
    <div>
      <div
        id="image-track"
        :data-mouse-down-at="mouseDownAt"
        :data-prev-percentage="prevPercentage"
        :style="[
          !isFullScreen ? { display: 'flex' } : { display: 'none' },

        ]"
      >
        <img
          v-for="(imageUrl, index) in imageUrls"
          :key="index"
          class="image"
          :src="imageUrl"
          draggable="false"
          @click="showFullScreenImage(index)"
        >
      </div>``
    </div>

    <div
      v-if="isFullScreen"
      class="fullscreen-image"
    >
      <Carousel
        :images="imageUrls"
        :current-image-index="currentImageIndex"
        :custom-function="closeFullScreenImage"
      />
    </div>
  </body>
</template>

<script>
import Carousel from "../carousel";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      mouseDownAt: 0,
      prevPercentage: 0,
      isFullScreen: false,
      currentImageIndex: 0, // New property to keep track of the current image index
      imageUrls: [
        "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80",
        "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80",
        "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        // Add other image URLs here
      ],
    };
  },
  computed: {
    carouselImages() {
      // Calculate the subset of images for the carousel in full screen mode
      const startIndex = Math.max(0, this.currentImageIndex - 2);
      const endIndex = Math.min(
        this.currentImageIndex + 2,
        this.imageUrls.length - 1
      );
      return this.imageUrls.slice(startIndex, endIndex + 1);
    },
  },

  mounted() {
    window.addEventListener("mousedown", this.handleOnDown);
    window.addEventListener("touchstart", (e) =>
      this.handleOnDown(e.touches[0])
    );
    window.addEventListener("mouseup", this.handleOnUp);
    window.addEventListener("touchend", (e) => this.handleOnUp(e.touches[0]));
    window.addEventListener("mousemove", this.handleOnMove);
    window.addEventListener("touchmove", (e) =>
      this.handleOnMove(e.touches[0])
    );
  },
  beforeUnmount() {
    window.removeEventListener("mousedown", this.handleOnDown);
    window.removeEventListener("touchstart", (e) =>
      this.handleOnDown(e.touches[0])
    );
    window.removeEventListener("mouseup", this.handleOnUp);
    window.removeEventListener("touchend", (e) =>
      this.handleOnUp(e.touches[0])
    );
    window.removeEventListener("mousemove", this.handleOnMove);
    window.removeEventListener("touchmove", (e) =>
      this.handleOnMove(e.touches[0])
    );
  },
  methods: {
    handleOnDown(e) {
      this.mouseDownAt = e.clientX;
    },
    handleOnUp() {
      this.mouseDownAt = 0;
      this.prevPercentage = this.percentage;
    },
    handleOnMove(e) {
      if (this.mouseDownAt === 0) return;

      const mouseDelta = this.mouseDownAt - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const nextPercentageUnconstrained =
        this.prevPercentage + (mouseDelta / maxDelta) * -100;
      this.percentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      const track = this.$el.querySelector("#image-track");
      track.style.transform = `translate(${this.percentage}%, -50%)`;

      const images = track.querySelectorAll(".image");
      images.forEach((image) => {
        image.style.objectPosition = `${100 + this.percentage}% center`;
      });
    },
    handleOnWheel(event) {
      event.preventDefault(); // Prevent the default scroll behavior

      const delta = event.deltaY; // Get the scroll delta

      const maxDelta = window.innerWidth / 2;
      const nextPercentageUnconstrained =
        this.prevPercentage + (delta / maxDelta) * -100;
      this.percentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      const track = this.$el.querySelector("#image-track");
      track.style.transform = `translate(${this.percentage}%, -50%)`;

      const images = track.querySelectorAll(".image");
      images.forEach((image) => {
        image.style.objectPosition = `${100 + this.percentage}% center`;
      });
    },
    updateBackgroundImage() {
      // Set the background image to the current image
      const background = this.$el.querySelector(".background");
      background.style.backgroundImage =
        "url(" + this.imageUrls[this.currentImageIndex] + ")";
    },
    showFullScreenImage(index) {
      this.currentImageIndex = index;
      this.isFullScreen = true;
    },
    closeFullScreenImage() {
      this.isFullScreen = false;
    },
  },
};
</script>

<style scoped>
body {
  height: 100vh;
  width: 100vw;
  background-color: black;
  margin: 0;
  overflow: hidden;
  padding: 0%;
}

.background {
  z-index: 0;
  /* height: 100%;
  width: 100%; */
}

#image-track {
  z-index: 2;
  display: flex;
  gap: 4vmin;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(0%, -50%);
  user-select: none; /* -- Prevent image highlighting -- */
  animation: fadeIn 0.5s ease;
  /* height: 100%; */
}

.image {
  width: 23vmin;
  height: 33vmin;
  object-fit: cover;
  object-position: 100% center;
  transition: transform 0.3s; /* Add a smooth transition on the transform property */
}

.image:hover {
  transform: scale(1.1); /* Make the image 10% larger on hover */
}

.fullscreen {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: 100% center;
}

.fullscreen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s ease;

}

.fullscreen-image img {
  max-width: 90%;
  max-height: 90%;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.carousel-image {
  width: 100px; /* Adjust the size as needed */
  height: 100px; /* Adjust the size as needed */
  object-fit: cover;
}

/* Add the rest of your CSS styles here */
</style>
