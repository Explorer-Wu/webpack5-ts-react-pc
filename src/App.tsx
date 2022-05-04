import { FC } from "react";
import {
  BrowserRouter,
  Routes,
  // Switch,
  Route,
  Navigate // Redirect,
} from "react-router-dom";
// import HistoryNav from '@@router/history';
// import LayoutScreen from "@@components/Visualscreen/LayoutScreen";
import MainLayout from "@@layouts/LayoutTemp";
// import OverView from "@@views/Overview/index";
import "@@assets/styles/antd-custom.less";
import "@@assets/styles/main/base.scss";
import "@@assets/styles/components/general.scss";
// import "@@assets/css/main.css"

// const supportsHistory = "pushState" in window.history;
// BrowserRouter as Router用 forceRefresh={!supportsHistory}  history={History}
const App: FC<any> = () => (
  // <BrowserRouter forceRefresh={!supportsHistory}>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/screenfull" element={<LayoutScreen />} /> */}
      <Route path="/views" element={<MainLayout />} />
      <Navigate to="/views" replace />
      {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
