import axios from "axios";
import qs from "qs";

let qikinkToken = null;

// ----------------------
// Fetch & Save Token
// ----------------------
export const getQikinkToken = async (req, res) => {
  const data = qs.stringify({
    ClientId: process.env.QIKINK_CLIENT_ID,
    client_secret: process.env.QIKINK_CLIENT_SECRET,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://sandbox.qikink.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    qikinkToken = response.data.Accesstoken;
    console.log("🔁 Token auto-fetched:", qikinkToken);
    res.status(200).json({ success: true, token: qikinkToken });
  } catch (error) {
    console.error("❌ Token error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

// ----------------------
// Create Qikink Order
// ----------------------
export const createQikinkOrder = async (req, res) => {
  try {
    if (!qikinkToken) {
      const tokenResponse = await axios({
        method: "post",
        url: "https://sandbox.qikink.com/api/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          ClientId: process.env.QIKINK_CLIENT_ID,
          client_secret: process.env.QIKINK_CLIENT_SECRET,
        }),
      });
      qikinkToken = tokenResponse.data.Accesstoken;
      console.log("🔁 Token auto-fetched:", qikinkToken);
    }

    const {
      shipping_address,
      line_items,
      add_ons,
      gateway = "COD",
      qikink_shipping = "1",
      total_order_value = "1",
    } = req.body;

    const order_number = `QK${Date.now().toString().slice(-8)}${Math.floor(
      Math.random() * 100
    )
      .toString()
      .padStart(2, "0")}`;

    const orderPayload = {
      order_number,
      qikink_shipping,
      gateway,
      total_order_value,
      shipping_address,
      line_items,
      add_ons,
    };

    console.log("📦 Creating order with:", orderPayload);

    const config = {
      method: "post",
      url: "https://sandbox.qikink.com/api/order/create",
      maxBodyLength: Infinity,
      headers: {
        ClientId: process.env.QIKINK_CLIENT_ID,
        Accesstoken: qikinkToken,
        "Content-Type": "application/json",
      },
      data: orderPayload,
    };

    const response = await axios(config);
    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    console.error(
      "❌ Order creation error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};
