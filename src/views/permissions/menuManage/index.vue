<template>
  <div class="body_page menu_manage">
    <div class="body_box menu_manage_box">
      <el-tree
          ref="tree"
          :default-checked-keys="defaultCheckedKeys"
          :data="$store.getters.addRouters"
          :props="treeOptions.defaultProps"
          :empty-text="treeOptions.emptyText"
          :highlight-current = "treeOptions.highlightCurrent"
          :expand-on-click-node = "treeOptions.expandOnClickNode"
          :show-checkbox="treeOptions.showCheckbox"
          :node-key="treeOptions.nodeKey"
          default-expand-all
          :render-content="renderContent"
      >
      </el-tree>

      <el-drawer
          title="我是标题"
          :visible.sync="visible.drawer"
          :direction="direction"
          :append-to-body="true"
          :modal-append-to-body="true"
          :destroy-on-close="true"
      >
        <span>我来啦!</span>
      </el-drawer>
      <div class="Right" :class="{'isRight': isRight}" @click="isRight = !isRight"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuManage",
  data() {
    return {
      isRight: false,
      visible: { drawer: false },
      direction: "rtl",
      defaultCheckedKeys: ['MenuManage', 'Permissions'],
      treeOptions: {
        nodeKey: "name",
        defaultProps: {label: 'name', children: 'children'},
        emptyText: "empty-text",
        highlightCurrent: true,
        expandOnClickNode: false,
        showCheckbox: true,
      }
    }
  },
  methods: {
    onGetTreeCheck() {
      // let getCheckedKeys = this.$refs.tree.getCheckedKeys()
      // let getHalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // console.log(getCheckedKeys)
      // console.log(getHalfCheckedKeys)
      // console.log(getCheckedKeys.concat(getHalfCheckedKeys))
    },
    renderContent(h, { node, data }) {
      const Element = (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <div style="width: 0;flex: 1;display: flex;align-items: center; justify-content: flex-start;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
            <el-tag style="margin-right: 4px;" type="info" size="mini">{data.meta ? data.meta.title : ''}{data.meta.reTitle ? ":" + data.meta.reTitle : ''}</el-tag>
            <el-tag style="margin-right: 4px;" type="default" size="mini">图标:<i style="height: 100%; width: auto;" class={data.meta ? data.meta.icon || '' : ''}/></el-tag>
            <el-tag style="margin-right: 4px;" type="success" size="mini">{data.meta ? data.meta.title : ''}{data.meta.reTitle ? ":" + data.meta.reTitle : ''}</el-tag>
            <el-tag style="margin-right: 4px;" type="warning" size="mini">Name:{node.label}</el-tag>
            <el-tag style="margin-right: 4px;" type="danger" size="mini">Name:{node.label}</el-tag>
          </div>
          <span style="width: auto;padding: 0 12px;border-left: 2px solid rgba(223, 223, 223, .2);">
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.onChangeTree(node, data) }>修改</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.onRemoveTree(node, data) }>删除节点</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.onRemoveTree(node, data) }>新增子节点</el-button>
          </span>
        </span>)
      return Element
    },
    onChangeTree(node, data) {
      this.visible.drawer = true
      console.log("onChangeTree", node, data)
      // this.$refs.tree.setCheckedKeys([]);
    },
    onRemoveTree(node, data) {
      this.isRight = true
      console.log("onRemoveTree", node, data)
      // this.$refs.tree.setCheckedKeys([]);
    }
  }
}
</script>

<style lang="scss" scoped>
.menu_manage{
  .menu_manage_box{
    overflow: hidden;
    position: relative;
    .Right{
      position: absolute;
      top: 0;
      right: 0;
      width: 400px;
      height: 100%;
      background-color: green;
      transform: translateX(100%);
      transition: all .3s;
    }
    .isRight{
      transform: translateX(0%);
    }
  }
}
</style>
