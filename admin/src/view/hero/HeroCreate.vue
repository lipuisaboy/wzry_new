<template>
  <div class="hero-create">
    <h2>{{id? '编辑' : '新建'}}英雄</h2>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-tabs type="border-card" value="base">
        <el-tab-pane label="基础信息" name="base">
          <el-form-item label="姓名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              ref="a"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="afterUpLoad"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader"
              ref="b"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="afterUpLoad2"
            >
              <img v-if="model.bg" :src="model.bg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score v-model="model.scores.difficult" style="margin-top:0.7rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score v-model="model.scores.skills" style="margin-top:0.7rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score v-model="model.scores.attack" style="margin-top:0.7rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score v-model="model.scores.survive" style="margin-top:0.7rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" multiple>
              <el-option v-for="m in items" :key="m._id" :label="m.name" :value="m._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" multiple>
              <el-option v-for="n in items" :key="n._id" :label="n.name" :value="n._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.useTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="primary" @click="addSkills"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index" style="margin-top:2rem">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success="res => $set(item,'icon',res.url)">
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="removeSkills(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="friend">
          <el-button type="primary" @click="addFriend">添加搭档</el-button>
          <el-row>
            <el-col :md="24" v-for="(item,index) in model.partners" :key="index">
              <el-form-item label="搭档">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="h in heroes" 
                          :key="h._id" 
                          :label="h.name" 
                          :value="h._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配合">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="removeFriend(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills:[]
      },
      categories: [],
      items: [],
      heroes:[]
    };
  },
  created() {
    this.getItem();
    this.getCategories();
    this.getHeroes();
    this.id && this.fetch();
  },
  methods: {
    save() {
      if (this.id) {
        this.$http.put(`/common/heroes/${this.id}`, this.model).then(() => {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/hero/list");
        });
      } else {
        this.$http.post("/common/heroes", this.model).then(() => {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/hero/list");
        });
      }
    },
    fetch() {
      this.$http.get(`/common/heroes/${this.id}`).then(res => {
        this.model = Object.assign({}, this.model, res.data);
      });
    },
    getCategories() {
      this.$http.get("/common/categories").then(res => {
        this.categories = res.data;
      });
    },
    getItem() {
      this.$http.get("/common/items").then(res => {
        this.items = res.data;
      });
    },
    getHeroes(){
      this.$http.get("/common/heroes").then(res => {
        this.heroes = res.data;
      })
    },
    afterUpLoad(res) {
      this.$set(this.model, "avatar", res.url);
    },
    afterUpLoad2(res){
      this.$set(this.model, "bg", res.url)
    },
    addSkills(){
      this.model.skills.push({})
    },
    removeSkills(index){
      this.model.skills.splice(index,1)
    },
    addFriend(){
      this.model.partners.push({})
    },
    removeFriend(index){
      this.model.partners.splice(index,1)
    }
  }
};
</script>
