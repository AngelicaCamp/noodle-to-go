<template>
    <div>
        <div class="main-container">
            <h1>Montar macarrão: <a name="pedido"></a></h1>
            <NoodleForm />
        </div>
    </div>
</template>

<script>

import NoodleForm from '../components/NoodleForm.vue'

export default {
    name: 'Registro',
    components: {
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