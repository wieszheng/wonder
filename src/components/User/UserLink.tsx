import React from 'react';
import {Avatar, Tooltip} from "antd";
// import styles from "@/components/RightContent/index.less";
import logo from '@/assets/logo.svg';

interface User {
  id: string;
  name: string;
  avatar?: string;
  deleted_at?: string;
}
interface Props {
  user?: User;
  size?: number;
  marginLeft?: number;
}

const UserLink: React.FC<Props> = ({user, size = 24, marginLeft = 6}) => {
  if (user === undefined) {
    return <Avatar size={size} src={logo} alt="avatar"/>
  }

  return (
    <>
      <Avatar size={size}  src={user.avatar || undefined} alt="avatar"/>
      <Tooltip title="点击可查看用户资料">
        {
          user.deleted_at ?
            <del><a style={{marginLeft: marginLeft, fontSize: 13, color: "#ccc"}} href={`/#/member/${user.id}`} rel="noreferrer">{user.name}</a></del> :
            <a onClick={e => {
              e.stopPropagation();
            }} style={{marginLeft: marginLeft, fontSize: 13, verticalAlign: 'middle'}} href={`/#/member/${user.id}`} rel="noreferrer">{user.name}</a>
        }
      </Tooltip>
    </>
  )
}

export default UserLink;
