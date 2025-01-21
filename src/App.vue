<template>
  <!-- <HeaderSection/> -->
    <HeaderSection v-if="!$store.getters.getToken" />
    <HeaderAuth v-else />
  <router-view></router-view>
  <FooterSection v-if="!$store.getters.getToken" />
  <FooterAuth  v-else />
</template>

<script>
import HeaderSection from './components/Layout/HeaderSection.vue'
import FooterSection from './components/Layout/FooterSection.vue';
import HeaderAuth from './components/UserLayout/HeaderAuth.vue';
import FooterAuth from './components/UserLayout/FooterAuth.vue';
export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection,
    HeaderAuth,
    FooterAuth,
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

</style>
