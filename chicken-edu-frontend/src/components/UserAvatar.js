import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function UserAvatar({ user }) {
    return (
        <div className="user-avatar">
            <Avatar src={user.avatarUrl} sx={{ width: 80, height: 80 }} />
            <IconButton color="primary" aria-label="edit avatar">
                <EditIcon />
            </IconButton>
        </div>
    );
}

export default UserAvatar;
