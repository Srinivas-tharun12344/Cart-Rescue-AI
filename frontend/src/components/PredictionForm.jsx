import { useState } from "react";
import api from "../services/api";

function PredictionForm() {

    const [form, setForm] = useState({
        page_views: "",
        product_views: "",
        add_to_cart: "",
        session_duration: "",
        delivery_days: "",
        cod_available: true
    });

    const [result, setResult] = useState(null);

    const predict = () => {

        api.post("/predict", {

            page_views: Number(form.page_views),
            product_views: Number(form.product_views),
            add_to_cart: Number(form.add_to_cart),
            session_duration: Number(form.session_duration),
            delivery_days: Number(form.delivery_days),
            cod_available: form.cod_available

        })

        .then((res) => {

            setResult(res.data);

            localStorage.setItem(
                "risk_level",
                res.data.risk_level
            );

        })

        .catch((err) => {

            console.log(err);

        });

    };

    const badgeColor = () => {

        if (!result) return "#2563eb";

        if (result.risk_level === "High") return "#ef4444";

        if (result.risk_level === "Medium") return "#f59e0b";

        return "#22c55e";

    };

    return (

        <div
            style={{
                background: "white",
                padding: "35px",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                marginTop: "35px"
            }}
        >

            <h2 style={{ marginBottom: "25px" }}>
                🤖 AI Customer Prediction
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "20px"
                }}
            >

                <div>

                    <label>Page Views</label>

                    <input
                        type="number"
                        value={form.page_views}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                page_views: e.target.value
                            })
                        }
                        style={inputStyle}
                    />

                </div>

                <div>

                    <label>Product Views</label>

                    <input
                        type="number"
                        value={form.product_views}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                product_views: e.target.value
                            })
                        }
                        style={inputStyle}
                    />

                </div>

                <div>

                    <label>Add To Cart</label>

                    <input
                        type="number"
                        value={form.add_to_cart}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                add_to_cart: e.target.value
                            })
                        }
                        style={inputStyle}
                    />

                </div>

                <div>

                    <label>Session Duration (seconds)</label>

                    <input
                        type="number"
                        value={form.session_duration}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                session_duration: e.target.value
                            })
                        }
                        style={inputStyle}
                    />

                </div>

                <div>

                    <label>Estimated Delivery Days</label>

                    <input
                        type="number"
                        value={form.delivery_days}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                delivery_days: e.target.value
                            })
                        }
                        style={inputStyle}
                    />

                </div>

                <div>

                    <label>Cash On Delivery</label>

                    <select
                        value={form.cod_available}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                cod_available: e.target.value === "true"
                            })
                        }
                        style={inputStyle}
                    >

                        <option value="true">
                            Available
                        </option>

                        <option value="false">
                            Not Available
                        </option>

                    </select>

                </div>

            </div>

            <button
                onClick={predict}
                style={{
                    marginTop: "30px",
                    width: "100%",
                    padding: "15px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "18px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Predict Abandonment Risk
            </button>

            {result && (

                <div
                    style={{
                        marginTop: "30px",
                        background: "#f8fafc",
                        borderRadius: "15px",
                        padding: "25px",
                        borderLeft: `8px solid ${
                            result.risk_level === "High"
                                ? "#ef4444"
                                : result.risk_level === "Medium"
                                ? "#f59e0b"
                                : "#22c55e"
                        }`
                    }}
                >

                    <h2>Prediction Result</h2>

                    <h3>
                        Risk Score :
                        <span
                            style={{
                                color: "#2563eb",
                                marginLeft: "8px"
                            }}
                        >
                            {(result.risk_score * 100).toFixed(0)}%
                        </span>
                    </h3>

                    <h3>
                        Risk Level :
                        <span
                            style={{
                                color: badgeColor(),
                                fontWeight: "bold",
                                marginLeft: "8px"
                            }}
                        >
                            {result.risk_level}
                        </span>
                    </h3>

                    <h3>Diagnosis</h3>

                    <p
                        style={{
                            fontSize: "17px",
                            color: "#374151"
                        }}
                    >
                        {result.diagnosis}
                    </p>

                    <h3>Recommended Action</h3>

                    <p
                        style={{
                            fontSize: "17px",
                            color: "#374151"
                        }}
                    >
                        {result.recommended_action}
                    </p>

                </div>

            )}

        </div>

    );

}

const inputStyle = {

    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box"

};

export default PredictionForm;