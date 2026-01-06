import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "./features/getUserSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ViewPolicy from "./Components/ViewPolicy";
import ErrorPage from "./Components/ErrorPage";
import ProtectedAdmin from "./Components/ProtectedAdmin";

import Approval from "./pages/Approval";
import AgentForm from "./pages/AgentForm";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAgent from "./Components/ProtectedAgent"  
import InvoiceForm from "./admin/InvoiceForm";
import InvoiceList from "./admin/InvoiceList";
import InvoiceView from "./pages/InvoiceView";
import AgentList from "./admin/AgentList";
import AddTeam from "./admin/AddTeam";
import TeamList from "./admin/TeamList";
import TeamInvoices from "./admin/TeamInvoices";
import ProtectedAdminTeam from "./Components/ProtectedAdminTeam";
import RGPform from "./pages/RGPform";
import AdminRGPList from "./pages/RGPlist";
import AgentDocLists from "./pages/AgentDocLists";
import CancelledApprovals from "./admin/CancelledApprovals";
import CancelledPolicy from "./admin/CancelledPolicy";
import ViewRGP from "./pages/ViewRGP";
import ChangePassword from "./admin/ChangePassword";
import ChangeEmail from "./admin/ChangeEmail";
import RgpProfileView from "./pages/RgpProfileView";

const router = createBrowserRouter([
  {
    path: "/ather/login",
    element: <Login></Login>,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedAdmin>
        <AdminDashboard></AdminDashboard>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/add-agent",
    element: (
      <ProtectedAdmin>
        <AgentForm></AgentForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/update-agent",
    element: (
      <ProtectedAdmin>
        <AgentForm></AgentForm>
      </ProtectedAdmin>
    ),
  },


  {
    path: "/admin/add-rgp",
    element: (
      <ProtectedAdmin>
       <RGPform> </RGPform>
      </ProtectedAdmin>
    ),
  },
 
  {
    path: "/agent/rgp-form",
    element: (
      <ProtectedAgent>
        <RGPform> </RGPform>
      </ProtectedAgent>
    ),
  },
  
  {
    path: "/admin/update-rgp",
    element: (
      <ProtectedAdmin>
        <RGPform></RGPform>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/edit-rgp",
    element: (
      <ProtectedAgent>
        <RGPform></RGPform>
      </ProtectedAgent>
    ),
  },
  
  {
    path: "/admin/rgp-lists",
    element: (
      <ProtectedAdmin>
        <AdminRGPList></AdminRGPList>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/rgps-list",
    element: (
      <ProtectedAgent>
        <AdminRGPList></AdminRGPList>
      </ProtectedAgent>
    ),
  },
 
  
  {
    path: "/rgp-view/:rgpToken",
    element: (
        <ViewRGP></ViewRGP>
    ),
  },

  {
    path: "/rgp/profile-view",
    element: (
        <RgpProfileView></RgpProfileView>
    ),
  },
  
 
  {
    path: "/new-rgp",
    element: (
      <ProtectedAgent>
        <RGPform></RGPform>
      </ProtectedAgent>
    ),
  },
  
  {
    path: "/admin/approval-lists",
    element: (
      <ProtectedAdminTeam>
        <Approval></Approval>
      </ProtectedAdminTeam>
    ),
  },

  {
    path: "/admin/agent-policies",
    element: (
      <ProtectedAdmin>
        <AgentDocLists></AgentDocLists>
      </ProtectedAdmin>
    ),
  },
 
  {
    path: "/admin/cancelled-policy",
    element: (
      <ProtectedAdmin>
        <CancelledPolicy></CancelledPolicy>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/policy",
    element: <ViewPolicy></ViewPolicy>,
  },  
  // {
  //   path: "/agent-dashboard",
  //   element: (
  //     <ProtectedAgent>
  //       <AgentDashboard/>
  //     </ProtectedAgent>
  //   ),
  // },
 
  {
    path: "/admin/invoice-form",
    element: (
      <ProtectedAdminTeam>
        <InvoiceForm/>
      </ProtectedAdminTeam>
    ),
  },
  {
    path: "/admin/invoice-edit",
    element: (
      <ProtectedAdminTeam>
        <InvoiceForm/>
      </ProtectedAdminTeam>
    ),
  },
 
  {
    path: "/admin/invoice-lists",
    element: (
      <ProtectedAdminTeam>
        <InvoiceList/>
      </ProtectedAdminTeam>
    ),
  },

  {
    path: "/invoice/:invoiceToken",
    element: (
      // <ProtectedAdmin>
        <InvoiceView/>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/agent-lists",
    element: (
      <ProtectedAdmin>
        <AgentList/>
      </ProtectedAdmin>
    ),
  },
    {
    path: "/admin/new-team",
    element: (
      <ProtectedAdmin>
        <AddTeam/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/update-team",
    element: (
      <ProtectedAdmin>
        <AddTeam/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/team-lists",
    element: (
      <ProtectedAdmin>
        <TeamList/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/team-invoices",
    element: (
      <ProtectedAdmin>
        <TeamInvoices/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/cancel-approval-lists",
    element: (
      <ProtectedAdmin>
        <CancelledApprovals/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/change-email",
    element: (
      <ProtectedAdmin>
        <ChangeEmail/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/change-password",
    element: (
      <ProtectedAdmin>
        <ChangePassword/>
      </ProtectedAdmin>
    ),
  },


  // {
  //   path: "/test",
  //   element: (
  //       <TestDemo/>
  //   ),
  // },

  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
 
  return (
    <>
    <div className="overflow-hidden">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
