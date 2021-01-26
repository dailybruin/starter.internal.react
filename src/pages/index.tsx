import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import config from "src/config";
import PageLayout from "src/shared/components/page-layout";
import flattenDeep from "lodash.flattendeep";
import FallbackSpinner from "src/shared/components/loading";

const Pages: React.FC<{}> = () => {
  const { sidebar } = config;

  const generateRoutes = (sidebarItems: any[]): any[] => sidebarItems.map((item: any) => {
    if (item.type === "menu") {
      return generateRoutes(item.children);
    }
    if (item.type === "404" || item.type === "page") {
      const LoadedPage = item.component;
      debugger;
      return (
        <Route key={item.path} exact={item.type === "page"} path={item.path}>
          <PageLayout>
            <Suspense fallback={<FallbackSpinner />}><LoadedPage /></Suspense>
          </PageLayout>
        </Route>
      );
    }
    return <></>;
  });

  const routes: any[] = flattenDeep(generateRoutes(sidebar));

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  );
};

export default Pages;
