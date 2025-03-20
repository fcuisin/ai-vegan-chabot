import Console from "@/components/console";
import Messages from "@/components/messages";
import { ChatSuggestedActions } from "@/components/suggested-actions";

const IndexPage = () => {
  return (
    <section
      className="flex flex-col gap-4 px-4 md:px-auto min-w-0 h-dvh bg-background" /* className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4" */
    >
      <Messages />
      <ChatSuggestedActions />
      <Console />
    </section>
  );
};

export default IndexPage;
