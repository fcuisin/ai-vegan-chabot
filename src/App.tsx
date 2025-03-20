import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/not-found";
import Layout from "./components/layout";
import IndexPage from "./pages";
import { Toaster } from "./components/ui/sonner";
import { ChatProvider } from "./context/chat-context";

const App = () => {
  // On component mount, check for theme preference
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "dark" || (!theme && systemPreference)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ChatProvider>
      <BrowserRouter>
        <Layout>
          <Toaster />
          {/** Add routing for profile creation */}
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChatProvider>
  );
};

export default App;
