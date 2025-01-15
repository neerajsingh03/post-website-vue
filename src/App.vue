<template>
  <HeaderSection/>
  <router-view></router-view>
  <!-- <FooterSection/> -->
</template>

<script>
import HeaderSection from './components/Layout/HeaderSection.vue'
// import FooterSection from './components/Layout/FooterSection.vue';
export default {
  name: 'App',
  components: {
    HeaderSection,
    // FooterSection,
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

</style>
