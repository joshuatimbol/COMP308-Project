import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function VitalEdit(props) {
    const [data, setData] = useState({
        _id: "",
        bodyTemperature: "",
        heartRate: "",
        bloodPressure: "",
        respiratoryRate: "",
        nurse: "",
        patient: "",
        created: "",
    });
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const apiUrl = "http://localhost:3000/api/clinicalVisit/" + props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const updateVital = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const updatedDailyInfo = {
            bodyTemperature: data.bodyTemperature,
            heartRate: data.heartRate,
            bloodPressure: data.bloodPressure,
            respiratoryRate: data.respiratoryRate,
            nurse: data.nurseId,
            patient: data.patient,
            created: data.created
        };

        axios
        .put(apiUrl, updatedDailyInfo)
        .then((result) => {
            setShowLoading(false);
            if (result.data.screen === "error") {
                setShowError(true);
                console.log("error: " + showError);
            } else {
                props.history.push("/vitalHistoryView/" + data.patient);
            }
        })
        .catch((error) => setShowLoading(false));
    };

    const deleteVital = id => {
        const deleteApi = "/api/clinicalVisit/" + id;
        setShowLoading(true);
        const deletedVital = {
            bodyTemperature: data.bodyTemperature,
            heartRate: data.heartRate,
            bloodPressure: data.bloodPressure,
            respiratoryRate: data.respiratoryRate,
            nurse: data.nurseId,
            patient: data.patient,
            created: data.created
        };
        axios
        .delete(deleteApi, deletedVital)
        .then(result => {
            setShowLoading(false);
            props.history.push("/vitalHistoryView/" + data.patient);
        })
        .catch(error => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const pagestyle = {
        color: "black",
        backgroundColor: "Cornsilk",
        padding: "15px",
        fontFamily: "Arial"
      };
    return (
        <div className="container-fluid col-6 div-right margins">
            <div className="span12 div-style">
                <div className="bg-danger text-light title">
                    <h2 className="h2-style">Updating Vital Info</h2>
                </div>

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
                    <Jumbotron style={pagestyle}>
                        <Form onSubmit={updateVital}>
                            <Form.Group>
                                <Form.Label>Body Temperature (°C)</Form.Label>
                                <Form.Control
                                type="number"
                                name="bodyTemperature"
                                id="bodyTemperature"
                                placeholder="E.g. 36.5"
                                min="1"
                                step="0.1"
                                value={data.bodyTemperature}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Heart Rate (per minute)</Form.Label>
                                <Form.Control
                                type="number"
                                name="heartRate"
                                id="heartRate"
                                placeholder="E.g. 80"
                                min="1"
                                step="1"
                                value={data.heartRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Blood Pressure (systolic/diastolic mm Hg)</Form.Label>
                                <Form.Control
                                type="text"
                                name="bloodPressure"
                                id="bloodPressure"
                                placeholder="E.g. 120/80"
                                pattern="^\d{2,3}\/\d{2,3}$"
                                value={data.bloodPressure}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Respiratory Rate (per minute)</Form.Label>
                                <Form.Control
                                type="number"
                                name="respiratoryRate"
                                id="respiratoryRate"
                                placeholder="E.g. 16"
                                min="1"
                                step="1"
                                value={data.respiratoryRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            
                            <div className="text-center">
                                <Button variant="outline-primary col-4 mr-5" type="submit">
                                    Update
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline-danger col-4 ml-5"
                                    onClick={() => {
                                        deleteVital(data._id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Form>
                    </Jumbotron>
                </div>
            </div>
        </div>
    );
}

export default withRouter(VitalEdit);