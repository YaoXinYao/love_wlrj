<template>
  <div class="article">
    <div class="articleleft">
      <MarkdownDis :mark-text="markText" />
    </div>
    <div class="articleright"></div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const markText = ref("");
useHeader();
const { data, pending, error, refresh } = await useFetch(
  `http://localhost:3000/api/v1/user/${route.params.id}`
);
console.log(data.value);
markText.value = data.value!.username;
</script>
<style scoped lang="scss">
.article {
  background-color: #f4f8fb;
  margin: auto;
  height: auto;
  width: 11.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem 0;
  .articleleft {
    width: 8rem;
    height: auto;
    background: #fff;
    border-radius: 0.1rem;
    margin-right: 0.14rem;
    padding: 0.68rem 0.46rem 0;
    padding-bottom: 0.5rem;
  }
  .articleright {
    border-radius: 10px;
    width: 2.5rem;
    height: auto;
    background-color: rgb(255, 255, 255);
  }
}
</style>
