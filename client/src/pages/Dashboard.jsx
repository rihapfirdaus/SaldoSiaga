import * as React from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { Box, useTheme } from "@mui/system";

export async function loader({ params }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const uid = params?.userId;

  try {
    const response = await axios.get(`${baseUrl}/user/id/${uid}`);
    const user = response.data;

    return { user };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { error };
  }
}

export default function Dashboard() {
  const theme = useTheme();
  return (
    <div className="lg:flex">
      <Box className="hidden lg:col-span-1 lg:block lg:relative">
        <Sidebar />
      </Box>
      <Box
        className="lg:col-span-4"
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default" }}
      >
        <TopBar />
        <Box className="mb-16 py-0.5">
          <BottomBar />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}
