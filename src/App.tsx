import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { I18nProvider } from "./hooks/useI18n";
import { ThemeProvider } from "./hooks/useTheme";
import { CleanPortfolio } from "./components/CleanPortfolio";

const BlogPost = lazy(() =>
  import("./components/BlogArticlePage").then((m) => ({ default: m.BlogPost }))
);
const NotFound = lazy(() =>
  import("./components/NotFound").then((m) => ({ default: m.NotFound }))
);

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<CleanPortfolio />}
            />
            <Route
              path="/blog/:id"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
                    </div>
                  }
                >
                  <BlogPost />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
          <Toaster
            position="bottom-right"
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
}
