import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {

    const pagestyle = {
        color: "black",
        backgroundColor: "GhostWhite",
        padding: "15px",
        fontFamily: "Arial"
      };

    const pagestyle1 = {
    color: "black",
    backgroundColor: "AliceBlue",
    padding: "15px",
    fontFamily: "Arial"
    };

    return (
        <div className="container" >
            <div className="span12 div-style" style={pagestyle1}>
                <h2 className="h2-style"> Centennial College Nurse Patient App</h2>
                <p className="p-style">
                    React front-end calls Express REST API.
        </p>
            </div>
        </div>
    );
}

export default withRouter(Home);
