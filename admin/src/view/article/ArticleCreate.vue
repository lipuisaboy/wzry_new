<template>
  <div class="article-create">
    <h2>{{id? '编辑':'新建'}}文章</h2>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option 
          v-for="item in categories" 
          :key="item._id" 
          :label="item.name" 
          :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" 
        useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props:{
    id:{
      type:String
    }
  },
  components:{
    VueEditor
  },
  data(){
    return{
      model:{},
      categories:[]
    }
  },
  created(){
    this.getCategories()
    this.id && this.fetch()
  },
  methods:{
    save(){
      if(this.id){
        this.$http.put(`/common/articles/${this.id}`,this.model).then(() => {
           this.$message({
             type:'success',
             message:'修改成功'
        })
        this.$router.push('/article/list')
        })
      }
      else{
         this.$http.post('/common/articles',this.model).then(() => {
         this.$message({
           type:'success',
           message:'保存成功'
        })
        this.$router.push('/article/list')
      })
      }
    },
    getCategories(){
      this.$http.get('/common/categories').then(res => {
        this.categories = res.data
      })
    },
    fetch(){
      this.$http.get(`/common/articles/${this.id}`).then(res => {
        this.model = res.data
      })
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      this.$http.post('/upload',formData).then(res => {
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
          resetUploader();
      })
    }
  }
}
</script>