<template>
  <div class="ad-create">
    <h2>{{id? '编辑':'新建'}}广告</h2>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-tabs value="base" type="border-card">
        <el-tab-pane label="基本标题">
          <el-form-item label="标题">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="详情" name="base">
          <el-button @click="addAd" type="primary">添加广告</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(n,index) in model.items" :key="index" style="margin-top:2rem">
              <el-form-item label="图片">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success="res => $set(n,'image',res.url)">
                    <img v-if="n.image" :src="n.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="跳转链接(URL)">
                <el-input v-model="n.url"></el-input>
              </el-form-item>
              <el-form-item>
                <template>
                  <el-button type="danger" @click="deleteAd(index)">删除</el-button>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 2rem">
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
      model:{
        items:[]
      }
    }
  },
  created(){
    this.id && this.fetch()
  },
  methods:{
    save(){
      if(this.id){
        this.$http.put(`/common/ads/${this.id}`,this.model).then(() => {
           this.$message({
             type:'success',
             message:'修改成功'
        })
        this.$router.push('/ad/list')
        })
      }
      else{
         this.$http.post('/common/ads',this.model).then(() => {
         this.$message({
           type:'success',
           message:'保存成功'
        })
        this.$router.push('/ad/list')
      })
      }
    },
    fetch(){
      this.$http.get(`/common/ads/${this.id}`).then(res => {
        this.model = Object.assign({},this.model,res.data)
      })
    },
    addAd(){
      this.model.items.push({})
    },
    deleteAd(index){
      this.model.items.splice(index,1)
    }
  }
}
</script>