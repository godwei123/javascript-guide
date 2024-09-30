<script lang="ts" setup></script>

<template>
  <div class="container">
    <div class="logo-container">
      <div class="letter c">
        <span>C</span>
      </div>
      <div class="letter s1">
        <span>S</span>
      </div>
      <div class="letter s2">
        <span>S</span>
      </div>
      <div class="triangle-box">
        <div class="triangle"></div>
      </div>
      <div class="circle-box">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
      </div>
      <div class="circle-border-box">
        <div class="circle-border">
          <div></div>
        </div>
      </div>
      <div class="rectangle-box">
        <div class="rectangle">
          <div></div>
        </div>
      </div>
      <div class="wave-shape w1">~</div>
      <div class="wave-shape w2">~</div>
      <div class="wave-shape w3">~</div>
      <div class="line-shape l1"></div>
      <div class="line-shape l2"></div>
      <div class="line-shape l3"></div>
      <div class="line-shape l4"></div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  font-family: "IBM Plex Mono", monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 250px);
  background: #232840;
}

.logo-container {
  height: 320px;
  width: 640px;
  position: relative;
}

.logo-container > * {
  position: absolute;
}

.letter {
  z-index: 1;
  font-size: 230px;
  color: #f649a7;
  font-weight: 800;
  line-height: 1;
  display: flex;
  align-items: center;
}

@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.c {
  top: 50%;
  transform: translateY(-50%);
  text-shadow: 8px 8px 0 #3c52d1;
  left: 75px;
}

.c span {
  transform: scale(0);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: pop;
  animation-duration: 0.3s;
  animation-delay: 0.1s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.s1 {
  z-index: 3;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.s1 span {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: pop;
  animation-duration: 0.3s;
  animation-delay: 0.2s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: scale(0);
}

.s2 {
  text-align: right;
  top: 50%;
  right: 75px;
  transform: translateY(-50%);
  background: url("../assets/point.svg");
  -webkit-background-clip: text;
  color: transparent;
}

.s2 span {
  text-align: right;
  top: 50%;
  right: 75px;
  transform: translateY(-50%) scale(0);
  background: url("../assets/point.svg");
  -webkit-background-clip: text;
  color: transparent;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: pop;
  animation-duration: 0.3s;
  animation-delay: 0.3s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.text {
  font-size: 38px;
  font-style: italic;
  color: #9ac6c9;
}

@keyframes appear {
  100% {
    opacity: 1;
  }
}

.t1 {
  top: 0;
  left: 0;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: appear;
  animation-duration: 0.3s;
  animation-delay: 2.2s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.t2 {
  bottom: 0;
  right: 0;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: appear;
  animation-duration: 0.3s;
  animation-delay: 2.5s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.wave-shape {
  font-size: 70px;
  line-height: 1;
  color: #9ac6c9;
  z-index: 4;
}

.w1 {
  top: 64px;
  right: 36px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideRight;
  animation-duration: 0.4s;
  animation-delay: 1.9s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(-32px);
}

.w2 {
  top: 80px;
  right: 30px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideRight;
  animation-duration: 0.4s;
  animation-delay: 2s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(-32px);
}

.w3 {
  top: 96px;
  right: 23px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideRight;
  animation-duration: 0.4s;
  animation-delay: 2.1s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(-32px);
}

.rectangle-box {
  z-index: 2;
  width: 172px;
  right: 65px;
  top: 50%;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slidetop;
  animation-duration: 0.6s;
  animation-delay: 0.8s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: scale(0) translateY(-100px) rotate(180deg);
}

.rectangle {
  transform: translateY(-50%) rotate(45deg);
}

.rectangle div {
  border: 8px solid #3c52d1;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  box-sizing: content-box;
  box-shadow: 6px 6px 0 0 #9ac6c9;
}

@keyframes slidetop {
  0% {
    opacity: 0;
    transform: translateY(-200px) rotate(180deg);
  }

  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

.circle-border-box {
  width: 205px;
  top: 50%;
  left: calc(50% - 8px);
}

.circle-border {
  transform: translateX(-50%) translateY(-50%);
}

.circle-border > div {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border: 8px dashed #3c52d1;
  border-radius: 100%;
  box-sizing: content-box;
}

@keyframes popSpin {
  0% {
    transform: scale(0) rotate(0);
  }
  50% {
    transform: scale(1.2) rotate(800deg);
  }
  100% {
    transform: scale(1) rotate(2turn);
  }
}

.circle-border div {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: popSpin;
  animation-duration: 0.6s;
  animation-delay: 0.5s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: scale(0);
}

@keyframes triangle {
  0% {
    transform: scale(0) rotate(0);
  }
  50% {
    transform: scale(1.2) rotate(800deg);
  }
  100% {
    transform: scale(1) rotate(2turn);
  }
}

.triangle-box {
  width: 115px;
  top: 144px;
  left: 12px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: triangle;
  animation-duration: 0.6s;
  animation-delay: 2.8s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: scale(0);
}

.triangle {
  width: 100%;
  border: 80px solid transparent;
  border-bottom-color: #3c52d1;
  border-width: 0 58px 80px;
}

.line-shape {
  height: 4px;
  width: 80px;
  background: #9ac6c9;
}

.l1 {
  top: 198px;
  left: 76px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideLeft;
  animation-duration: 0.4s;
  animation-delay: 1.4s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(32px);
}

.l2 {
  top: 214px;
  left: 70px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideLeft;
  animation-duration: 0.4s;
  animation-delay: 1.5s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(32px);
}

.l3 {
  top: 230px;
  left: 64px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideLeft;
  animation-duration: 0.4s;
  animation-delay: 1.6s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(32px);
}

.l4 {
  top: 246px;
  left: 70px;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: slideLeft;
  animation-duration: 0.4s;
  animation-delay: 1.6s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(32px);
}

.circle-box {
  z-index: 0;
  left: 80px;
  top: 96px;
  transform: rotate(-20deg);
  width: 320px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 50%;
  height: 100%;
  background: #9ac6c9;
  border-radius: 50%;
}

.c1 {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: pop;
  animation-duration: 0.3s;
  animation-delay: 0.9s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: scale(0);
}

@keyframes circle {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(-40px);
  }
}

.c2 {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: circle;
  animation-duration: 0.5s;
  animation-delay: 1.1s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateX(-100%);
}

.c2 {
  transform: translateX(-32px);
}
</style>
