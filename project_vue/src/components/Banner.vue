<template>
    <div id="banner">
        <div id="banner-pedido">
            <h2>Faça seu pedido e nos vamos até você!</h2>
            <a href="#pedido" class="btn btn-primary btn-rounded">Fazer Pedido</a>
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
        width: 40%;
        height: 50%;
    }

    #banner-pedido h2 {
        color: #ab9b84;
        font-size: 40px;
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

</style>