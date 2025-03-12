import Input from "@/components/input";
import Messages from "@/components/messages";

const IndexPage = () => {
  return (
    <section className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      <Messages />
      <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <Input />
      </div>
    </section>
  );
};

export default IndexPage;
