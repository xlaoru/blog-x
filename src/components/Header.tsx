import * as React from 'react';

import { useSearchParams, useNavigate } from "react-router-dom";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { logoutUser, selectUser } from '../store/AuthSlice';
import { Logout } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Header() {
    const dispatch: AppDispatch = useDispatch()

    const token = localStorage.getItem("token") ?? ""

    const isAdminOrOwner = useSelector(selectUser)?.isAdminOrOwner

    const isBanned = useSelector(selectUser)?.isBanned

    const userAvatar = useSelector(selectUser)?.avatar

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (token) {
            setMobileMoreAnchorEl(event.currentTarget);
        } else {
            navigate("/login")
        }
    };

    function handleUserRegistration(event: React.MouseEvent<HTMLElement>) {
        if (token) {
            handleMenu(event)
        } else {
            navigate("/login")
        }
    }

    const menuId = 'primary-search-account-menu';

    const renderUserMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => { handleMenuClose(); navigate("/user") }} style={{ display: "flex", gap: "10px" }}>
                {
                    isBanned ? <NoAccountsIcon sx={{ color: "rgb(218, 54, 51)" }} />
                        : userAvatar
                            ? <img alt="avatar" src={userAvatar} style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
                            : <AccountCircleIcon />
                }
                <p style={{ margin: "0" }}>Profile</p></MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); dispatch(logoutUser()) }} style={{ display: "flex", gap: "10px" }}>
                <Logout />
                <p style={{ margin: "0" }}>Log out</p>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => navigate("/saved-blogs")}>
                <IconButton size="large" aria-label="saved blogs" color="inherit">
                    <BookmarksIcon />
                </IconButton>
                <p>Saved</p>
            </MenuItem>
            <MenuItem onClick={() => navigate("/menu-panel")}>
                <IconButton
                    size="large"
                    aria-label="add blog"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AddCircleOutlineIcon />
                </IconButton>
                <p>Add Blog</p>
            </MenuItem>
            {
                isAdminOrOwner &&
                <MenuItem onClick={() => navigate("/admin-panel")}>
                    <IconButton
                        size="large"
                        aria-label="admuin panel"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AdminPanelSettingsIcon />
                    </IconButton>
                    <p>Admin Panel</p>
                </MenuItem>
            }
            <MenuItem onClick={() => navigate("/user")}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {
                        isBanned ? <NoAccountsIcon sx={{ color: "rgb(218, 54, 51)" }} />
                            : userAvatar
                                ? <img alt="avatar" src={userAvatar} style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
                                : <AccountCircleIcon />
                    }
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={() => dispatch(logoutUser())}>
                <IconButton
                    size="large"
                    aria-label="logout of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Logout />
                </IconButton>
                <p>Log out</p>
            </MenuItem>
        </Menu >
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ backgroundColor: "#121212" }}>
                    <Toolbar>
                        <Box
                            sx={{
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate("/")}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ color: 'inherit' }}
                            >
                                Blog-X
                            </Typography>
                        </Box>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={searchQuery === "" ? "Search..." : searchQuery}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearchParams({ search: e.target.value })}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                aria-label="saved blogs"
                                onClick={() => navigate("/saved-blogs")}
                                color="inherit"
                            >
                                <BookmarksIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="add blog"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={() => navigate("/menu-panel")}
                                color="inherit"
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                            {
                                isAdminOrOwner &&
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="admin panel"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={() => navigate("/admin-panel")}
                                    color="inherit"
                                >
                                    <AdminPanelSettingsIcon />
                                </IconButton>
                            }
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={(event) => handleUserRegistration(event)}
                                color="inherit"
                            >
                                {
                                    isBanned ? <NoAccountsIcon sx={{ color: "rgb(218, 54, 51)" }} />
                                        : userAvatar
                                            ? <img alt="avatar" src={userAvatar} style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
                                            : <AccountCircleIcon />
                                }
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderUserMenu}
                {renderMobileMenu}
            </Box>
            <Offset />
        </>
    );
}
