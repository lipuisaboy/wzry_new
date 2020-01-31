<template>
  <div class="admin-list">
    <h2>管理员列表</h2>
    <el-table :data="model">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
    this.getAdmin()
  },
  methods:{
    getAdmin(){
      this.$http.get('/common/admins').then(res => {
        this.model = res.data
      })
    },
    editClick(scope){
      this.$router.push(`/admin/edit/${scope.row._id}`)
    },
    removeClick(scope){
        this.$confirm(`此操作将永久删除"${scope.row.username}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/common/admins/${scope.row._id}`).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
           this.getAdmin()
          })
        })
    }
  }
}
</script>