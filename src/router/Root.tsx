import React, { FC, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ROOT } from "./Root.constants";

const Account = lazy(() => import("../pages/Account"));
const Exchange = lazy(() => import("../pages/Exchange"));


const Root: FC = () => 
    <Router>
        <Suspense fallback={<>loading</>}>
          <Switch>
            <Route exact path={ROOT.ACCOUNT} component={Account} />
            <Route exact path={ROOT.EXCHANGE} component={Exchange} />
            <Route exact path="/*" component={Account} />
          </Switch>
        </Suspense>
    </Router>

export default Root;
