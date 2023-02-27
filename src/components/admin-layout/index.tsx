import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBackRounded,
  CardMembershipOutlined,
  EmojiFlagsOutlined,
  Groups2Outlined,
  MenuOutlined,
  Notifications,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
  SupportOutlined,
} from "@mui/icons-material";
import { AuthWrapper, useAuth, useLocalStorage } from "../../hooks";

import { Box } from "@mui/system";
import { BoxTypeMap } from "@mui/system";
import React from "react";
import { TextInput } from "../input";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children?: React.ReactNode;
  title?: string;
  middleActions?: React.ReactNode[];
  endActions?: React.ReactNode[];
}

export const AdminLayout = (props: AdminLayoutProps) => {
  const theme = useTheme();

  const isHandHeld = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPrimarySideBar, setShowPrimarySideBar] = React.useState(
    !isHandHeld
  );

  const handleSidebarToggle = () => {
    setShowPrimarySideBar(!showPrimarySideBar);
  };

  const handleCloseSidebar = () => {
    setShowPrimarySideBar(false);
  };

  return (
    <AuthWrapper>
      <div style={{ position: "fixed", width: "100vw" }}>
        <FlexBox>
          <PrimarySideBar
            isVisible={showPrimarySideBar}
            onClose={handleCloseSidebar}
          />
          <Main
            title={props.title ?? ""}
            middleActions={props?.middleActions ?? []}
            endActions={props?.endActions ?? []}
            onToggleSidebar={handleSidebarToggle}
          >
            <FlexBox
              position="relative"
              flexDirection={"column"}
              width="100%"
              maxHeight="100vh"
              overflowY="scroll"
            >
              {props?.children}
            </FlexBox>
          </Main>
        </FlexBox>
      </div>
    </AuthWrapper>
  );
};

interface PrimaryHeaderProps {
  onToggleSidebar: () => void;
}

export const PrimaryHeader = (props: PrimaryHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position="static" variant="outlined" elevation={0}>
        <Toolbar>
          <FlexBox justifyContent={"space-between"} width="100%">
            <FlexBox alignItems={"center"}>
              <IconButton onClick={props.onToggleSidebar}>
                <Box color="#fff">
                  <MenuOutlined />
                </Box>
              </IconButton>
              <Typography
                variant="subtitle1"
                fontSize={"1.1rem"}
                px={2}
                onClick={() => navigate("/home")}
                sx={{ cursor: "pointer" }}
              >
                Security Alert
              </Typography>
            </FlexBox>

            <FlexBox>
              <Box>
                <Avatar />
              </Box>
            </FlexBox>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </div>
  );
};

interface PrimarySideBarProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PrimarySideBar = (props: PrimarySideBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  return (
    <Drawer
      open={props.isVisible}
      variant={isMobile || !props.isVisible ? "temporary" : "permanent"}
      onClose={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          position: "relative",
          width: "16em",
          px: 0,
          minHeight: "100vh",
        },
      }}
    >
      <Box sx={{ ml: 4, py: 2 }}>
        <Typography
          sx={{ fontWeight: 600, cursor: "pointer" }}
          onClick={() => navigate("/home")}
          color="GrayText"
        >
          Security Alert
        </Typography>
      </Box>
      <List sx={{ px: 0 }}>
        {[
          {
            title: "Packages",
            url: "packages",
            icon: <CardMembershipOutlined fontSize="small" />,
          },
          {
            title: "Incidents",
            url: "incidents",
            icon: <EmojiFlagsOutlined fontSize="small" />,
          },
          {
            title: "Roles",
            url: "roles",
            icon: <Groups2Outlined fontSize="medium" />,
          },
          {
            title: "Tickets",
            url: "tickets",
            icon: <SupportOutlined fontSize="small" />,
          },
          {
            title: "Settings",
            url: "settings",
            icon: <SettingsOutlined fontSize="small" />,
          },
        ].map((item, index = 0) => {
          return (
            <ListItem key={index} sx={{ px: 0, py: 0 }}>
              <ListItemButton onClick={() => navigate(`/home/${item.url}`)}>
                <ListItemIcon sx={{ paddingLeft: 2 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontSize: "0.9rem" },
                    fontWeight: "400",
                  }}
                >
                  {item.title}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export const SecondaryHeader = () => {
  return <div />;
};

export const PrimarySideBarHeader = () => {
  return (
    <div>
      <Toolbar variant="dense">
        {/* <Typography color="black" textAlign="center" width={"100%"}>
          Administration
        </Typography> */}
      </Toolbar>
      <Divider />
    </div>
  );
};

export const FlexBox = (
  props: BoxTypeMap["props"] & { overflowY?: "scroll" | "auto" | "hidden" }
) => {
  return (
    <Box
      display={"flex"}
      {...props}
      style={{ overflow: props?.overflowY ?? "auto" }}
    />
  );
};

interface MainHeaderProps {
  title: string;
  middleActions?: React.ReactNode[];
  endActions?: React.ReactNode[];
  onToggleSidebar: () => void;
}

export const MainHeader = (props: MainHeaderProps) => {
  const { title, middleActions = [], endActions = [] } = props;
  const theme = useTheme();
  const isHandHeld = useMediaQuery(theme.breakpoints.down("sm"));
  const history = window.history;
  const { value: user, removeValue: removeUser } = useLocalStorage(
    "auth_user",
    null
  );
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const { logOut } = useAuth();
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  console.log(user);
  return (
    <>
      <div style={{ width: "100%" }}>
        <Toolbar variant="dense">
          <FlexBox alignItems={"center"} width="100%">
            <Box>
              <IconButton onClick={props.onToggleSidebar}>
                <MenuOutlined />
              </IconButton>
            </Box>

            <Box width="300px" sx={{ marginLeft: "16px", marginY: 1 }}>
              <TextInput
                startAdornment={
                  <Box sx={{ paddingRight: "8px", paddingTop: "4px" }}>
                    <Search fontSize="small" color="action" />
                  </Box>
                }
              />
            </Box>
          </FlexBox>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box>
              <IconButton sx={{ bgcolor: "#eee", borderRadius: 2 }}>
                <NotificationsOutlined fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ cursor: "pointer" }} onClick={handleMenuClick}>
              <Box
                sx={{
                  display: "flex",
                  minWidth: "7em",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingX: 0.8,
                  paddingY: 0.5,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "#eee",
                  },
                }}
              >
                <Avatar sx={{ width: "1.5em", height: "1.5em" }} />
                <Box sx={{ cursor: "pointer" }}>
                  <Typography
                    fontSize="0.8rem"
                    fontWeight={600}
                    sx={{ color: "GrayText", paddingLeft: 1 }}
                  >
                    {user?.first_name} {user?.last_name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Toolbar>
        <Divider />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // componentsProps={{ root: { style: { width: "200px" } } }}
        sx={{ width: "200px" }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem
          onClick={() => {
            logOut();
            handleMenuClose();
            window.location.reload();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

interface MainProps {
  title: string;
  middleActions?: React.ReactNode[];
  endActions?: React.ReactNode[];
  children?: React.ReactNode;
  onToggleSidebar: () => void;
}

export const Main = (props: MainProps) => {
  return (
    <main style={{ width: "100%", height: "100%" }}>
      <FlexBox flexDirection={"column"}>
        <MainHeader
          title={props.title}
          middleActions={props.middleActions}
          endActions={props.endActions}
          onToggleSidebar={props.onToggleSidebar}
        />
        {props.children}
      </FlexBox>
    </main>
  );
};
