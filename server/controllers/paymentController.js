import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_TK6y872Uunu0Bm',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'HsdTlMgMchTwa4AmqeT6E1ix'
});

export async function createPaymentOrder(req, res) {
  try {
    const { amount, currency = "INR" } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `safar_rcpt_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);
    console.log(`[Razorpay] Order created: ${order.id} | Amount: ₹${amount}`);

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_TK6y872Uunu0Bm'
    });
  } catch (error) {
    console.error("[Razorpay] Order creation failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment parameters missing" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'HsdTlMgMchTwa4AmqeT6E1ix';
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment signature verified successfully",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature verification" });
    }
  } catch (error) {
    console.error("[Razorpay Verification Error]:", error);
    res.status(500).json({ success: false, message: "Server verification error" });
  }
}
