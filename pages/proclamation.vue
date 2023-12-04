<template>
    <ClientOnly>
        <div class="proclamation">
            <div class="proclam">
                <div>
                    <h1>最新公告</h1>
                </div>
                <div class="showProclam latest">
                    <div class="proclamaPicture">
                            <img class="proclamaPic" :src="latestProclamation.noticeImg" alt="" >
                            <div class="specialEffects"></div>
                    </div>
                    <div class="proclamaDetail">
                            <div class="proclamaTitle" style="font-size: 24px;">
                                {{latestProclamation.noticeTitle}}
                            </div>
                            <div  style="flex: 1;">
                                {{latestProclamation.noticeContent}}
                            </div>
                            <div class="rightTime">
                                {{latestProclamation.noticeTime}}
                            </div>
                    </div>
                </div>
            </div>

            <template v-for="(item,index) in sortTIme" :key="index">
                <div ref="divRef" class="proclamTitle">
                    <div>
                        <h1>{{ index }}</h1>
                    </div>
                </div>
                <div class="proclamCenter"  >
                    <div class="proclams"  >
                        <div class="showProclam proclamList" v-for="items in item" :key="items.noticeId">
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

            <!-- <div class="proclamTitle">
                <h1>2023年12月</h1>
            </div>
            <div class="proclamCenter">
                <div class="proclams">
                    <div class="showProclam proclamList">
                        <div class="proclamaPicture">
                                <img class="proclamaPic" :src="latestProclamation.noticeImg"  alt="" >
                                <div class="specialEffects"></div>
                        </div>
                        <div class="proclamaDetail">
                                <div style="font-size: 24px;text-align: center;">
                                    {{latestProclamation.noticeTitle}}
                                </div>
                                <div>
                                    {{latestProclamation.noticeContent}}
                                </div>
                        </div>
                    </div>
                    <div class="showProclam proclamList">
                        <div class="proclamaPicture">
                                <img class="proclamaPic" :src="latestProclamation.noticeImg" alt="" >
                                <div class="specialEffects"></div>
                        </div>
                        <div class="proclamaDetail">
                                <div style="font-size: 24px;text-align: center;">
                                    {{latestProclamation.noticeTitle}}
                                </div>
                                <div>
                                    {{latestProclamation.noticeContent}}
                                </div>
                        </div>
                    </div>
                    <div class="showProclam proclamList">
                        <div class="proclamaPicture">
                                <img class="proclamaPic" :src="latestProclamation.noticeImg" alt="" >
                                <div class="specialEffects"></div>
                        </div>
                        <div class="proclamaDetail">
                                <div style="font-size: 24px;text-align: center;">
                                    {{latestProclamation.noticeTitle}}
                                </div>
                                <div>
                                    {{latestProclamation.noticeContent}}
                                </div>
                        </div>
                    </div>
                    <div class="showProclam proclamList">
                        <div class="proclamaPicture">
                                <img class="proclamaPic" :src="latestProclamation.noticeImg" alt="" >
                                <div class="specialEffects"></div>
                        </div>
                        <div class="proclamaDetail">
                                <div style="font-size: 24px;text-align: center;">
                                    {{latestProclamation.noticeTitle}}
                                </div>
                                <div>
                                    {{latestProclamation.noticeContent}}
                                </div>
                        </div>
                    </div>
                    <div class="showProclam proclamList">
                        <div class="proclamaPicture">
                                <img class="proclamaPic" :src="latestProclamation.noticeImg" alt="" >
                                <div class="specialEffects"></div>
                        </div>
                        <div class="proclamaDetail">
                                <div style="font-size: 24px;text-align: center;">
                                    {{latestProclamation.noticeTitle}}
                                </div>
                                <div>
                                    {{latestProclamation.noticeContent}}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="proclam">
                <h1>最新公告</h1>
            </div>
            <div class="proclam">
                <h1>最新公告</h1>
            </div> -->
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
useHeader();
import {Calendar} from '@element-plus/icons-vue'
import proclamationStore from '@/store/proclamation'
import {storeToRefs} from 'pinia'


interface proclamationType {
    latestProclamation:string,
    proclamation: Array<any>
}

const ProclamationStore = proclamationStore()

const {latestProclamation,proclamation} = storeToRefs(ProclamationStore)
const time = ref()

let sortTIme = ref()

const divRef = ref()

// const list = ref({})

onMounted(async ()=>{
    await nextTick()
    await ProclamationStore.getProlamation({pageNo:1,pageSize:10000})

    let list:{
        [x:string]:any[]
    } = {}



    function changeList(){
        console.log(proclamation)
        for(let i=proclamation.value.length-1;i>=0;i--){
            let time = new Date(proclamation.value[i].noticeTime)
            let year = time.getFullYear()+ '-'+ (time.getMonth() + 1).toString().padStart(2,)  as any
            console.log(year)
            if(list.hasOwnProperty(year)){
                list[year].push(proclamation.value[i])
            }else{
                list[year] = []
                list[year].push(proclamation.value[i])
            }
        }
        
        let arr = Object.entries(list)

        //@ts-ignore
        arr.sort((a,b) => new Date(b[0]) - new Date(a[0]))

        let sortarr = {}
        arr.forEach(([key,item])=>{
            //@ts-ignore
            sortarr[key] = item
        })

        console.log(sortarr)
        console.log(list)
        sortTIme.value = sortarr
    }
    changeList()

    window.addEventListener('scroll',(e)=>{
        console.log(e)
        console.log(window.innerHeight,window.scrollY)
        console.log(divRef.value)
        let arr = divRef.value
        for(let item in divRef.value){
            console.log(divRef.value[item].offsetTop)
            if(Number(item) > 1){
                if(window.innerHeight + window.scrollY >= divRef.value[item].offsetTop){
                    console.log('在')
                }else{
                    console.log('不在')
                }
            }else{
                divRef.value[item].display = 'flex'
            }
        }
    },{passive:true})

    window.scrollTo(0, 0);

    // 



})

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
                flex-direction: column;
                gap: 20px;
                max-width: 400px;
                text-overflow: ellipsis;
                position: relative;
                .rightTime{
                    padding-bottom: 20px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
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
        & > :not(:first-of-type){
            display: none;
        }
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
                        line-height: 18px;
                        margin-bottom: 10px;
                        .proclamaDesc{
                            max-height: 54px;
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