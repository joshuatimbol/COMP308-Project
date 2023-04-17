import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function VitalHistory(props) {
    const [screen, setScreen] = useState("auth");
    const [patient, setPatient] = useState([]);
    const apiUrl = "http://localhost:3000/patients";

    const readCookie = async () => {
        try {
            const res = await axios.get("/api/read_cookie");

            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
            }
        } catch (e) {
            setScreen("auth");
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setPatient(result.data);
            setShowLoading(false);
        };

        readCookie();
        fetchData();
    }, []);

    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const displayAllPatientTable = patient.map((p, idx) => {
        return (
            <tr
                key={idx}
                onClick={() => {
                showDetail(p._id);
                }}
            >
                <td>{p.username}</td>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
            </tr>
        );
    });

    const showDetail = (id) => {
        props.history.push({
            pathname: "/vitalHistoryView/" + id
        });
    };

    return (
        <div className="container-fluid col-12 justify-content-center margins">
            <div className="span12 div-style p-10">
                <div className="bg-danger text-light title">
                <h2 className="h2-style">Search Vital History</h2>
                </div>
                <br />
                <br />
                <p>Please click the table row below to view the vital history of the selected patient.</p>

                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <div className="container-fluid margins">
                    {showError && (
                        <span>
                        There is something wrong...
                        </span>
                    )}
                    <div className="p-10">
                        <table className="table table-danger">
                            <thead className="thead-dark">
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                            </thead>
                            <tbody className="tr p-10">{displayAllPatientTable}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(VitalHistory);