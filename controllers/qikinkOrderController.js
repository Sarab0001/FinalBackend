import axios from "axios";
import qs from "qs";

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
    console.log("✅ Token obtained:", response.data);
    res.status(200).json({ success: true, token: response.data });
  } catch (error) {
    console.error("❌ Token error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};
