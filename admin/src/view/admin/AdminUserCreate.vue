<template>
  <div class="admin-create">
    <h2>{{id? '编辑':'新建'}}管理员</h2>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id:{
      type:String
    }
  },
  data(){
    return{
      model:{}
    }
  },
  created(){
    this.id && this.fetch()
  },
  methods:{
    save(){
      if(this.id){
        this.$http.put(`/common/admins/${this.id}`,this.model).then(() => {
           this.$message({
             type:'success',
             message:'修改成功'
        })
        this.$router.push('/admin/list')
        })
      }
      else{
         this.$http.post('/common/admins',this.model).then(() => {
         this.$message({
           type:'success',
           message:'保存成功'
        })
        this.$router.push('/admin/list')
      })
      }
    },
    fetch(){
      this.$http.get(`/common/admins/${this.id}`).then(res => {
        this.model = Object.assign({},this.model,res.data)
      })
    },
  }
}
</script>