import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from "react-router-dom";
import Layout from "../../components/layout/layout";



// shipment
import ShipmentResult from "./shipmentResult"
export default function ShipmentRoutes() {

    let { path, url } = useRouteMatch();
    return (
        <Layout>

            <Switch>
                <Route exact path={path}>
                    <ShipmentResult></ShipmentResult>
                </Route>
                {/* <Route path={`${path}/shipment`} component={Shipment}>

                </Route> */}

            </Switch>

        </Layout>
    );
}




