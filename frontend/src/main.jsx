import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="grid grid-cols-[auto,1fr] w-full">
          <AppSidebar />
          <main className="flex justify-between">
            <div className="flex flex-col justify-between p-8">
            <SidebarTrigger />
            </div>
            <App />
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);