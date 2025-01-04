import { CSSProperties } from "react";
import { List as VirtualizedList } from "react-virtualized";
import { useWindowSequence } from "../utils/useWindowSequence";

import UserListItem from "./UserListItem";

import { IUser } from "../store/AuthSlice";

type IUserListProps = {
    users: IUser[]
};

interface IRowRender {
    index: number;
    key: string;
    style: CSSProperties;
}

export default function UserList({ users }: IUserListProps) {
    const windowWidth = useWindowSequence("innerWidth");
    const windowHeight = useWindowSequence("innerHeight");

    function rowRenderer({ index, key, style }: IRowRender) {
        const user = users[index];
        return (
            <div
                 key={key} style={style} className="user-list-row"
            >
                <UserListItem user={user} />
            </div>
        );
    }

    return (
        <div className="user-list-container" style={{width: windowWidth - 50}}>
            <div className="user-list-header">
                <div className="user-list-cell">ID</div>
                <div className="user-list-cell">Name</div>
                <div className="user-list-cell">Email</div>
                <div className="user-list-cell">Role</div>
                <div className="user-list-cell">Actions</div>
            </div>
            <VirtualizedList
                width={windowWidth - 50}
                height={windowHeight * 0.85}
                rowCount={users.length}
                rowHeight={50}
                rowRenderer={rowRenderer}
            />
        </div>
    )
}
