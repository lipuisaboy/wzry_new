<template>
  <div class="item-list">
    <el-table :data="model">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem">
        </template>
      </el-table-column>
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
      model:[]
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch(){
      this.$http.get('/common/items').then(res => {
        this.model = res.data
      })
    },
    editClick(scope){
      this.$router.push(`/item/edit/${scope.row._id}`)
    },
   removeClick(scope){
        this.$confirm(`此操作将永久删除"${scope.row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/common/items/${scope.row._id}`).then(() => {
             this.$message({
              type: 'success',
              message: '删除成功!'
          });
            this.fetch()
          })
        })
    }
  }
}
</script>