/**
 * Safar Travel Platform - WhatsApp Cloud API Service
 * Meta Business API Integration for OTP & Notifications
 */

export async function sendWhatsAppOtp(phone, otpCode) {
  // Normalize phone number: digits only (no +, -, spaces)
  const cleanPhone = phone.toString().replace(/\D/g, '');
  
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  const messageText = `🌍 *Safar*

Your one-time verification code is:

🔑 *${otpCode}*

⏱️ _Valid for 10 minutes. Please do not share this code with anyone._

*The Safar Team* ✨
Shreyash, Shashank, Raj 

thank-you`;

  // Always log to server console for development & debugging
  console.log(`\n========================================================`);
  console.log(` 📱 [WHATSAPP OTP DISPATCH]`);
  console.log(` To      : +${cleanPhone}`);
  console.log(` Code    : >>> ${otpCode} <<< (Expires in 10 minutes)`);

  // If Phone Number ID is configured, attempt Meta Cloud API dispatch
  if (phoneNumberId && accessToken) {
    try {
      console.log(` Mode    : Dispatching via Meta WhatsApp Cloud API...`);
      const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
      
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanPhone,
        type: "text",
        text: {
          preview_url: false,
          body: messageText
        }
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        console.log(` Status  : ✅ Sent successfully via Meta Cloud API (Message ID: ${data.messages?.[0]?.id || 'OK'})`);
        console.log(`========================================================\n`);
        return { success: true, apiDispatched: true };
      } else {
        console.warn(` Status  : ⚠️ Meta API returned: ${data.error?.message || JSON.stringify(data)}`);
        console.log(` Status  : Fallback to simulated delivery.`);
        console.log(`========================================================\n`);
        return { success: true, apiDispatched: false, warning: data.error?.message };
      }
    } catch (err) {
      console.warn(` Status  : ⚠️ Network error calling Meta API: ${err.message}`);
      console.log(`========================================================\n`);
      return { success: true, apiDispatched: false, warning: err.message };
    }
  } else {
    console.log(` Status  : ℹ️ Ready (Set WHATSAPP_PHONE_NUMBER_ID in server/.env for direct Meta Cloud API dispatch)`);
    console.log(`========================================================\n`);
    return { success: true, apiDispatched: false };
  }
}
