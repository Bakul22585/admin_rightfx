import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./login/Login";
import Sidebar from "./sidebar/Sidebar.jsx";
import Header from "./sidebar/Header.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Deposit from "./deposit/Deposit.jsx";
import Withdraw from "./withdraw/Withdraw.jsx";
import DepositHistory from "./deposit_history/DepositHistory";
import WithdrawHistory from "./withdraw_history/WithdrawHistory";
// import Employees from "./employees/Employees";
import RoleManagement from "./role_management/RoleManagement";
import ClientList from "./client_list/ClientList";
import ListRequest from "./list_request/ListRequest";
import PendingKYC from "./pending_kyc/PendingKYC";
import HistoryKYC from "./history_kyc/HistoryKYC";
import CommisionGroup from "./commision_group/CommisionGroup";
// import GenerateIncome from './generate_income/GenerateIncome';
import Mt5Group from "./mt5_group/Mt5Group";
import Setting from "./setting/Setting";
import PopupImage from "./popup_image/PopupImage";
import CurrencyRate from "./currency_rate/CurrencyRate";
import Ticket from "./ticket/Ticket";
import Notification from "./notification/Notification";
import ActivityLog from "./activity_log/ActivityLog";
import FAQEditor from "./faq_editor/FAQEditor";
import IBWithdraw from "./ib_withdraw/IBWithdraw";
import PartnershipWithdraw from "./partnership_withdraw/PartnershipWithdraw";
import Master from "./master/Master";
import Profile from "./profile/Profile";
import Myaccount from "./my_account/Myaccount";
import CreateRole from "./role_management/CreateRole";
import Leads from "./leads/Leads";
import Remainder from "./remainder/Remainder";
import CopyTrading from "./copytrading/CopyTrading";
import Plans from "./plans/Plans";
import ViewTicket from "./ticket/ViewTicket";
import MT5Bonus from "./report/MT5Bonus";
import IBCommisions from "./admin_accounts/ib_commisions/IBCommisions";
import TradeStatistics from "./admin_accounts/trade_statistics/TradeStatistics";
import PositionReport from "./report/PositionReport";
import TradeHistory from "./report/TradeHistory";
import CopyOpenTrades from "./report/CopyOpenTrades";
import TradeHistoryTotal from "./report/TradeHistoryTotal";
import IBCommisionReport from "./report/IBCommisionReport";
import UserProfitAndLoss from "./report/UserProfitAndLoss";
import SalesIncentive from "./report/SalesIncentive";

import BasicReport from "./report/BasicReport";
import BasicIbReport from "./report/BasicIbReport";
import IBStructure from "./commision_group/ib_structure";
import Link from "./marketing/Link";
import Target from "./marketing/Target";
import MenuSetting from "./setting/MenuSetting";
import PammDashboard from "./pamm/PammDashboard";
import PammActivityLog from "./pamm/PammActivityLog";
import MmManagement from "./pamm/MmManagement";
import InvestorRequest from "./pamm/InvestorRequest";
import PammUser from "./pamm/PammUser";
import SalesReport from "./report/SalesReport";
import Employees from "./Staff/Employees";
import MenuItems from "./setting/MenuItems";
import UsersGroups from "./users_group/userGroup";
import PammPortfolioProfile from "./pamm/PammPortfolioProfile";
import MoneyManagerProfile from "./pamm/MoneyManagerProfile";
import MT5BonusRequests from "./MT5BonusManage/MT5BonusRequests";
import Mt5BonusOffer from "./MT5BonusManage/Mt5BonusOffer";
import RefreshData from "./refresha/RefreshData";
import { IsApprove, Url } from "./global";
import axios from "axios";

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
// const Permission = async () => {

// };

const App = () => {
  useScrollToTop();
  const ref = useRef();
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [sidebar, setSidebar] = useState(false);
  const [firstCall, setFirstCall] = useState(true);
  const [permission, setPermission] = useState({});

  const permissionfuc = async () => {
    if (firstCall) {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
        param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
      }
      param.append("action", "get_admin_permissions");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
          }
          if (res.data.status == "ok") {
            setFirstCall(false);
            setPermission(res.data.admin_button_permissions);
          }
        });
    }
  };

  if (login == "true") {
    return (
      <div class="loginbg">
        <Login setLogin={setLogin} />
      </div>
    );
  } else {
    permissionfuc();
    return (
      <div>
        <div
          className={
            sidebar
              ? "app-wrapper app-sidebar-mobile-open app-sidebar-fixed app-header-fixed"
              : "app-wrapper app-sidebar-fixed app-header-fixed"
          }
        >
          <Sidebar
            cside={sidebar}
            setSidebar={setSidebar}
            setLogin={setLogin}
          />
          <div className="app-main">
            <Header setSidebar={setSidebar} setLogin={setLogin} />
            <div className="app-content">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Dashboard setLogin={setLogin} permission={permission} />
                  }
                />
                <Route
                  path="*"
                  element={
                    <Navigate
                      to="dashboard"
                      replace
                      setLogin={setLogin}
                      permission={permission}
                    />
                  }
                />
                <Route
                  exact
                  path="/dashboard"
                  element={
                    <Dashboard setLogin={setLogin} permission={permission} />
                  }
                />
                <Route
                  exact
                  path="/employees"
                  element={<Employees permission={permission} />}
                />
                <Route
                  exact
                  path="/role_management"
                  element={<RoleManagement permission={permission} />}
                />
                <Route
                  exact
                  path="/client_list"
                  element={<ClientList permission={permission} />}
                />
                <Route
                  exact
                  path="/client_list"
                  element={<ClientList permission={permission} />}
                />
                <Route
                  exact
                  path="/client_list/:id"
                  element={<ClientList permission={permission} />}
                />
                <Route exact path="/list_request" element={<ListRequest />} />
                <Route
                  exact
                  path="/pending_kyc"
                  element={<PendingKYC permission={permission} />}
                />
                <Route
                  exact
                  path="/pending_kyc/:id"
                  element={<PendingKYC permission={permission} />}
                />
                <Route exact path="/history_kyc" element={<HistoryKYC />} />
                <Route exact path="/history_kyc/:id" element={<HistoryKYC />} />
                <Route
                  exact
                  path="/commision_group"
                  element={<CommisionGroup permission={permission} />}
                />
                {/* <Route exact path="/generate_income" element={<GenerateIncome />} /> */}
                <Route exact path="/mt5_group" element={<Mt5Group />} />
                <Route
                  exact
                  path="/setting"
                  element={<Setting permission={permission} />}
                />
                <Route
                  exact
                  path="/popup_image"
                  element={<PopupImage permission={permission} />}
                />
                <Route
                  exact
                  path="/currency_rate"
                  element={<CurrencyRate permission={permission} />}
                />
                <Route
                  exact
                  path="/ticket"
                  element={<Ticket permission={permission} />}
                />
                <Route exact path="/notification" element={<Notification />} />
                <Route exact path="/activity_log" element={<ActivityLog />} />
                <Route
                  exact
                  path="/faq_editor"
                  element={<FAQEditor permission={permission} />}
                />
                <Route
                  exact
                  path="/ib_withdraw"
                  element={<IBWithdraw permission={permission} />}
                />
                <Route exact path="/sales_report" element={<SalesReport />} />
                <Route exact path="/refresh_data" element={<RefreshData />} />

                <Route
                  exact
                  path="/ib_withdraw"
                  element={<PartnershipWithdraw />}
                />
                <Route
                  exact
                  path="/deposit"
                  element={<Deposit permission={permission} />}
                />
                <Route
                  exact
                  path="/withdrawal"
                  element={<Withdraw permission={permission} />}
                />
                <Route exact path="/master/:id" element={<Master />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                {/* <Route exact path="/deposit_history" element={<DepositHistory />} /> */}
                <Route
                  exact
                  path="/withdraw_history"
                  element={<WithdrawHistory />}
                />
                <Route exact path="/myAccount" element={<Myaccount />} />
                <Route exact path="/createRole/:id" element={<CreateRole />} />
                <Route exact path="/createRole" element={<CreateRole />} />
                <Route
                  exact
                  path="/leads_list"
                  element={<Leads permission={permission} />}
                />
                <Route exact path="/leads_list/:id" element={<Leads />} />
                <Route exact path="/reminder" element={<Remainder />} />
                <Route exact path="/ib_commisions" element={<IBCommisions />} />
                <Route exact path="/copy_trading" element={<CopyTrading />} />
                <Route exact path="/Comingsoon" element={<Dashboard />} />
                <Route exact path="/plans" element={<Plans />} />
                <Route
                  exact
                  path="/view_ticket/:id"
                  element={<ViewTicket permission={permission} />}
                />
                <Route
                  exact
                  path="/deposit_report"
                  element={<DepositHistory />}
                />
                <Route
                  exact
                  path="/withdraw_report"
                  element={<WithdrawHistory />}
                />
                <Route
                  exact
                  path="/trade_statistics"
                  element={<TradeStatistics />}
                />
                <Route exact path="/mt5_bonus" element={<MT5Bonus />} />
                <Route exact path="/position" element={<PositionReport />} />
                <Route exact path="/trade_history" element={<TradeHistory />} />
                <Route
                  exact
                  path="/trade_history_total"
                  element={<TradeHistoryTotal />}
                />
                <Route
                  exact
                  path="/copy_open_trades"
                  element={<CopyOpenTrades />}
                />
                <Route exact path="/basic_report" element={<BasicReport />} />
                <Route
                  exact
                  path="/user_profit_and_loss"
                  element={<UserProfitAndLoss />}
                />
                <Route
                  exact
                  path="/ib_commision_report"
                  element={<IBCommisionReport />}
                />
                <Route
                  exact
                  path="/basic_ib_report"
                  element={<BasicIbReport />}
                />
                <Route exact path="/ib_structure" element={<IBStructure />} />
                <Route
                  exact
                  path="/link"
                  element={<Link permission={permission} />}
                />
                <Route
                  exact
                  path="/Salesman"
                  element={<Target permission={permission} />}
                />
                <Route
                  exact
                  path="/change_menu_order"
                  element={<MenuSetting />}
                />
                <Route
                  exact
                  path="/menu_item"
                  element={<MenuItems permission={permission} />}
                />
                <Route
                  exact
                  path="/pamm_dashboard"
                  element={<PammDashboard />}
                />
                <Route
                  exact
                  path="/pamm_activity_log"
                  element={<PammActivityLog />}
                />
                <Route
                  exact
                  path="/pamm_mm_management"
                  element={<MmManagement permission={permission} />}
                />
                <Route
                  exact
                  path="/pamm_investor_request"
                  element={<InvestorRequest />}
                />
                <Route
                  exact
                  path="/pamm_user_management"
                  element={<PammUser permission={permission} />}
                />
                <Route
                  exact
                  path="/sales_incentive"
                  element={<SalesIncentive />}
                />
                <Route
                  exact
                  path="/user_groups"
                  element={<UsersGroups permission={permission} />}
                />
                <Route
                  path="/portfolio_profile/:id/:portfolioUserId"
                  element={<PammPortfolioProfile />}
                />
                <Route
                  path="/money_manager_profile/:id/:moneyManagerUserId"
                  element={<MoneyManagerProfile />}
                />
                <Route
                  path="/mt5_bonus_request"
                  element={<MT5BonusRequests permission={permission} />}
                />
                <Route
                  path="/mt5_bonus_offer"
                  element={<Mt5BonusOffer permission={permission} />}
                />
              </Routes>

              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export { App };
