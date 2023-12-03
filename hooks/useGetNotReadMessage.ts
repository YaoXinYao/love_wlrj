import { getNotReadInfo } from "~/service/message";
import { storeToRefs } from "pinia";
import { useHomestore } from "~/store/home";
import { useMessageStore } from "~/store/message";
export const useGetNotReadMessage = async () => {
  const homeStore = useHomestore();
  let { userinfo } = storeToRefs(homeStore);
  const messageStore = useMessageStore();
  const { curType, pageInfo, infoList } = storeToRefs(messageStore);
  let notReadInfoRes = await getNotReadInfo(userinfo.value.userId);
  console.log(notReadInfoRes);

  const {
    commentLikeCnt,
    commentReplyCnt,
    postCollectCnt,
    postCommentCnt,
    postLikeCnt,
  } = notReadInfoRes.data.value.data;
  messageStore.ChangeNotReadNum({
    commentLikeCnt,
    commentReplyCnt,
    postCollectCnt,
    postCommentCnt,
    postLikeCnt,
  });
};
