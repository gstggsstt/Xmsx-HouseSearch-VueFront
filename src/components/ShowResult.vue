<template>
    <div>
        <a-input-search
                :defaultValue="$route.params.kw"
                placeholder="输入关键字"
                enter-button="搜索"
                size="large"
                @search="onSearch"
        />
        <a-row>
            <a-col span="12">

            </a-col>
        </a-row>
        <a-radio-group v-model="mode" :options="opts"> </a-radio-group>
        <div>
            <a-checkbox v-model="filterPrice"/>价格区间：
            <a-input-number :disabled="!filterPrice" step="1000" v-model="low" @change="lowChange"/>
            ~ <a-input-number :disabled="!filterPrice" step="1000" v-model="high" @change="highChange"/>
        </div>
        <br/>
        <a-spin v-if="loading"/>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
            <div slot="footer">共搜索到{{listData.length}}条记录</div>
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <div slot="extra" style="width: 300px">
                    <img :src="item.picture[0]" style="height: 230px; width: 300px"/>
                </div>
                <a-list-item-meta :description="item.detailMessage">
                    <a slot="title" :href="item.url">{{ item.title }}</a>
                </a-list-item-meta>
                价格：{{item.price}}
                小区：{{item.community}}
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
    const listData = [];

    export default {
        name: 'ShowResult',
        data() {
            return {
                loading: false,
                low: 0,
                high: 0,
                filterPrice: false,
                listData,
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                },
                opts:[
                    {label:'综合', value:'any'},
                    {label:'标题', value:'title'},
                    {label:'小区', value:'community'},
                ],
                mode:'any',
            };
        },
        mounted() {
            this.onSearch(this.$route.params.kw);
        },
        methods: {
            onSearch: function (value) {
                this.loading=true;
                this.$axios.get('/search/'+this.mode, {
                    params: { kw: value, token: this.$token.str}
                }).then(res => {
                    this.loading=false;
                    let temp = []
                    for(let x of this.listData) {
                        x.picture = x.picture.split('\n');
                        for (let i=0;i<x.picture.length;++i)
                            this.$set(x.picture, i, x.picture[i].substr(x.picture[i].indexOf(':')+1));
                    }
                    for(let i=0;i<res.data.length;++i) {
                        if (this.filterPrice  && (res.data[i].price > this.high || res.data[i].price < this.low)) continue;
                        temp.push(res.data[i])
                    }
                    this.listData=temp
                })
            },
            lowChange: function (value) {
                this.low = value;
                if(this.high<value)
                    this.high = value;
            },
            highChange: function (value) {
                this.high = value;
            }
        },
    };
</script>

<style scoped>

</style>