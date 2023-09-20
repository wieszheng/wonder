import {
  deleteUsers,
  listUserActivities,
  listUserOperationLog,
  listUsers,
  loginGithub,
  queryFollowTestPlanData,
  queryUserStatistics,
  updateAvatar,
  updateUsers
} from '@/services/user';
import {history} from '@umijs/max';
import {message} from "antd";
import auth from "@/utils/auth";

const getUserMap = data => {
  const temp = {}
  const userNameMap = {}
  data.forEach(item => {
    temp[item.id] = item
    userNameMap[item.id] = item.name
  })
  return {userMap: temp, userNameMap};
}

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    userList: [],
    currentUserList: [],
    userMap: {},
    userNameMap: {},
    // 用户活动轨迹数据
    activities: [],
    operationLog: [],
    project_count: 0,
    case_count: 0,
    user_rank: 0,
    total_user: 0,
    weekly_case: [],
    // 关注的测试计划数据
    followPlan: [],
  },
  effects: {
    // * fetch(_, {call, put}) {
    //   const token = localStorage.getItem("pityToken")
    //   const response = yield call(queryCurrent, {token});
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },

    * fetchUserActivities({payload}, {call, put}) {
      const res = yield call(listUserActivities, payload);
      if (auth.response(res)) {
        yield put({
          type: 'save',
          payload: {
            activities: res.data,
          }
        })
      }
    },

    * fetchUserRecord({payload}, {call, put}) {
      const res = yield call(listUserOperationLog, payload);
      if (auth.response(res)) {
        yield put({
          type: 'save',
          payload: {
            operationLog: res.data,
          }
        })
      }
    },

    * updateUser({payload}, {call, put}) {
      const response = yield call(updateUsers, payload);
      return auth.response(response, true);
    },

    * deleteUser({payload}, {call, put}) {
      const response = yield call(deleteUsers, payload);
      return auth.response(response, true);
    },

    * fetchUserList(_, {call, put}) {
      const response = yield call(listUsers);
      const {userMap, userNameMap} = getUserMap(response);
      yield put({
        type: 'save',
        payload: {
          userList: response,
          currentUserList: response,
          userMap,
          userNameMap
        },
      });
    },


    * avatar({payload}, {call, put}) {
      const res = yield call(updateAvatar, payload)
      if (auth.response(res, true)) {
        const pityUser = localStorage.getItem("pityUser")
        const info = JSON.parse(pityUser)
        info.avatar = res.data;
        localStorage.setItem("pityUser", JSON.stringify(info))
        yield put({
          type: 'saveCurrentUser',
          payload: info,
        });
      }
    },

    * queryUserStatistics(_, {call, put}) {
      const response = yield call(queryUserStatistics);
      if (auth.response(response)) {
        yield put({
          type: 'save',
          payload: {
            project_count: response.data.project_count,
            case_count: response.data.case_count,
            user_rank: response.data.user_rank,
            total_user: response.data.total_user,
            weekly_case: response.data.weekly_case,

          },
        });
      }
    },

    /**
     * 获取用户关注的测试计划执行数据
     * @param _
     * @param call
     * @param put
     * @returns {Generator<*, void, *>}
     */
    * queryFollowTestPlanData(_, {call, put}) {
      const response = yield call(queryFollowTestPlanData);
      if (auth.response(response)) {
        yield put({
          type: 'save',
          payload: {
            followPlan: response.data,
          },
        });
      }
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload}
    },

    saveCurrentUser(state, action) {
      localStorage.setItem("pityUser", JSON.stringify(action.payload || {}))
      return {...state, currentUser: action.payload || {}};
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
