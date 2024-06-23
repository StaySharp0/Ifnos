import {
  Link,
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

import { updateAppCurrent } from "./queries/ContextQuery";

import { AppBar, Main } from "./components/layouts";
import { QueryClient } from "@tanstack/react-query";

const remotePrefix = "/apps";
export const getRemoteAppURL = (appId: string) => `${remotePrefix}/${appId}`;

export const Root: React.FC = () => (
  <>
    <AppBar />
    <Main>
      <Outlet />
    </Main>
  </>
);

const DummyFrameApp = () => <div>나다 프레임앱</div>;

const DummyRemoteApp = () => {
  // TODO: appId 추출해서 remote app component import rendering
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Link to="inner/page/1">page1</Link>
            <Link to="inner/page/2">page2</Link>
            <Link to="inner/page/3">page3</Link>
          </>
        }
      />
    </Routes>
  );
};

/* https://github.com/remix-run/react-router/issues/10787 */
export const createRouter = (
  queryClient: QueryClient
): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        /* Home */
        {
          path: "",
          element: <DummyFrameApp />,
        },
        /* FrameApp */
        {
          path: "*",
          element: <DummyFrameApp />,
        },
        /* ThirdPartyApp */
        {
          path: `${remotePrefix}/:appId/*`,
          loader: async ({ request, params: { appId } }) => {
            const { pathname, search } = new URL(request.url);

            await updateAppCurrent(queryClient, appId!, pathname + search);

            return {};
          },
          element: <DummyRemoteApp />,
        },
      ],
    },
  ]);
