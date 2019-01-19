<template>
  <div>
    <label v-if="label">{{label}}</label>
    <div>
      <slot></slot>
      <!-- 校验错误信息 -->
      <p class="error" v-if="validateStatus">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import schema from "async-validator";
import { promised, resolve } from "q";

export default {
  inject: ["form"], // 注入form 获取model和rules
  props: ["label", "prop"],
  data() {
    return {
      validateStatus: "",
      errorMessage: ""
    };
  },
  created() {
    this.$on("validate", this.validate);
  },
  mounted() {
    // 挂载到form上时，派发一个添加事件
    if (this.prop) {
      this.$parent.$emit("formItemAdd", this);
    } else {
    }
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        // 检验当前项-依赖库：async-validate
        const descriptor = { [this.prop]: this.form.rules[this.prop] }; // 校验规则
        const validator = new schema(descriptor);
        validator.validate(
          {
              // 使用es6计算属性动态设置key
            [this.prop]: this.form.model[this.prop]
          },
          errors => {
            if (errors) {
              // 校验失败
              this.validateStatus = "error";
              this.errorMessage = errors[0].message;

              resolve(false); // 校验失败-父组件判断使用
            } else {
              // 校验成功
              this.validateStatus = "";
              this.errorMessage = "";

              resolve(true);
            }
          }
        );
      });
    }
  }
};
</script>

<style scoped>
.error {
  color: #f00;
}
</style>