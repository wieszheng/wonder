import Footer from '@/components/Footer';
import {GithubOutlined, LockOutlined, MailOutlined, RobotOutlined, UserOutlined} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {FormattedMessage, history, SelectLang, useIntl, useModel, Helmet} from '@umijs/max';
import {message, Tabs} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';

const clientId = `a971407eccaff687c1fc`;

const redirectToGithub = () => {
  // const current = window.location.href
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
};

const ActionIcons = () => {
  const langClassName = useEmotionCss(({token}) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <GithubOutlined key="GithubOutlined" className={langClassName} onClick={redirectToGithub}/>
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({token}) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};


const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loginSzr, registerSzr} = useModel('auth');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    let resp;
    if (type === 'register') {
      resp = await registerSzr({
        name: values?.name,
        password: values.password,
        email: values?.email,
        username: values.username
      });
    } else {
      resp = await loginSzr({username: values.username, password: values.password});
    }
    if (resp.code === 0) {
      message.success('🎉 🎉 🎉 登录成功');
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    }
    message.error(resp.msg);
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>{Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="Api Test"
          subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="其他登录方式"
            />,
            <ActionIcons key="icons"/>,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
              {
                key: 'register',
                label: intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '注册',
                }),
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '请输入用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {type === 'register' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                name="username"
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名",
                  }
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <RobotOutlined />,
                }}
                name="name"
                placeholder="请输入昵称"
                rules={[
                  {
                    required: true,
                    message: "请输入昵称",
                  }
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined/>,
                }}
                name="email"
                placeholder="请输入用户邮箱"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: "请输入合法的邮箱",
                  }
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                  type: 'password'
                }}
                name="password"
                placeholder="请输入用户密码"
                rules={[
                  {
                    required: true,
                    message: "请输入用户密码",
                  }
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
