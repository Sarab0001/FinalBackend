import QikinkOrder from "../models/qikinkModel.js";
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
    // Ensure token exists
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

    // Extract order data
    const {
      shipping_address,
      line_items,
      add_ons,
      gateway = "COD",
      qikink_shipping = "1",
      total_order_value = "1",
    } = req.body;

    const userId = req.user._id;

    // Generate custom order number
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

    // Send request to Qikink
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

    // Prepare address fields for DB
    const fullName = `${shipping_address.first_name} ${shipping_address.last_name}`;
    const fullAddress = `${shipping_address.address1}, ${shipping_address.city}, ${shipping_address.province} - ${shipping_address.zip}`;

    // ✅ Save order in your database
    const newDbOrder = new QikinkOrder({
      userId,
      id: response.data?.order_id?.toString() || "",
      name: fullName,
      email: shipping_address.email || "",
      phone: shipping_address.phone || "",
      address: fullAddress,
      orderDate: new Date(),
      orderStatus: "Order Placed",
      total: Number(total_order_value),
    });

    await newDbOrder.save();
    console.log("✅ Order saved in MongoDB:", newDbOrder);

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

// ----------------------
// Get All Orders (new)
// ----------------------
export const getAllQikinkOrders = async (req, res) => {
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
    }

    const { id, from_date, to_date, page_no } = req.query;
    const queryParams = new URLSearchParams();

    if (id) queryParams.append("id", id);
    if (from_date) queryParams.append("from_date", from_date);
    if (to_date) queryParams.append("to_date", to_date);
    if (page_no) queryParams.append("page_no", page_no);

    const url = `https://sandbox.qikink.com/api/order?${
      queryParams.toString() || ""
    }`;

    const response = await axios.get(url, {
      headers: {
        ClientId: process.env.QIKINK_CLIENT_ID,
        Accesstoken: qikinkToken,
      },
    });

    res.status(200).json({ success: true, orders: response.data });
  } catch (error) {
    console.error(
      "❌ Order list fetch error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

// ----------------------
// Get Single Order by ID (new)
// ----------------------
export const getSingleQikinkOrder = async (req, res) => {
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
    }

    const { id } = req.params;

    const response = await axios.get(
      `https://sandbox.qikink.com/api/order?id=${id}`,
      {
        headers: {
          ClientId: process.env.QIKINK_CLIENT_ID,
          Accesstoken: qikinkToken,
        },
      }
    );

    res.status(200).json({ success: true, order: response.data });
  } catch (error) {
    console.error(
      "❌ Single order fetch error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

// ----------------------
// Check Order Status by order_id
// ----------------------
export const checkQikinkOrderStatus = async (req, res) => {
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
    }

    const { orderId } = req.params;

    const response = await axios.get(
      `https://sandbox.qikink.com/api/order?id=${orderId}`,
      {
        headers: {
          ClientId: process.env.QIKINK_CLIENT_ID,
          Accesstoken: qikinkToken,
        },
      }
    );

    const orderData = response.data;
    res.status(200).json({
      success: true,
      order_id: orderData.order_id,
      number: orderData.number,
      status: orderData.status,
      tracking_link: orderData.shipping?.tracking_link || null,
      awb: orderData.shipping?.awb || null,
    });
  } catch (error) {
    console.error(
      "❌ Order status fetch error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

export const getUserQikinkOrders = async (req, res) => {
  try {
    console.log("🔐 Authenticated user:", req.user); // 🔍 check if user is received

    const userId = req.user._id;

    const orders = await QikinkOrder.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ Fetch user orders error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
