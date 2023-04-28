<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <form id="noodle-form" action="POST" @submit="createNoodle">
            <div class="teste1">
                <!--Nome cliente-->
                <div class="input-container">
                    <label for="nome">Nome do Cliente:</label>
                    <input type="text" name="nome" id="nome" v-model="nome" placeholder="Digite o seu nome" required>
                </div>
                <!--Tipo de massa-->
                <div class="input-container">
                    <label for="massa">Escolha o tipo de massa:</label>
                    <select name="massa" id="massa" v-model="massa" required>
                        <option value="">Selecione a sua massa</option>
                        <option v-for="massa in massas" :key="massa.id" :value="massa.id">{{ massa.tipo }}</option>
                    </select>
                </div>

                <!--Tipo de Molho-->
                <div class="input-container">
                    <label for="molho">Escolha o tipo de molho:</label>
                    <select name="molho" id="molho" v-model="molho" required>
                        <option value="">Selecione o molho</option>
                        <option v-for="molho in molhos" :key="molho.id" :value="molho.id">{{ molho.tipo }}</option>
                    </select>
                </div>
            </div>
            
            <div class="teste2">
                <!--Ingredientes-->
                <div  id="ingredientes-container" class="input-container">
                    <label id="ingredientes-title" for="ingredientes">Selecione os ingredientes:</label>
                    <div class="ingredientes-list">
                        <div class="checkbox-container" v-for="ingrediente in ingredientes" :key="ingrediente.id">
                            <input type="checkbox" name="ingredientes" v-model="ingredientesSelected" :value="ingrediente.id">
                            <span>{{ ingrediente.nome }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="input-container">
                <input type="submit" class="btn-submit" value="Salvar">
            </div>
        </form>
    </div>
</template>

<script setup>
    import {supabase} from '../supabase.js'
</script>

<script>
import Message from './Message.vue'

export default {
    name: 'NoodleForm',
    data(){
        return {
            nome: null,
            massa: "",
            molho: "",
            ingrediente: null,
            ingredientes: [],
            ingredientesSelected: [],
            massas: [],
            molhos: [],
            status: 'Solicitado',
            msg: null
        }
    },
    components: {
        Message
    },
    methods: {
        
        // buscar dados BD (GET)
        async initData(){
            this.massas = await this.fetchData('massas')
            this.molhos = await this.fetchData('molhos')
            this.ingredientes = await this.fetchData('ingredientes')
            this.status = await this.fetchData('status')
        },
        async fetchData(data) {
            const req = await fetch(`https://dutqpwbtiwteslfgsnhu.supabase.co/rest/v1/${data}`, {
                method: "GET",
                headers: { "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1dHFwd2J0aXd0ZXNsZmdzbmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3NTM0OTQsImV4cCI6MTk5NzMyOTQ5NH0.ZouC2RrUQFq4plguOTGAOip8k3HzoutakGcSgEq90yA" }
            })
            return await req.json()
        },

        // montar macarrão
        async createNoodle(e){
            e.preventDefault()

            const noodle = {
                nome: this.nome,
                massa: this.massa,
                molho: this.molho,
                ingredientes: Array.from(this.ingredientesSelected),
            }
            const noodleJson = JSON.stringify(noodle)
            console.log(noodle)

            // cliente 
            let cliente = await supabase
                .from('clientes')
                .select('*')
                .eq('nome_cliente', noodle.nome)

            if (cliente.data.length == 0) {
                cliente = await supabase
                .from('clientes')
                .insert(
                    { 'nome_cliente': noodle.nome }
                ).select()
            }

            // inserir dados de macarrão no BD
            const macarraoReq = await supabase
                .from('macarrao')
                .insert([
                    { 
                        'id_cliente': cliente.data[0].id, 
                        'id_massa': noodle.massa, 
                        'id_molho': noodle.molho 
                    },
                ]).select()


            const ingredientesReq = await supabase
                .from('macarrao_ingredientes')
                .insert(noodle.ingredientes.map(ingrediente => {
                    return { 
                        'id_ingredientes': ingrediente, 
                        'id_macarrao': macarraoReq.data[0].id
                    }
                }))

            // criar mensagem do pedido
            this.msg = `Pedido registrado com sucesso!`

            // limpar mensagem
            setTimeout(function(){
                this.msg = " "
                window.location.reload(1)
            },3000)

            // limpar campos
            this.nome = ""
            this.massa = ""
            this.molho = ""
            this.ingredientesSelected = []
           
        },
    },
    mounted(){
        this.initData()
    }
}

</script>


<style scoped>
    #noodle-form {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .teste1 {
        display: flex;
        gap: 1rem;
        width: 60%;
    }

    .teste2 {
        display: flex;
        width: 60%;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
        border-left: 5px solid #60F0DA;
        margin-bottom: 15px;
        padding: 5px 10px;
    }

    input, select {
        padding: 5px 10px;
        width: 300px;
    }

    #ingredientes-container {
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
       
    }

    .ingredientes-list {
        width: 100%;
        display: flex;
        column-gap: 2rem;
        flex-wrap: wrap;
    }

    #ingredientes-title {
        width: 100%;
    }

    .checkbox-container {
        display: flex;
        align-items: flex-start;
        width: max-content;
        margin-bottom: 20px;
    }

    .checkbox-container input, .checkbox-container span {
        width: auto;
    }

    .checkbox-container span {
        margin-left: 6px;
    }

    .btn-submit {
        background-color: #60F0DA;
        color: #362d21;
        font-weight: bold;
        padding: 10px;
        font-size: 16px;
        border: 3px solid #60F0DA;
        cursor: pointer;
        transition: .6s;
    }

    .btn-submit:hover{
        background-color: transparent;
        border: 3px solid #362d21;
    }

</style>