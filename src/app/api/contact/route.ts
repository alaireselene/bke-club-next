import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { NextResponse } from "next/server";

const CREATE_CONTACT_FORM = gql`
  mutation CreateContactForm(
    $name: String!
    $email: String!
    $subject: String!
    $message: String!
  ) {
    createContactForm(
      input: {
        title: $subject
        content: $message
        status: PENDING
        contactFormFields: {
          name: $name
          email: $email
        }
      }
    ) {
      success
      message
    }
  }
`;

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const client = getClient();

    const { data } = await client.mutate({
      mutation: CREATE_CONTACT_FORM,
      variables: {
        name,
        email,
        subject,
        message,
      },
    });

    if (data?.createContactForm?.success) {
      return NextResponse.json(
        { message: "Contact form submitted successfully" },
        { status: 200 }
      );
    } else {
      throw new Error(data?.createContactForm?.message || "Submission failed");
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}