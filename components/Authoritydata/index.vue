<template>
  <div class="table">
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
    >
      <el-table-column
        property="postTime"
        label="时间"
        width="180"
      ></el-table-column>
      <el-table-column
        property="userName"
        label="权限名称"
        width="180"
      ></el-table-column>
      <el-table-column
        property="subName"
        label="接口数量"
        width="150"
      ></el-table-column>
      <el-table-column #default="scope" label="管理">
        <el-button type="success"
          >接口管理</el-button
        >
      </el-table-column>
      <el-table-column #default="scope" label="操作">
        <el-button type="success"
          >查看</el-button
        >
        <el-button type="danger"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss">

</style>
