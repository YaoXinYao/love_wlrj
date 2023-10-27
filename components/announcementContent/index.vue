<template>
    <div class="announcement">
        <div class="content">
            <el-timeline>
                <el-timeline-item center placement="top" :timestamp="timestamp">
                    <el-card>
                        <h2>{{ title }}</h2>
                        <p>{{ content }}</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item center timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item center timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item center timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item center timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item center timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item center timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>Update Github template</h4>
                        <p>Tom committed 2018/4/12 20:46</p>
                    </el-card>
                </el-timeline-item>

            </el-timeline>
        </div>
    </div>
</template>

<script setup lang="ts">

export interface IProps {
    content:string,
    timestamp: string,
    size?: string,
    type?:string,
    icon?: string,
    title?: string,
}



const Props = withDefaults(defineProps<IProps>(),{
    content:'Custom',
    timestamp: '2018/4/17',
    title: '考核通知'
})


</script>

<style scoped lang="scss">
.announcement{
    overflow: hidden;
    padding: 24px;
    width: 90%;
    display: flex;
    flex-direction: column;
    border: 1px solid #e3e8f7;
    border-radius: 12px;
    background: white;
    .content{
        width:100%;
        height: 100%;
        overflow-y: auto;
    }
    .content::-webkit-scrollbar{
        width:0px
    }

}
</style>