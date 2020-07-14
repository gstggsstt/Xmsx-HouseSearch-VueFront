<template>
    <a-layout id="components-layout-demo-top" class="layout" style="min-height: 100vh">
        <a-layout-header>
            <a-row>
                <a-col span="4">
                    <div class="logo" />
                </a-col>
                <a-col span="18">
                    <a-menu
                            theme="dark"
                            mode="horizontal"
                            :selectable="false"
                            :style="{ lineHeight: '64px', textAlign: 'left'}"
                            @click="clickBar"
                    >
                        <a-menu-item :key="1">
                            主页
                        </a-menu-item>
                        <a-menu-item :key="2">
                            搜索
                        </a-menu-item>
                    </a-menu>
                </a-col>
                <a-col span="2" style="text-align: right">
                    <a-dropdown :trigger="['click']" v-if="this.$token.str!==''">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <a-avatar style="background-color:#87d068" icon="user" />
                        </a>
                        <a-menu slot="overlay" @click="clickMenu">
                            <a-menu-item :key="0">
                                搜索记录
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item :key="1">
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <a-button v-else type="primary" @click="()=>clickMenu({key:2})">登录</a-button>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content>
            <router-view style="min-height: 100%; padding: 50px 50px;"></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            ZJU 软件工程 项目实训 2020 Created by G24
        </a-layout-footer>
    </a-layout>
</template>

<script>
    export default {
        name: "MainFrame",
        methods: {
            clickMenu: function (e) {
                if(e.key===0)
                    this.$router.push({name:'history'});
                if(e.key===1) {
                    this.$token.str="";
                    location.reload();
                }
                if(e.key===2)
                    this.$router.push({name:'login'});
            },
            clickBar: function (e) {
                if(e.key===1)
                    this.$router.push({name:'home'});
                if(e.key===2)
                    this.$router.push({name:'result'});
            }

        }
    }
</script>

<style scoped>
    #components-layout-demo-top .logo {
        width: 90%;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
    }
</style>