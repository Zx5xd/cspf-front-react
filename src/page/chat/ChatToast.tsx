import { useSSE } from "@/hooks/SSEHook.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useChatRoomStore } from "@/store/chatStore.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useEffect, useState } from "react";

export const ChatToast = () => {
  const url = import.meta.env.VITE_BE_URL as string;
  const { userProfile } = useChatRoomStore();
  const { toast } = useToast();
  const [sseConnected, setSseConnected] = useState(false);

  const { messages: sseMessages, error } = useSSE({
    userCode: userProfile?.userCode && url ? userProfile.userCode : "",
    url: userProfile?.userCode && url ? `${url}/sse` : ""
  });

  useEffect(() => {
    if (userProfile?.userCode && url && !sseConnected) {
      setSseConnected(true);
      console.log(true)
    }
  }, [userProfile, url]);

  useEffect(() => {
    if (sseMessages.length > 0) {
      const latestMessage = sseMessages[sseMessages.length - 1];
      toast({
        variant: "default",
        title: "SSE 이벤트",
        description: latestMessage.data.toString()
      });
    }
  }, [sseMessages]);

  return (
    <>
      <Toaster />
    </>
  );
};
