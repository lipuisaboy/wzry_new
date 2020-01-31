<template>
  <div class="item">
    <h2>{{id? '编辑':'新建'}}物品</h2>
    <el-form @submit.native.prevent="save()" labelWidth="120px">
      <el-form-item label="物品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="afterUpLoad">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model:{}
    }
  },
  created(){
    this.id && this.fetch()
  },
  methods:{
    save(){
      if(this.id){
        this.$http.put(`/common/items/${this.id}`,this.model).then(()=>{
          this.$message({
            type:'success',
            message:'修改成功'
          })
          this.$router.push('/item/list')
        })
      }
      this.$http.post('/common/items',this.model).then(() => {
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.$router.push('/item/list')
      })
    },
    afterUpLoad(res){
      window.console.log(res)
      this.$set(this.model, 'icon', res.url)
    },
    fetch(){
      this.$http.get(`/common/items/${this.id}`).then(res => {
        this.model = res.data
      })
    }
  }
}
</script>