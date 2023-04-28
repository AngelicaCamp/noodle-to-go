<template>
     <div>
        <nav id="navbar">
            <router-link id="logo-url" to="/" class="router-link">
                <img id="image-logo" :src="logo" alt="logo">
            </router-link>
            <!-- <router-link class="router-link" to="/">Home</router-link> -->
            <router-link class="router-link" to="/novo">Registrar Pedido</router-link>
            <router-link class="router-link" to="/pedidos">Pedidos</router-link>
        </nav>
    </div>
</template>


<script>
export default {
    name: 'Navbar',
    data(){
        return {
            logo: '/img/logo.png',
        }
    }
}
</script>


<style scoped>

    #navbar {
        background-color: #2a2319;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 15px 50px;
        height: 15vh;
    }

    #navbar, #logo-url {
        margin: auto;
        margin-left: 0;
    }


    #image-logo {
        width: 90px;
        height: 90px;
    }

    #navbar, .router-link {
        color: #F2AC49;
        display: flex;
        gap: 30px;
        transition: .5s;
        text-decoration: none;
        font-weight: bold;
    }

    .router-link:hover {
        color: white;
        cursor: pointer;
    }

   
</style>


