import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyzeWithAIModal({
    vulnerability,
    onClose,
}) {

    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {

        analyze();

    }, []);

    const analyze = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.post(

                "http://127.0.0.1:8000/api/ai/analyze-vulnerability/",

                {

                    title: vulnerability.title,

                    description: vulnerability.description,

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setAnalysis(response.data);

        }

        catch {

            alert("AI analysis failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,.5)",
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            🛡 AI Security Analysis

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        {

                            loading ?

                            <div className="text-center p-5">

                                <div className="spinner-border text-primary"/>

                                <p className="mt-3">

                                    AI is analyzing the vulnerability...

                                </p>

                            </div>

                            :

                            <>

                                <div className="row mb-3">

                                    <div className="col-md-6">

                                        <strong>

                                            Risk Level

                                        </strong>

                                        <br/>

                                        <span className="badge bg-danger">

                                            {analysis.risk_level}

                                        </span>

                                    </div>

                                    <div className="col-md-6">

                                        <strong>

                                            Priority

                                        </strong>

                                        <br/>

                                        <span className="badge bg-warning text-dark">

                                            {analysis.priority}

                                        </span>

                                    </div>

                                </div>

                                <hr/>

                                <h6>

                                    Impact

                                </h6>

                                <p>

                                    {analysis.impact}

                                </p>

                                <h6>

                                    Attack Scenario

                                </h6>

                                <p>

                                    {analysis.attack_scenario}

                                </p>

                                <h6>

                                    Recommended Fixes

                                </h6>

                                <ul>

                                    {

                                        analysis.recommended_fixes.map(

                                            (fix, index) => (

                                                <li key={index}>

                                                    {fix}

                                                </li>

                                            )

                                        )

                                    }

                                </ul>

                            </>

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}