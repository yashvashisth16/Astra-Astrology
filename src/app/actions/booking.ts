"use server";

import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

// Security: We define prices on the server so hackers can't change them!
const PRICING = {
    "Audio Call": 500,
    "Video Call (30 Mins)": 1500,
    "Premium + PDF": 3100,
};

export async function createBookingEntry(formData: any, packageName: string) {
    try {
        // 1. Initialize Razorpay using your new keys
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // 2. Save the Pending Booking to Supabase
        const newBooking = await prisma.consultation.create({
            data: {
                name: formData.name,
                email: formData.email,
                dob: formData.dob,
                timeOfBirth: formData.timeOfBirth,
                placeOfBirth: formData.placeOfBirth,
                focusArea: formData.focusArea,
                situation: `[Package: ${packageName}] - ${formData.situation}`,
                status: "PENDING_PAYMENT",
            }
        });

        // 3. Create the Razorpay Order
        // @ts-ignore - grabbing price from dictionary safely
        const amountInRupees = PRICING[packageName] || 1500;

        const options = {
            amount: amountInRupees * 100, // Razorpay requires the amount in PAISE! (e.g. ₹1500 = 150000 paise)
            currency: "INR",
            receipt: newBooking.id, // We attach the Supabase ID to the receipt!
        };

        const order = await razorpay.orders.create(options);

        // 4. Send the safe data back to the React Frontend
        return {
            success: true,
            orderId: order.id,
            amount: options.amount,
            keyId: process.env.RAZORPAY_KEY_ID // It is safe to send the public Key ID to the browser
        };

    } catch (error) {
        console.error("Payment Generation Error:", error);
        return { success: false, error: "Failed to generate payment." };
    }
}