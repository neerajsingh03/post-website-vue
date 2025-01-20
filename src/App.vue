<template>
  <!-- <HeaderSection/> -->
    <HeaderSection v-if="!$store.getters.getToken" />
    <HeaderAuth v-else />
  <router-view></router-view>
  <!-- <FooterSection/> -->
</template>

<script>
import HeaderSection from './components/Layout/HeaderSection.vue'
// import FooterSection from './components/Layout/FooterSection.vue';
import HeaderAuth from './components/UserLayout/HeaderAuth.vue';
export default {
  name: 'App',
  components: {
    HeaderSection,
    // FooterSection,
    HeaderAuth,
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

</style>
