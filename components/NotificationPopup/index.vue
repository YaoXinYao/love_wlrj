<template>
    <div v-if="props.isShow" @click="handleShowClick" class="dialog">

    </div>
</template>

<script setup lang="ts">

interface IProps {
    isShow:boolean
}

const emit = defineEmits(['changeClick'])

const props = defineProps<IProps>()

function handleShowClick(){
    emit('changeClick',!props.isShow);
}


</script>

<style scoped lang="scss">
.dialog{
    width:200px;
    position: relative;
    z-index: 100000;
    height: 200px;
    background-color: red;
}
</style>