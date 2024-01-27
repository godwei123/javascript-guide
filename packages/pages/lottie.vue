<template>
  <div
    ref="lottieRef"
    :style="getCurrentStyle"
    class="lottie-animation-container"
    @mouseenter="hoverStarted"
    @mouseleave="hoverEnded"
  ></div>
</template>
<script lang="ts" setup>
import lottie, { AnimationDirection, AnimationItem, AnimationSegment } from "lottie-web";
import { computed, nextTick, ref, watch, watchEffect } from "vue";

export type { AnimationDirection, AnimationItem, AnimationSegment } from "lottie-web";

export interface LottieProps {
  animationData: any;
  animationLink: string;
  loop: boolean | number;
  autoPlay: boolean;
  renderer: string;
  rendererSettings: any;
  width: number | string;
  height: number | string;
  speed: number;
  delay: number;
  direction: string;
  pauseOnHover: boolean;
  playOnHover: boolean;
  noMargin: boolean;
  scale: number;
  backgroundColor: string;
  pauseAnimation: boolean;
  assetsPath: string;
  onLoopComplete: () => void;
  onEnterFrame: () => void;
  onSegmentStart: () => void;
  onComplete: () => void;
  onAnimationLoaded: () => void;
}

const props = withDefaults(defineProps<LottieProps>(), {
  animationData: () => ({}),
  animationLink: "",
  loop: true,
  autoPlay: true,
  renderer: "svg",
  rendererSettings: () => ({}),
  width: "100%",
  height: "100%",
  speed: 1,
  delay: 0,
  direction: "forward",
  pauseOnHover: false,
  playOnHover: false,
  noMargin: false,
  scale: 1,
  backgroundColor: "transparent",
  pauseAnimation: false,
  assetsPath: "",
});

const emits = defineEmits<{
  onAnimationLoaded: () => void;
  onComplete: () => void;
  onEnterFrame: () => void;
  onLoopComplete: () => void;
  onSegmentStart: () => void;
}>();
const lottieRef = ref<HTMLElement | null>(null);
const animationData = ref<any>();
let lottieAnimation: AnimationItem | null = null;
let direction: AnimationDirection = 1;

watchEffect(async () => {
  if (props.animationLink != "") {
    // fetch the animation data from the url

    try {
      const response = await fetch(props.animationLink);

      animationData.value = await response.json();

      await nextTick(() => loadLottie());
    } catch (error) {
      console.error(error);
      return;
    }
  } else if (Reflect.ownKeys(props.animationData).length !== 0) {
    // clone the animationData to prevent it from being mutated
    animationData.value = JSON.parse(JSON.stringify(props.animationData));

    await nextTick(() => loadLottie());
  } else {
    throw new Error("You must provide either animationLink or animationData");
  }
});

const loadLottie = () => {
  if (!lottieRef.value) return;

  // check if the animationData has been loaded
  if (!animationData.value) return;

  // destroy the animation if it already exists
  lottieAnimation?.destroy();

  // reset the lottieAnimation variable
  lottieAnimation = null;

  // set the autoplay and loop variables
  let autoPlay = props.autoPlay;
  let loop = props.loop;

  if (props.playOnHover) {
    autoPlay = false;
  }

  // drop the loop by one
  // this is because lottie-web will loop one extra time
  if (typeof loop === "number") {
    if (loop > 0) {
      loop = loop - 1;
    }
  }

  // if the delay is greater than 0, we need to set autoplay to false
  if (props.delay > 0) {
    autoPlay = false;
  }

  const lottieAnimationConfig: any = {
    container: lottieRef.value,
    renderer: props.renderer,
    loop: loop,
    autoplay: autoPlay,
    animationData: animationData.value,
    assetsPath: props.assetsPath,
  };

  // check if the custom rendererSettings is provided

  // if (isEqual(props.rendererSettings, {}) === false) {
  if (Reflect.ownKeys(props.rendererSettings).length !== 0) {
    lottieAnimationConfig.rendererSettings = props.rendererSettings;
  }

  /**
   * If the scale is not 1, we need to set `viewBoxOnly` to true
   * This will remove the translate3d transform from the svg and
   * will allow us to scale the svg using css transform scale
   */
  if (props.scale !== 1) {
    lottieAnimationConfig.rendererSettings = {
      ...lottieAnimationConfig.rendererSettings,
      viewBoxOnly: true,
    };
  }

  // actually load the animation
  lottieAnimation = lottie.loadAnimation(lottieAnimationConfig);

  setTimeout(() => {
    autoPlay = props.autoPlay;

    if (props.playOnHover) {
      lottieAnimation?.pause();
    } else {
      if (autoPlay) {
        lottieAnimation?.play();
      } else {
        lottieAnimation?.pause();
      }
    }

    /**
     * Emit an `onAnimationLoaded` event when the animation is loaded
     * This should help with times, where you want to run functions on the ref of the element
     */
    emits("onAnimationLoaded");
  }, props.delay);

  // set the speed and direction
  lottieAnimation.setSpeed(props.speed);

  if (props.direction === "reverse") {
    lottieAnimation.setDirection(-1);
  }
  if (props.direction === "normal") {
    lottieAnimation.setDirection(1);
  }

  // pause the animation if pauseAnimation or playOnHover is true
  if (props.pauseAnimation) {
    lottieAnimation.pause();
  } else {
    if (props.playOnHover) {
      lottieAnimation.pause();
    }
  }

  // set the emit events
  lottieAnimation.addEventListener("loopComplete", () => {
    if (props.direction === "alternate") {
      lottieAnimation?.stop();
      direction = direction === -1 ? 1 : -1; //invert direction
      lottieAnimation?.setDirection(direction);
      lottieAnimation?.play();
    }
    emits("onLoopComplete");
  });

  lottieAnimation.addEventListener("complete", () => {
    emits("onComplete");
  });

  lottieAnimation.addEventListener("enterFrame", () => {
    emits("onEnterFrame");
  });

  lottieAnimation.addEventListener("segmentStart", () => {
    emits("onSegmentStart");
  });
};

// generate the css variables for width, height and background color
const getCurrentStyle: any = computed(() => {
  let width = props.width;
  let height = props.height;

  // set to px values if a number is passed
  if (typeof props.width === "number") {
    width = `${props.width}px`;
  }

  if (typeof props.height === "number") {
    height = `${props.height}px`;
  }

  return {
    "--lottie-animation-container-width": width,
    "--lottie-animation-container-height": height,
    "--lottie-animation-container-background-color": props.backgroundColor,
    "--lottie-animation-margin": props.noMargin ? "0" : "0 auto",
    "--lottie-animation-scale": props.scale != 1 ? props.scale : "",
  };
});

// function to check if the container is being hovered
const hoverStarted = () => {
  if (lottieAnimation && props.pauseOnHover) {
    lottieAnimation.pause();
  }

  if (lottieAnimation && props.playOnHover) {
    lottieAnimation.play();
  }
};

// function to check if the container is no longer being hovered
const hoverEnded = () => {
  if (lottieAnimation && props.pauseOnHover) {
    lottieAnimation.play();
  }
  if (lottieAnimation && props.playOnHover) {
    lottieAnimation.pause();
  }
};

// watch for changes in props.pauseAnimation
watch(
  () => props.pauseAnimation,
  () => {
    // error if pauseAnimation is true and pauseOnHover is also true or playOnHover is also true
    if ((props.pauseOnHover || props.playOnHover) && props.pauseAnimation) {
      console.error(
        "If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover and playOnHover"
      );
      return;
    }

    // control the animation play state
    if (lottieAnimation) {
      if (props.pauseAnimation) {
        lottieAnimation.pause();
      } else {
        lottieAnimation.play();
      }
    }
  }
);

// method to play the animation
const play = () => {
  if (lottieAnimation) {
    lottieAnimation.play();
  }
};

// method to pause the animation
const pause = () => {
  if (lottieAnimation) {
    lottieAnimation.pause();
  }
};

// method to stop the animation. It will reset the animation to the first frame
const stop = () => {
  if (lottieAnimation) {
    lottieAnimation.stop();
  }
};

const destroy = () => {
  if (lottieAnimation) {
    lottieAnimation.destroy();
  }
};

const setSpeed = (speed: number = 1) => {
  // speed: 1 is normal speed.

  if (speed <= 0) {
    throw new Error("Speed must be greater than 0");
  }

  if (lottieAnimation) {
    lottieAnimation.setSpeed(speed);
  }
};

const setDirection = (direction: "forward" | "reverse") => {
  if (lottieAnimation) {
    if (direction === "forward") {
      lottieAnimation.setDirection(1);
    } else if (direction === "reverse") {
      lottieAnimation.setDirection(-1);
    }
  }
};

const goToAndStop = (frame: number, isFrame: boolean = true) => {
  //value: numeric value.
  //isFrame: defines if first argument is a time based value or a frame based (default true).

  if (lottieAnimation) {
    lottieAnimation.goToAndStop(frame, isFrame);
  }
};

const goToAndPlay = (frame: number, isFrame: boolean = true) => {
  //value: numeric value
  //isFrame: defines if first argument is a time based value or a frame based (default true).

  if (lottieAnimation) {
    lottieAnimation.goToAndPlay(frame, isFrame);
  }
};

const playSegments = (segments: AnimationSegment[], forceFlag: boolean = false) => {
  //segments: array. Can contain 2 numeric values that will be used as first and last frame of the animation. Or can contain a sequence of arrays each with 2 numeric values.
  //forceFlag: boolean. If set to false, it will wait until the current segment is complete. If true, it will update values immediately.

  if (lottieAnimation) {
    lottieAnimation.playSegments(segments, forceFlag);
  }
};

const setSubFrame = (useSubFrame: boolean = true) => {
  // useSubFrames: If false, it will respect the original AE fps. If true, it will update on every requestAnimationFrame with intermediate values. Default is true.
  if (lottieAnimation) {
    lottieAnimation.setSubframe(useSubFrame);
  }
};

const getDuration = (inFrames: boolean = true) => {
  if (lottieAnimation) {
    return lottieAnimation.getDuration(inFrames);
  }
};

const updateDocumentData = (documentData: any, index: number = 0) => {
  if (lottieAnimation) {
    lottieAnimation.renderer.elements[index].updateDocumentData(documentData);
  }
};
defineExpose({
  play,
  pause,
  stop,
  destroy,
  setSpeed,
  setDirection,
  goToAndStop,
  goToAndPlay,
  playSegments,
  setSubFrame,
  getDuration,
  updateDocumentData,
});
</script>
<style scoped>
.lottie-animation-container {
  width: var(--lottie-animation-container-width);
  height: var(--lottie-animation-container-height);
  background-color: var(--lottie-animation-container-background-color);
  overflow: hidden;
  margin: var(--lottie-animation-margin);
}

.lottie-animation-container svg {
  transform: scale(var(--lottie-animation-scale));
}
</style>
