<template>
  <div class="article-list">
    <h2>文章列表</h2>
    <el-table :data="model">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="editClick(scope)" type="primary" size="smell">编辑</el-button>
          <el-button @click="removeClick(scope)" type="danger" size="smell">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:[]
    }
  },
  created(){
    this.getArticle()
  },
  methods:{
    getArticle(){
      this.$http.get('/common/articles').then(res => {
        this.model = res.data
      })
    },
    editClick(scope){
      this.$router.push(`/article/edit/${scope.row._id}`)
    },
    removeClick(scope){
        this.$confirm(`此操作将永久删除"${scope.row.title}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/common/articles/${scope.row._id}`).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
           this.getArticle()
          })
        })
    }
  }
}
</script>