"use server";

import Razorpay from "razorpay";

export async function createCourseOrder(courseTitle: string, priceInRupees: number) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: priceInRupees * 100, // Convert to Paise for Razorpay
      currency: "INR",
      receipt: `course_receipt_${Date.now()}`, 
    };

    const order = await razorpay.orders.create(options);

    return { 
      success: true, 
      orderId: order.id,
      amount: options.amount,
      keyId: process.env.RAZORPAY_KEY_ID 
    };

  } catch (error) {
    console.error("Course Payment Error:", error);
    return { success: false, error: "Failed to generate payment." };
  }
}