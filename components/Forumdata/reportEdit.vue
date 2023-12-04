<template>
  <div class="edit">
    <ClientOnly>
      <WangEdit></WangEdit>
    </ClientOnly>
    <div class="footer"></div>
  </div>
</template>
<script lang="ts" setup>
export interface IProps {
  title: string;
}
const props = withDefaults(defineProps<IProps>(), {
  title: "",
});
</script>

<style lang="scss" scoped>
.edit {
  padding: 0 0 30px;
  font-family: "阿里妈妈刀隶体";
}
</style>
