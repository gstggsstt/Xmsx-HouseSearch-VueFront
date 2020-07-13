<template>
    <div id="login" style="text-align: center">
        <a-alert v-if="onError" type="error" :message="message" banner />
        <a-row style="margin-top: 150px">
            <a-col :span="8"></a-col>
            <a-col :span="8">
                <a-card>
                    <span slot="title">登录</span>
                    <a-form :form="loginForm" @submit="handleSubmit" :label-col="{span:5}">
                        <a-form-item label="用户名">
                            <a-input v-decorator="['username',{rules:[{required:true, message:'请输入用户名'}]}]"></a-input>
                        </a-form-item>
                        <a-form-item label="密码">
                            <a-input-password v-decorator="['password',{rules:[{required:true, message:'请输入密码'}]}]"></a-input-password>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" block>登录</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
            <a-col :span="8"></a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: this.$form.createForm(this, {name: 'loginForm'}),
                onError: false,
                message: "",
            }
        },
        name: "Login",
        methods: {
            handleSubmit: function (e) {
                e.preventDefault();
                this.loginForm.validateFields((err, values)=>{
                    if(!err){
                        this.$axios.post('/user/login', {
                            username: values.username,
                            password: values.password,
                        }).then(res => {
                            if(res.data.state===false) {
                                this.message = res.data.message;
                                this.onError = true;
                            }
                            else {
                                this.$token.str = res.data.token;
                                console.log(this.$token.str);
                                this.$router.push({name:"home"});
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
