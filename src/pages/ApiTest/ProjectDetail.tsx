import {Avatar, Card, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import ProjectRole from '@/components/Project/ProjectRole';
import {PageContainer,PageHeader} from "@ant-design/pro-components";
import styles from "./Project.less";
import {useParams} from '@umijs/max';
import NoFoundPage from "@/components/NotFound/NoRecord";
import auth from "@/utils/auth";
import {listUsers} from "@/services/user";
import {queryProject} from "@/services/project";
import LoadingFailed from '@/assets/LoadingFailed.svg';
import logo from '@/assets/logo.svg';
const {TabPane} = Tabs;

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const projectId = params.id;
  const [projectData, setProjectData] = useState<any>({});
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [roles, setRoles] = useState([]);
  const [authority, setAuthority] = useState(false);
  const fetchUsers = async () => {
    const res = await listUsers();
    setUsers(res);
    const temp:any = {}
    res.forEach((item: { id: string | number; }) => {
      temp[item.id] = item
    })
    setUserMap(temp)
  };

  const fetchData = async (projId = projectId) => {
    const res = await queryProject({projectId: projId});
    setAuthority(res.code !== 403);
    if (auth.response(res)) {
      setProjectData(res.data.project);
      setRoles(res.data.roles);

    }
  };

  useEffect(() => {
    fetchData()
    fetchUsers();
  }, []);
  return (
    authority ? <PageContainer breadcrumb={{}} title={
      <PageHeader
        className={styles.sitePageHeader}
        onBack={() => {
          window.history.back();
        }}
        title={<span>
      <Avatar src={projectData.avatar || logo}/> {projectData.name}</span>}
      />
    }>
      <Card bodyStyle={{padding: '8px 18px'}}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='成员列表' key='1'>
            <ProjectRole users={users} project={projectData} roles={roles} fetchData={fetchData}/>
          </TabPane>
          <TabPane tab='项目设置' key='2'>
            {/*<ProjectInfo data={projectData} users={users} reloadData={fetchData}/>*/}
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer> : <NoFoundPage height={400} desc="对不起, 你没有权限访问该项目" image={LoadingFailed}/>

  );
};

export default ProjectDetail;
