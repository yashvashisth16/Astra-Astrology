"use client";

import React, { useState } from 'react';
import { createCourseOrder } from '@/app/actions/coursePayment';

interface CheckoutProps {
  courseId: string;
  title: string;
  displayPrice: string; // e.g. "₹12,000"
}

export default function CourseCheckoutBox({ courseId, title, displayPrice }: CheckoutProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper to load Razorpay
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsSubmitting(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Payment gateway failed to load.");
        setIsSubmitting(false);
        return;
      }

      // Convert "₹12,000" into a raw number: 12000
      const rawPrice = parseInt(displayPrice.replace(/\D/g, ''));

      // Call the backend Action
      const response = await createCourseOrder(title, rawPrice);

      if (!response.success) {
        alert("Failed to initiate checkout.");
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: response.keyId,
        amount: response.amount,
        currency: "INR",
        name: "Parasharr Dynasty Academy",
        description: `Enrollment: ${title}`,
        order_id: response.orderId,
        handler: function (paymentResponse: any) {
          console.log("Course Payment Success ID:", paymentResponse.razorpay_payment_id);
          setIsSuccess(true);
          // Later: We will save this purchase to the database so it unlocks in their Dashboard!
        },
        prefill: {
          name: "Cosmic Student",
          email: "student@cosmos.com",
        },
        theme: {
          color: "#b5852a" // Parasharr Gold
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function () {
        alert("Payment failed. Please try again.");
      });

      rzp.open();
      setIsSubmitting(false);

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-content" style={{ backgroundColor: '#fcf9f0', border: '1px solid #b5852a', borderRadius: '12px' }}>
        <h2 style={{ color: '#b5852a', marginBottom: '10px' }}>Payment Successful!</h2>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Welcome to the Academy. This course is now unlocked in your Dashboard.</p>
      </div>
    );
  }

  return (
    <div className="checkout-content">
      <h2 className="checkout-price">{displayPrice}</h2>
      <p className="tax-note">Includes lifetime access & updates</p>
      <button onClick={handlePayment} className="btn-buy-now" disabled={isSubmitting}>
        {isSubmitting ? "Loading Secure Checkout..." : "Proceed to Payment"}
      </button>
      <p className="guarantee">🔒 Secure Checkout via Razorpay</p>
    </div>
  );
}