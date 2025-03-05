import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/not-found";
import Layout from "./components/layout";
import IndexPage from "./pages";

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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<></>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
