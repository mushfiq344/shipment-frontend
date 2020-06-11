import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from "react-router-dom";
import Layout from "../../components/layout/layout";



// view shipments
import ShipmentResult from "./shipmentResult"
import { SingleShipment } from "./singleShipment";
export default function ShipmentRoutes() {

    let { path, url } = useRouteMatch();

    return (
        <Layout>

            <Switch>
                <Route exact path={path}>
                    <ShipmentResult></ShipmentResult>
                </Route>
                <Route path={`${path}/:id`} component={SingleShipment}>

                </Route>

            </Switch>

        </Layout>
    );
}




