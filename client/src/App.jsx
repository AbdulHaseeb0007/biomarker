import { createBrowserRouter } from "react-router-dom";
import TestList from "./pages/TestList";
import TestResult from "./pages/SaveTestResult";
import TotalTestCountList from "./pages/TotalTestCountList";
import UserTestCount from "./pages/UserTestCount";
import ShowGraph from "./pages/ShowGraph";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TestList />,
    },
    {
      path: "/save-result",
      element: <TestResult />,
    },
    {
      path: "/total-test-count",
      element: <TotalTestCountList />,
    },
    {
      path: "/user-test-count",
      element: <UserTestCount />,
    },
    {
      path: "/test-graph",
      element: <ShowGraph />,
    },
  ]);

  return router;
};

export default App;
