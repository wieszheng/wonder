import {Avatar, Select} from "antd";
import React from "react";

const {Option} = Select;

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// }
//
// interface Props {
//   users: User[];
//   placeholder?: string;
//   onChange: (value: string) => void;
//   value: string;
//   mode?: 'multiple' | 'tags';
// }

const UserSelect: React.FC<any> = ({users, placeholder = '请选择人员', onChange, value}) => {
  return (
    <Select allowClear onChange={onChange} value={value} showSearch placeholder={placeholder}
            filterOption={(value, info: any) => {
              return info.props.children[2].toLowerCase().indexOf(value.toLowerCase()) > -1 || info.props.children[4].toLowerCase().indexOf(value.toLowerCase()) > -1;
            }}>
      {users.map((v:any) => (
        <Option key={v.id} value={v.id}>
          <Avatar size={18} src={v.avatar || undefined}/> {v.name}({v.email})
        </Option>
      ))}
    </Select>
  );
};

export default UserSelect;
