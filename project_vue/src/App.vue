<template>
  <div>
    <Navbar />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>


<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Helvetica;
  }

  body {
    min-height: 100vh;
    background-color: #F5FBFD;
  }

  .main-container {
    margin: 50px;
    min-height: 600px;
  }

  h1 {
    color: #222;
    text-align: center;
    font-size: 45px;
    margin-bottom: 30px;
  }



</style>