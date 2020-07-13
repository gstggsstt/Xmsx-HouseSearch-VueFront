<template>
    <div style="text-align: center; background: url('/bg.png');background-size: 100% 100%; height: 80vh;">
        <h1 style="margin-top: 20%; color: white; text-shadow: 0px 0px 30px #000; font-size: 48px">房屋信息垂直搜索引擎</h1>
        <a-row>
            <a-col :span="8">
            </a-col>
            <a-col :span="8">
                <a-input-search
                        placeholder="输入关键字"
                        enter-button="搜索"
                        size="large"
                        @search="onSearch"
                />
            </a-col>
            <a-col :span="8">
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            onSearch: function (value) {
                this.$router.push({name:'result', params:{kw:value}});
            }
        }
    }
</script>

<style scoped>

</style>