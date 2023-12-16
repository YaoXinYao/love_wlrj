<template>
    <ClientOnly>
        <div class="proclamation">
            <div class="proclam">
                <div>
                    <h1>最新公告</h1>
                </div>
                <div class="showProclam latest">
                    <div class="proclamaPicture">
                            <img class="proclamaPic" :src="(latestProclamation as any).noticeImg ? (latestProclamation as any).noticeImg : '/img/4.webp' " alt="" >
                            <div class="specialEffects"></div>
                    </div>
                    <div class="proclamaDetail">
                            <div class="proclamaTitle" style="font-size: 24px;">
                                {{(latestProclamation as any).noticeTitle}}
                            </div>
                            <div class="proclamaMatter">
                                {{(latestProclamation as any).noticeContent}}
                            </div>
                            <div class="rightTime">
                                {{(latestProclamation as any).noticeTime}}
                            </div>
                    </div>
                </div>
            </div>

            <template  v-for="(item,index) in sortTIme" :key="index" >
                <div ref="divRef"  
                    class="proclamTitle" 
                    v-show="divDispaly[item.index]"
                    :id="index.toString()"
                    :style="{'transform': divDispaly[item.index] ? 'translateY(0)' : 'translateY(-3rem)',opacity: divDispaly[item.index] ? 1 : 0}" 
                >
                    <div>
                        <h1>{{ index }}</h1>
                    </div>
                </div>
                <div 
                    ref="divCenterRef" 
                    class="proclamCenter" 
                    v-show="divDispaly[item.index]"
                    :style="{'transform': divDispaly[item.index] ? 'translateY(0)' : 'translateY(-3rem)',opacity: divDispaly[item.index] ? 1 : 0}"  

                >
                    <div class="proclams"  >
                        <div class="showProclam proclamList" v-for="items in item.data" :key="items.noticeId">
                            <div class="proclamaPicture">
                                    <img class="proclamaPic" :src="items.noticeImg ? items.noticeImg : '/img/4.webp' "  alt="" >
                                    <div class="specialEffects"></div>
                            </div>
                            <div class="proclamaDetail">
                                    <div class="proclamaTimes">
                                        <el-icon><Calendar /></el-icon> {{ items.noticeTime  }}
                                    </div>
                                    <div style="font-size: 24px;text-align: center;">
                                        {{items.noticeTitle}}
                                    </div>
                                    <div class="proclamaContent">
                                        <!-- {{items.noticeContent}} -->
                                        <p class="proclamaDesc">
                                            {{items.noticeContent}}
                                        </p>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="menus">
            <el-menu>
                <el-sub-menu index="2">
                    <template #title>时间目录</template>
                    <el-menu-item v-for="(item,index) in sortTIme"  :index="index.toString()" :key="index" ><a :href="`#${index}`" style="display: inline-block;width: 100%;">{{ index }}</a></el-menu-item>
                </el-sub-menu>
            </el-menu>
            
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
useHeader();
import {Calendar, Memo} from '@element-plus/icons-vue'
import proclamationStore from '@/store/proclamation'
import {storeToRefs} from 'pinia'

definePageMeta({
    roles:1
})



const ProclamationStore = proclamationStore()

const {latestProclamation,proclamation} = storeToRefs(ProclamationStore)
const time = ref()

let sortTIme = ref()

const divRef = ref()
const divCenterRef = ref()
const divDispaly = ref<boolean[]>([true])
const sideRef = ref(true)

onMounted(async ()=>{
    await nextTick()
    await ProclamationStore.getProlamation({pageNo:1,pageSize:10000})

    let list:{
        [x:string]:any[]
    } = {}



    function changeList(){
        // console.log(proclamation)
        for(let i=proclamation.value.length-1;i>=0;i--){
            let time = new Date((proclamation.value[i] as any).noticeTime)
            let year = time.getFullYear()+ '-'+ (time.getMonth() + 1).toString().padStart(2,)  as any
            // console.log(year)
            if(list.hasOwnProperty(year)){
                list[year].push(proclamation.value[i])
            }else{
                list[year] = []
                list[year].push(proclamation.value[i])
            }
            list[year] = list[year].reverse()
        }
        
        let arr = Object.entries(list)

        //@ts-ignore
        arr.sort((a,b) => new Date(b[0]) - new Date(a[0]))

        let index = 0
        let sortarr = {}
        arr.forEach(([key,item])=>{
            //@ts-ignore
            sortarr[key] = {
                index:index,
                data: item
            }
            index++
            divDispaly.value.push(false)
        })

        sortTIme.value = sortarr
    }
    changeList()

    window.addEventListener('scroll',debounce(scrolls,500),{passive:true})
    window.scrollTo(0, 0);
})

function  scrolls(e:any){
        let arr = divRef.value
        console.log(1)
        for(let item in divRef.value){

            if(Number(item) >= 1){
                // console.log(divRef.value[item])
                if(window.innerHeight + window.scrollY >= divRef.value[item].offsetTop){

                    divDispaly.value[Number(item)] = true
                }
            }
        }
    }



function debounce(fn:Function,times:number){
    let time:any;

    return function(){
        let context = this
        let args = arguments
        clearTimeout(time)
        time = setTimeout(()=>{
            arguments
            fn.apply(context,args)
            
        },time)
    }
}




</script>

<style scoped lang="scss">
.proclamation{
    padding: 1rem 0;
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .proclam{
        display: flex;
        flex-direction: column;
        align-items: center;
        .showProclam{
            display: flex;
            gap: 20px;
            cursor: pointer;
        }
        .latest{
            // width: 20%;
            padding: 20px; 
            flex-direction: row;
            border: 1px solid rgba(0,0,0,0.125) ;
            background: rgba(255,255,255,0.75);
            border-radius: 6px;
            width: 800px;
            position: relative;
            .proclamaPicture{
                position: relative;
                width: 343px;
                border-radius: 6px;
                overflow: hidden;
                box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);

                .specialEffects{
                    position: absolute;
                    top: 0;
                    left: 0;                    
                    width: 100%;
                    height: 100%;
                    &::before{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(255,255,255,0.5);
                        -webkit-transition: -webkit-transform .6s;
                        transition: transform 0.6s;
                        -webkit-transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,-125%,0);
                        transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,-125%,0);
                    }
                }
                .proclamaPic{
                    width: 100%;
                    height: 215px;
                    border-radius: 6px;
                    pointer-events: none;
                    object-fit: cover;
                    filter: brightness(.9);
                    opacity: 1;
                    transition: opacity .35s,transform .35s;
                    transform: scale3d(1,1,1);
                }

            }
            .proclamaDetail{
                display: flex;
                flex: 1;
                flex-direction: column;
                gap: 20px;
                max-width: 400px;
                text-overflow: ellipsis;
                position: relative;
                .rightTime{
                    padding-bottom: 20px;
                    bottom: 0;
                    position: absolute;
                    right: 0;
                }
                .proclamaMatter{
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
            }
            &:hover{
                .proclamaPicture {
                    .proclamaPic{
                        transform: scale3d(1.1,1.1,1);
                        filter: blur(3px) brightness(50%);
                    }
                    .specialEffects::before{
                        content:'';
                        transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,125%,0)  ;
                        -webkit-transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,125%,0);
                    }
                }
            }
        }
    }
    .proclamTitle{
        padding-top: 20px;
        padding-bottom: 80px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        transition: opacity .8s cubic-bezier(.43, .2, .02, 1),transform 1s cubic-bezier(.43, .2, .02, 1);

    }
    .proclamCenter{
        display: flex;
        flex-direction: column;
        align-items: center;
        .proclams{
            display: grid;
            grid-template-columns: repeat(4,1fr);
            column-gap: 31px;
            // flex-direction: row;
            // align-items: center;
            // justify-content: flex-start;
            // // justify-content: center;
            // flex-wrap: wrap;
            // gap: 5%;
            .showProclam{
                display: flex;
                gap: 20px;
                cursor: pointer;
            }

            .proclamList{
                flex-direction: column;
                border: 1px solid rgba(0,0,0,0.125) ;
                background: rgba(255,255,255,0.75);
                border-radius: 6px;
                width: 350px;
                position: relative;
                margin-bottom: 60px;
                margin-top: 50px;
                .proclamaPicture{
                    position: relative;
                    width: 312px;
                    height: 215px;
                    overflow: hidden;
                    border-radius: 6px;
                    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
                    margin: -80px auto 0px auto ;
                    .specialEffects{
                        position: absolute;
                        top: 0;
                        left: 0;                    
                        width: 100%;
                        height: 100%;
                        &::before{
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(255,255,255,0.5);
                            -webkit-transition: -webkit-transform .6s;
                            transition: transform 0.6s;
                            -webkit-transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,-125%,0);
                            transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,-125%,0);
                        }
                    }
                    .proclamaPic{
                        // position: absolute;
                        // top: 0;
                        position: relative;
                        top: 10;
                        // left: 0;
                        width: 100%;
                        height: 215px;
                        border-radius: 6px;
                        pointer-events: none;
                        object-fit: cover;
                        filter: brightness(.9);
                        opacity: 1;
                        transition: opacity .35s,transform .35s;
                        transform: scale3d(1,1,1);
                    }

                }
                .proclamaDetail{
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 400px;
                    text-overflow: ellipsis;
                    padding: 10px 20px;
                    .proclamaContent{
                        line-height: 24px;
                        margin-bottom: 10px;
                        .proclamaDesc{
                            max-height: 72px;
                            overflow: hidden;
                            word-break: break-all;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                        }
                    }
                }
                &:hover{
                    .proclamaPicture {
                        .proclamaPic{
                            transform: scale3d(1.1,1.1,1);
                            filter: blur(3px) brightness(50%);
                        }
                        .specialEffects::before{
                            content:'';
                            transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,125%,0)  ;
                            -webkit-transform: scale3d(1.9,1.4,1) rotate3d(0,0,1,45deg) translate3d(0,125%,0);
                        }
                    }
                }
            }
        }
    }   
}

.menus{
    width: 150px;
    border-radius: 12px;
    overflow: hidden;
    // position: ;
    position: fixed;
    top: 12%;
    right: 2%;
    box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.15);
    :deep(.el-menu--inline){
        max-height: 150px;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0px;
        }
    }
}

@keyframes sideChange {
    50%{
        border-radius: 6px;
    }
    100%{
        height: 40px;
        width: 100px;
        border-radius: 6px;
    }
}

@keyframes sideList {

    0%{
        display: flex;
    }

    100%{
        height: 100%;
        display: flex;
    }
}


@media (min-width:1201px){
    .proclamation{
        .proclamCenter{
            .proclams{
                grid-template-columns: repeat(3,1fr);
            }
        }
    }
}



@media (min-width:1501px){
    .proclamation{
        .proclamCenter{
            .proclams{
                grid-template-columns: repeat(4,1fr);
            }
        }
    }
}

@media (min-width:2001){
    .proclamation{
        .proclamCenter{
            .proclams{
                grid-template-columns: repeat(5,1fr);
            }
        }
    }
}


@media (max-width:1200px){
    .proclamation{
        .proclamCenter{
            .proclams{
                grid-template-columns: repeat(2,1fr);
            }
        }
    }
}


@media (max-width:800px){

    .proclamation{
        .proclam{
            .latest{
                width: 400px;
                flex-direction: column;
                .proclamaTitle{
                    text-align: center;
                }
            }
        }
        .proclamCenter{
            .proclams{
                grid-template-columns: repeat(1,1fr);
                .proclamList{
                    width: 400px;
                    .proclamaPicture{
                        width: 356px;
                    }
                }
            }
        }
    }
}




</style>