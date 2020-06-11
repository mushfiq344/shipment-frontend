import React, { useState } from "react";
import { remoteServer } from "../../variables";
const ShipmentConditions = (props) => {
    const [text, setText] = useState("");
    const [searchCon, setSearchCon] = useState("select");
    const [searchValue, setSearchValue] = useState(remoteServer + "/allShipments");

    const setCriteriaAsText = (e) => {
        setText(e.target.value)
        setSearchCon("text");

        props.updateUrl(remoteServer + "/shipmentsSearchByName/" + e.target.value)
    }
    const setCriteriaAsSelect = (e) => {

        setSearchCon("select");
        if (e.target.value == "total") {
            props.updateUrl(remoteServer + "/shipmentsOrderByTotal")

        }
        else if (e.target.value == "id") {
            props.updateUrl(remoteServer + "/shipmentsOrderById")

        }

    }

    console.log("result value:", searchValue)


    return (
        <div>
            {/* searching criteria here */}
            <div className="row">
                <div className="col-6">
                    <input className="form-control" value={text} onChange={(e) => setCriteriaAsText(e)} placeholder="Type here to search by name"></input>
                </div>
                <div className="col-6">
                    <select className="form-control" onChange={(e) => setCriteriaAsSelect(e)} defaultValue="id">
                        <option value="id">ID</option>
                        <option value="total">Total</option>
                    </select>
                </div>
            </div>



        </div>

    )
}
export { ShipmentConditions }