<template>
  <div class="category-list">
    <h2>分类列表</h2>
    <el-table :data="model">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="parents.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="editClick(scope)" type="primary" size="small">编辑</el-button>
          <el-button @click="removeClick(scope)" type="danger" size="small">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:[],
    }
  },
  created(){
    this.fetch()
  },
  methods:{
     fetch(){
        this.$http.get('/common/categories').then(res => {
          this.model = res.data
        })
    },
    editClick(scope){
      this.$router.push(`/category/edit/${scope.row._id}`)
    },
    removeClick(scope){
        this.$confirm(`此操作将永久删除"${scope.row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/common/categories/${scope.row._id}`).then(() => {
             this.$message({
              type: 'success',
              message: '删除成功!'
          });
            this.fetch()
          })
        })
    }
  },
}
</script>