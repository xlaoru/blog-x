import { useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

const StickyFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    backgroundColor: "#121212",
    '&:hover': {
        backgroundColor: alpha("#121212", 0.8), // затемнение
    },
}));

export default function NewBlogButton() {
    const navigate = useNavigate();
    return <Box>
        <StickyFab
            color="primary"
            aria-label="add"
            onClick={() => navigate("/menu-panel")}
        >
            <AddIcon />
        </StickyFab>
    </Box>
}
