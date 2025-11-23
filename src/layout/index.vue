<template>
  <div class="relative h-full w-full clearfix">
    <!-- 左侧 menu -->
    <sidebar id="guide-sidebar" class="sidebar-container" />
    <div
      class="main-container min-h-full transition-[margin-left] duration-[0.28s] ml-[210px] relative"
    >
      <div class="fixed top-0 right-0 z-[9] w-[calc(100%-210px)]">
        <!-- 顶部的 navbar -->
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
</script>
