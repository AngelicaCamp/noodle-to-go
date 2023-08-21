<template>
    <div class="containar-table">
        <Message :msg="msg" v-show="msg" />
        <div id="noodle-table" v-if="noodles">
            <!--Header table-->
            <div>
                <div id="noodle-table-header">
                    <div class="order-id">#</div>
                    <div>Cliente:</div>
                    <div>Massa:</div>
                    <div>Molho:</div>
                    <div>Ingredientes:</div>
                    <div> - </div>
                       
                    
                </div>
            </div>
            <!--Row table-->
            <div id="noodle-table-rows">
                <div class="noodle-table-row" v-for="noodle in noodles" :key="noodle.id">
                    <div class="order-number">{{ noodle.id }}</div>
                    <div>{{ noodle.clientes.nome_cliente }}</div>
                    <div>{{ noodle.massas.tipo }}</div>
                    <div>{{ noodle.molhos.tipo }}</div>
                    <div>
                        <ul v-for="(ingrediente,index) in noodle.ingredientes" :key="index">
                            <li>{{ ingrediente.nome }}</li>
                        </ul>
                    </div>
                    <div>
                        <button class="delete-btn" @click="deletePedido(noodle.id)">Cancelar pedido</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>Não há pedidos no momento!</h2>
        </div>
       
    </div>
</template>

<script setup>
    import {supabase} from '../supabase.js'
</script>

<script>
import Message from '../components/Message.vue'


export default {
    name: 'Dashboard',
    data(){
        return {
            msg: null,
            noodles: [],
            noodle_id: null
        
        }
    },
    components: {
        Message
    },
    methods: {

        // buscar dados pedido
        async getPedidos(){
            const {data, error} = await supabase
            .from('macarrao')
            .select(`*, clientes(*),massas(*),molhos(*),ingredientes(*)`)
            this.noodles = data
        },

        async deletePedido(id){
            const {error} = await supabase
            .from('macarrao')
            .delete()
            .eq('id',id)

            // criar mensagem do pedido
            this.msg = `Pedido cancelado com sucesso!`

            // limpar mensagem
            setTimeout(function(){
                this.msg = " "
                window.location.reload(1)
            },3000)

            // mostrar lista atualizada
            if (!error) {
                this.noodles = this.noodles
                .filter(
                    noodle => noodle.id !== id
                )
            }
           
        }
    },
    mounted(){
        this.getPedidos()
    }
}
</script>

<style scoped>
    #noodle-table {
        margin: 0 auto;
    }

    #noodle-table-header, #noodle-table-rows, .noodle-table-row {
        display: flex;
        flex-wrap: wrap;
    }

    #noodle-table-header {
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    .noodle-table-row {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #CCC;
    }

    #noodle-table-header div, .noodle-table-row div {
        width: 16%;
        
    }

    #noodle-table-header .order-id, .noodle-table-row .order-id {
        width: 16%;
    }

    select {
        padding: 12px 6px;
        margin-right: 12px;
    }

    li {
        list-style-type: none;
    }

    .delete-btn {
      background-color: #60F0DA;
      color:#362d21;
      font-weight: bold;
      border: 2px solid #60F0DA;
      padding: 10px;
      font-size: 16px;
      margin: 0 auto;
      cursor: pointer;
      transition: .5s;
    }
    
    .delete-btn:hover {
      background-color: transparent;
      color: #362d21;
      border: 2px solid #362d21;
    }

    @media screen and (max-width: 700px){

        #noodle-table-header div, .noodle-table-row div {
            width: 20%;
        }

        .delete-btn {
            display: none;
        }

        
    } 


        
    



</style>