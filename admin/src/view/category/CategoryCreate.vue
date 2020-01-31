<template>
  <div class="category-create">
    <h2>{{id? '编辑' : '新建'}}分类</h2>
    <el-form @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parents">
          <el-option v-for="item in parents" 
          :key="item._id" 
          :label="item.name" 
          :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" labelWidth="65px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
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
      model:{},
      parents:[]
    }
  },
  created(){
    this.getParents()
    this.id && this.fetch()
  },
  methods:{
    save(){
      if(this.id){
        this.$http.put(`/common/categories/${this.id}`,this.model).then(() => {
          this.$message({
          type:'success',
          message:'保存成功'
        })
        this.$router.push('/category/list')
        })
      }
      else{
       this.$http.post('/common/categories',this.model).then(() => {
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.$router.push('/category/list')
         })
      }
    },
    fetch(){
      this.$http.get(`/common/categories/${this.id}`).then(res => {
        this.model = res.data
      })
    },
    getParents(){
      this.$http.get('/common/categories').then(res => {
        this.parents = res.data
      })
    }
  }
}
</script>
