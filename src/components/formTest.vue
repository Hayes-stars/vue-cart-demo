<template>
    <div>
        <h3>{{title}}</h3>
        <!-- model:数据模型 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <!-- prop 用于表达校验 -->
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form> 
        <Br/>
        
        <!-- 自定义表单Demo -->
        <kForm :model="ruleForm" :rules="rules" ref="loginForm2">
            <kFormItem label="用户名" prop="name">
                <inputEvent v-model="ruleForm.name"></inputEvent>
            </kFormItem>
            <kFormItem label="密码" prop="pwd">
                <inputEvent v-model="ruleForm.pwd" type="password"></inputEvent>
            </kFormItem>
            
            <kFormItem>
                <el-button type="primary" @click="submitForm2('ruleForm')">登录</el-button>
            </kFormItem>
        </kForm>

        {{ruleForm}}
    </div>
</template>

<script>
import inputEvent from './inputEvent.vue';
import kFormItem from './formItem.vue';
import kForm from './form.vue';

    export default {
        // props: ['title'],
        props: {
            title: {type: String, required:true}
        },
        components: {
            inputEvent,kFormItem,kForm
        },
        data() {
            return {
                someValue: 'some value',
                ruleForm: {
                    name: '',
                    pwd: '',
                },
                rules: {
                    name:[
                            {required: true, message: '请输入名称'},
                            {min: 6, max: 10, message: '请输入6-10位的用户名'}
                        ],
                    pwd:[{required: true, message: '请输入密码'}],
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.loginForm.validate(valid => {
                    if(valid){
                        alert('提交登录')
                    } else {
                        console.log('校验失败');
                        return false;
                    }
                })
            },
            submitForm2() {
                this.$refs.loginForm2.validate(valid => {
                    if(valid){
                        alert('提交登录')
                    } else {
                        console.log('校验失败');
                        return false;
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>