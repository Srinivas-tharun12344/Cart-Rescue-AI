import { useState } from "react";
import api from "../services/api";

function PredictionForm() {

    const [form, setForm] = useState({

        page_views: "",
        product_views: "",
        add_to_cart: "",
        session_duration: "",

        estimated_delivery_days: "",

        cash_on_delivery: "Available",

        device: "mobile",

        source: "organic",

        country: "US",

        age: "",

        marketing_opt_in: true

    });

    const [result, setResult] = useState(null);

    const predict = () => {

        const payload = {

            page_views: Number(form.page_views),

            product_views: Number(form.product_views),

            add_to_cart: Number(form.add_to_cart),

            session_duration: Number(form.session_duration),

            estimated_delivery_days: Number(
                form.estimated_delivery_days
            ),

            cash_on_delivery: form.cash_on_delivery,

            device: form.device,

            source: form.source,

            country: form.country,

            age: Number(form.age),

            marketing_opt_in: form.marketing_opt_in

        };

        console.log("FORM:", form);

        console.log("PAYLOAD:", payload);

        api.post("/predict", payload)

            .then((res) => {

                console.log("Prediction:", res.data);

                setResult(res.data);

                localStorage.setItem(
                    "risk_level",
                    res.data.risk_level
                );

            })

            .catch((err) => {

                console.log("Prediction Error:", err);

                if (err.response) {

                    console.log(err.response.data);

                }

            });

    };

    const badgeColor = () => {

        if (!result) return "#2563eb";

        if (result.risk_level === "High")
            return "#ef4444";

        if (result.risk_level === "Medium")
            return "#f59e0b";

        return "#22c55e";

    };

    return (

        <div
            style={{
                background: "white",
                padding: "35px",
                borderRadius: "15px",
                boxShadow:
                    "0 8px 20px rgba(0,0,0,0.12)",
                marginTop: "35px"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                🤖 AI Customer Prediction
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2,1fr)",
                    gap: "20px"
                }}
            >
                                {/* Page Views */}

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

                {/* Product Views */}

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

                {/* Add To Cart */}

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

                {/* Session Duration */}

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

                {/* Estimated Delivery Days */}

                <div>
                    <label>Estimated Delivery Days</label>

                    <input
                        type="number"
                        value={form.estimated_delivery_days}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                estimated_delivery_days: e.target.value
                            })
                        }
                        style={inputStyle}
                    />
                </div>

                {/* Cash On Delivery */}

                <div>
                    <label>Cash On Delivery</label>

                    <select
                        value={form.cash_on_delivery}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                cash_on_delivery: e.target.value
                            })
                        }
                        style={inputStyle}
                    >
                        <option value="Available">
                            Available
                        </option>

                        <option value="Unavailable">
                            Unavailable
                        </option>
                    </select>
                </div>

                {/* Country */}

                <div>
                    <label>Country</label>

                    <select
                        value={form.country}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                country: e.target.value
                            })
                        }
                        style={inputStyle}
                    >
                        <option value="US">US</option>
                        <option value="IN">India</option>
                        <option value="UK">UK</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="BR">Brazil</option>
                        <option value="ES">Spain</option>
                        <option value="IT">Italy</option>
                        <option value="NL">Netherlands</option>
                        <option value="PL">Poland</option>
                    </select>
                </div>

                {/* Customer Age */}

                <div>
                    <label>Customer Age</label>

                    <input
                        type="number"
                        value={form.age}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                age: e.target.value
                            })
                        }
                        style={inputStyle}
                    />
                </div>

                {/* Marketing Opt-In */}

                <div>
                    <label>Marketing Opt-In</label>

                    <select
                        value={form.marketing_opt_in}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                marketing_opt_in:
                                    e.target.value === "true"
                            })
                        }
                        style={inputStyle}
                    >
                        <option value="true">
                            Yes
                        </option>

                        <option value="false">
                            No
                        </option>
                    </select>
                </div>

                {/* Device */}

                <div>
                    <label>Device</label>

                    <select
                        value={form.device}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                device: e.target.value
                            })
                        }
                        style={inputStyle}
                    >
                        <option value="mobile">
                            Mobile
                        </option>

                        <option value="desktop">
                            Desktop
                        </option>

                        <option value="tablet">
                            Tablet
                        </option>
                    </select>
                </div>

                {/* Traffic Source */}

                <div>
                    <label>Traffic Source</label>

                    <select
                        value={form.source}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                source: e.target.value
                            })
                        }
                        style={inputStyle}
                    >
                        <option value="organic">
                            Organic
                        </option>

                        <option value="email">
                            Email
                        </option>

                        <option value="direct">
                            Direct
                        </option>

                        <option value="paid">
                            Paid
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
                        marginTop: "35px",
                        background: "#f8fafc",
                        padding: "30px",
                        borderRadius: "15px",
                        borderLeft: `8px solid ${
                            result.risk_level === "High"
                                ? "#ef4444"
                                : result.risk_level === "Medium"
                                ? "#f59e0b"
                                : "#22c55e"
                        }`,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "20px",
                            color: "#1e293b"
                        }}
                    >
                        📊 Prediction Result
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: "20px"
                        }}
                    >

                        <div
                            style={{
                                background: "#ffffff",
                                padding: "18px",
                                borderRadius: "10px"
                            }}
                        >

                            <h3>Risk Score</h3>

                            <h1
                                style={{
                                    color: "#2563eb",
                                    marginTop: "10px"
                                }}
                            >
                                {(result.risk_score * 100).toFixed(2)}%
                            </h1>

                        </div>

                        <div
                            style={{
                                background: "#ffffff",
                                padding: "18px",
                                borderRadius: "10px"
                            }}
                        >

                            <h3>Risk Level</h3>

                            <h1
                                style={{
                                    color: badgeColor(),
                                    marginTop: "10px"
                                }}
                            >
                                {result.risk_level}
                            </h1>

                        </div>

                    </div>

                    <hr
                        style={{
                            margin: "25px 0"
                        }}
                    />

                    <h3>🔍 Diagnosis</h3>

                    <p
                        style={{
                            fontSize: "17px",
                            color: "#374151",
                            lineHeight: "28px"
                        }}
                    >
                        {result.diagnosis}
                    </p>

                    <h3
                        style={{
                            marginTop: "25px"
                        }}
                    >
                        💡 Recommended Action
                    </h3>

                    <p
                        style={{
                            fontSize: "17px",
                            color: "#374151",
                            lineHeight: "28px"
                        }}
                    >
                        {result.recommended_action}
                    </p>

                    <h3
                        style={{
                            marginTop: "25px"
                        }}
                    >
                        ✅ Policy Decision
                    </h3>

                    <p
                        style={{
                            color: "#2563eb",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}
                    >
                        {result.policy_reason}
                    </p>

                    <h3
                        style={{
                            marginTop: "25px"
                        }}
                    >
                        🤖 AI Review
                    </h3>

                    <p
                        style={{
                            color: "#16a34a",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}
                    >
                        {result.review_message}
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

    boxSizing: "border-box",

    outline: "none",

    background: "#ffffff"

};

export default PredictionForm;