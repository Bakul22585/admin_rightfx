import React, { useState, useRef, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from './login/Login';
import Sidebar from './sidebar/Sidebar.jsx';
import Header from './sidebar/Header.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import Deposit from './deposit/Deposit.jsx';
import Withdraw from './withdraw/Withdraw.jsx';
import DepositHistory from './deposit_history/DepositHistory';
import WithdrawHistory from './withdraw_history/WithdrawHistory';
import Employees from './employees/Employees';
import RoleManagement from './role_management/RoleManagement';
import ClientList from './client_list/ClientList';
import ListRequest from './list_request/ListRequest';
import PendingKYC from './pending_kyc/PendingKYC';
import HistoryKYC from './history_kyc/HistoryKYC';
import CommisionGroup from './commision_group/CommisionGroup';
// import GenerateIncome from './generate_income/GenerateIncome';
import Mt5Group from './mt5_group/Mt5Group';
import Setting from './setting/Setting';
import PopupImage from './popup_image/PopupImage';
import CurrencyRate from './currency_rate/CurrencyRate';
import Ticket from './ticket/Ticket';
import Notification from './notification/Notification';
import ActivityLog from './activity_log/ActivityLog';
import FAQEditor from './faq_editor/FAQEditor';
import IBWithdraw from './ib_withdraw/IBWithdraw';
import PartnershipWithdraw from './partnership_withdraw/PartnershipWithdraw';
import Master from './master/Master';
import Profile from './profile/Profile';
import Myaccount from './my_account/Myaccount';
import CreateRole from './role_management/CreateRole';
import Leads from './leads/Leads';
import Remainder from './remainder/Remainder';
import CopyTrading from './copytrading/CopyTrading';
import Plans from './plans/Plans';
import ViewTicket from './ticket/ViewTicket';
import MT5Bonus from './report/MT5Bonus'
import IBCommisions from './admin_accounts/ib_commisions/IBCommisions'
import TradeStatistics from './admin_accounts/trade_statistics/TradeStatistics';
import PositionReport from './report/PositionReport';
import TradeHistory from './report/TradeHistory'
import CopyOpenTrades from './report/CopyOpenTrades';
import TradeHistoryTotal from './report/TradeHistoryTotal';
import IBCommisionReport from './report/IBCommisionReport';
import UserProfitAndLoss from './report/UserProfitAndLoss';
import BasicReport from './report/BasicReport';
import BasicIbReport from './report/BasicIbReport';
import IBStructure from './commision_group/ib_structure';
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
const App = () => {
  useScrollToTop();
  const ref = useRef();
  const [login, setLogin] = useState(localStorage.getItem('login'));
  const [sidebar, setSidebar] = useState(false);

  if (login == "true") {
    return (
      <div class="loginbg">
        <Login setLogin={setLogin}/>
      </div>
    )
  } else {
    return (
      <div>
        <div className={sidebar ? "app-wrapper app-sidebar-mobile-open app-sidebar-fixed app-header-fixed" : "app-wrapper app-sidebar-fixed app-header-fixed"}>
          <Sidebar cside={sidebar} setSidebar={setSidebar} setLogin={setLogin}/>
          <div className="app-main">
            <Header setSidebar={setSidebar}  setLogin={setLogin}/>
            <div className="app-content">
              <Routes >
                <Route exact path="/" element={<Dashboard setLogin={setLogin}/>} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/employees" element={<Employees />} />
                <Route exact path="/role_management" element={<RoleManagement />} />
                <Route exact path="/client_list" element={<ClientList />} />
                <Route exact path="/client_list/:id" element={<ClientList />} />
                <Route exact path="/list_request" element={<ListRequest />} />
                <Route exact path="/pending_kyc" element={<PendingKYC />} />
                <Route exact path="/pending_kyc/:id" element={<PendingKYC />} />
                <Route exact path="/history_kyc" element={<HistoryKYC />} />
                <Route exact path="/history_kyc/:id" element={<HistoryKYC />} />
                <Route exact path="/commision_group" element={<CommisionGroup />} />
                {/* <Route exact path="/generate_income" element={<GenerateIncome />} /> */}
                <Route exact path="/mt5_group" element={<Mt5Group />} />
                <Route exact path="/setting" element={<Setting />} />
                <Route exact path="/popup_image" element={<PopupImage />} />
                <Route exact path="/currency_rate" element={<CurrencyRate />} />
                <Route exact path="/ticket" element={<Ticket />} />
                <Route exact path="/notification" element={<Notification />} />
                <Route exact path="/activity_log" element={<ActivityLog />} />
                <Route exact path="/faq_editor" element={<FAQEditor />} />
                <Route exact path="/ib_withdraw" element={<IBWithdraw />} />
                <Route exact path="/ib_withdraw" element={<PartnershipWithdraw />} />
                <Route exact path="/deposit" element={<Deposit />} />
                <Route exact path="/withdrawal" element={<Withdraw />} />
                <Route exact path="/master/:id" element={<Master />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                {/* <Route exact path="/deposit_history" element={<DepositHistory />} /> */}
                <Route exact path="/withdraw_history" element={<WithdrawHistory />} />
                <Route exact path="/myAccount" element={<Myaccount />} />
                <Route exact path="/createRole/:id" element={<CreateRole />} />
                <Route exact path="/createRole" element={<CreateRole />} />
                <Route exact path="/leads_list" element={<Leads />} />
                <Route exact path="/leads_list/:id" element={<Leads />} />
                <Route exact path="/reminder" element={<Remainder />} />
                <Route exact path="/ib_commisions" element={<IBCommisions />} />
                <Route exact path="/copy_trading" element={<CopyTrading />} />
                <Route exact path="/Comingsoon" element={<Dashboard />} />
                <Route exact path="/plans" element={<Plans />} />
                <Route exact path="/view_ticket/:id" element={<ViewTicket />} />
                <Route exact path="/deposit_report" element={<DepositHistory />} />
                <Route exact path="/withdraw_report" element={<WithdrawHistory />} />
                <Route exact path="/trade_statistics" element={<TradeStatistics />} />
                <Route exact path="/mt5_bonus" element={<MT5Bonus/>} />
                <Route exact path="/position" element={<PositionReport />} />
                <Route exact path="/trade_history" element={<TradeHistory/>} />
                <Route exact path="/trade_history_total" element={<TradeHistoryTotal/>} />
                <Route exact path="/copy_open_trades" element={<CopyOpenTrades/>} />
                <Route exact path="/basic_report" element={<BasicReport/>} />
                <Route exact path="/user_profit_and_loss" element={<UserProfitAndLoss/>} />
                <Route exact path="/ib_commision_report" element={<IBCommisionReport/>} />
                <Route exact path="/basic_ib_report" element={<BasicIbReport/>} />
                <Route exact path="/ib_structure" element={<IBStructure/>} />

                
              </Routes>
              {/* <Footer /> */}
            </div>
          </div>
        </div>

      </div>
    )
  }
  
}

export default App