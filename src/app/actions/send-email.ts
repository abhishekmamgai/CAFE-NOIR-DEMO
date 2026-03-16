"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  bookingRef: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seating: string;
}

export async function sendBookingEmail(params: EmailParams) {
  const { bookingRef, name, email, date, time, guests, seating } = params;

  try {
    const { data, error } = await resend.emails.send({
      from: "Cafe Noir <onboarding@resend.dev>",
      to: email,
      subject: `Booking Confirmed: ${bookingRef} - Cafe Noir`,
      html: `
        <div style="font-family: 'Playfair Display', serif; color: #2C1810; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #D3D1C7; background-color: #FAFAF7;">
          <h1 style="color: #BA7517; text-align: center; border-bottom: 2px solid #BA7517; padding-pb: 20px;">Reservation Confirmed</h1>
          <p style="font-size: 18px; margin-top: 30px;">Dear ${name},</p>
          <p style="font-size: 16px; line-height: 1.6;">Thank you for choosing Cafe Noir. Your table has been reserved successfully. We look forward to welcoming you!</p>
          
          <div style="background-color: #ffffff; padding: 25px; margin: 30px 0; border: 1px solid #D3D1C7;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888780;">Booking Reference</p>
            <p style="margin: 5px 0 20px 0; font-size: 28px; font-weight: bold; color: #BA7517;">${bookingRef}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888780;">Date & Time</p>
                <p style="margin: 5px 0; font-size: 16px; font-weight: bold;">${date} at ${time}</p>
              </div>
              <div>
                <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888780;">Guests & Seating</p>
                <p style="margin: 5px 0; font-size: 16px; font-weight: bold;">${guests} Guests (${seating})</p>
              </div>
            </div>
          </div>
          
          <p style="font-size: 14px; color: #888780; font-style: italic; text-align: center;">Note: We hold tables for 15 minutes past the reservation time.</p>
          
          <div style="text-align: center; margin-top: 40px; border-top: 1px solid #D3D1C7; padding-top: 20px;">
            <p style="font-size: 14px; color: #2C1810; font-weight: bold;">CAFE NOIR</p>
            <p style="font-size: 12px; color: #888780;">New Delhi & Gurgaon</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
