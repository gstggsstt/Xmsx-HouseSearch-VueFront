<template>
    <div>
        <a-list :data-source="listData">
            <a-list-item slot="renderItem" :key="item.keyWord" slot-scope="item" @click = '()=>clickHistory(item.keyWord)'>
                {{item.keyWord}}
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "History",
        data() {
            return {
                listData: [],
            }
        },
        mounted() {
            if(this.$token.str==='')
                this.$router.push({name:'login'})
            else {
                this.$axios.get('/record/list', {
                    params: {token: this.$token.str}
                }).then(res => {
                    this.listData = res.data;
                })
            }
        },
        methods: {
            clickHistory: function (value) {
                this.$router.push({name:'result', params:{kw:value}})
            }
        }
    }
</script>

<style scoped>

</style>