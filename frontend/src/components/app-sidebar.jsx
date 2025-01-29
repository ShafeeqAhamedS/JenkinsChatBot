import { Github, Computer, Activity, Code, SquareTerminal, ServerCrash, DatabaseZap, Cloud, Bot  } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { getHistory } from "@/apis/api";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./ui/sidebar";

export function AppSidebar() {
  const [history, setHistory] = useState({});

  useEffect(() => {
    getHistory()
      .then(data => {
        console.log(data);
        setHistory(data);
      })
      .catch(error => console.error("Error fetching history:", error));
  }, []);

  // Define an array of icons
  const icons = [Github, Computer, Activity, Code, SquareTerminal, ServerCrash, DatabaseZap, Cloud, Bot];

  // Shuffle the icons array to ensure random assignment
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledIcons = shuffleArray(icons);

  const historyItems = Object.entries(history).map(([key, value], index) => {
    const Icon = shuffledIcons[index % shuffledIcons.length];
    return {
      title: `${value.job_name} - ${value.build_number}`,
      url: `#/${key}`,
      icon: Icon,
    };
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between">
            <div className="flex items-center px-3">
            <p>History</p>
            </div>
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {historyItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
