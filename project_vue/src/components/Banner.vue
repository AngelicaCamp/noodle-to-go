<template>
    <div id="banner">
        <div id="banner-pedido">
            <h2>Bem vindo (a)</h2>
            <router-link class="btn btn-primary btn-rounded" to="/novo">Registrar Pedido</router-link>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Banner'
}
</script>



<style scoped>
    #banner {
        background: linear-gradient( rgba(0, 0, 0, .4), rgba(0, 0, 0, .4
        )), url('/public/img/banner.jpg');
        height: 680px;
        background-size: cover;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 30px;
    }

    #banner-pedido {
        width: 50%;
        height: 50%;
    }

    #banner-pedido h2 {
        color: #ab9b84;
        font-size: 60px;
        padding: 40px 40px;
        word-spacing: 5px;
        text-align: justify;
        box-shadow: 30px #362d21;
    }

    #banner-pedido a {
        text-decoration: none;
    }

    #banner-pedido .btn {
        margin: auto;
        margin-left: 7rem;
        background-color: #60F0DA;
        padding: 12px 20px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 20px;
        transition: .4s;
        color: #362d21;
    }

    @media screen and  (max-width: 700px){

        #banner-pedido h2 {
            font-size: 50px;
            text-align: center;
        }

        #banner-pedido {
            width: 100%;
        }
    }

</style>