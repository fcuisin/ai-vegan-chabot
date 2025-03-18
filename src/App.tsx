import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/not-found";
import Layout from "./components/layout";
import IndexPage from "./pages";
import { Toaster } from "./components/ui/sonner";
import LoginPage from "./pages/login";
import { UserProvider } from "./context/user-context";
import { ChatProvider } from "./context/chat-context";
import SignupPage from "./pages/signup";

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
    <UserProvider>
      <ChatProvider>
        <BrowserRouter>
          <Layout>
            <Toaster />
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ChatProvider>
    </UserProvider>
  );
};

export default App;
