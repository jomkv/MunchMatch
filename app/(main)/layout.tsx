"use client";

import store from "@/store/store";
import { Provider } from "react-redux";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainLayout;
