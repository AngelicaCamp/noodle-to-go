<template>
    <div>
        <Banner />
    </div>
</template>

<script>

import Banner from '../components/Banner.vue'
import NoodleForm from '../components/NoodleForm.vue'

export default {
    name: 'Home',
    components: {
        Banner,
        NoodleForm
    }
    
}
</script>


<style scoped>
    #container-form {
        display: flex;

    }

    img, form {
        width: 50%;
    }


</style>