import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { AccountCircle, BarChart, Home, Notes } from "@mui/icons-material";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";

export default () => {
  const { user } = useRouteLoaderData("root");
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const key =
      pathSegments[pathSegments.length - 2] === "notes"
        ? pathSegments[pathSegments.length - 2]
        : pathSegments[pathSegments.length - 1];

    const indexMap = {
      home: 0,
      notes: 1,
      statistic: 2,
      profile: 3,
    };

    setValue(indexMap[key] || 0);
  }, [location.pathname]);

  return (
    <Paper
      className="fixed bottom-0 left-0 right-0 lg:hidden z-10"
      elevation={5}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          "& .Mui-selected ": {
            color: "darkgreen",
          },
          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: "darkgreen",
          },
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to={`/app/${user._id}/home`}
          key="beranda"
          label="Beranda"
          icon={<Home />}
        />
        <BottomNavigationAction
          component={Link}
          to={`/app/${user._id}/notes/expense`}
          key="catatan"
          label="Catatan"
          icon={<Notes />}
        />
        <BottomNavigationAction
          component={Link}
          to={`/app/${user._id}/statistic`}
          key="statistik"
          label="Statistik"
          icon={<BarChart />}
        />
        <BottomNavigationAction
          component={Link}
          to={`/app/${user._id}/profile`}
          key="profil"
          label="Profil"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </Paper>
  );
};
