// TODO: Use API/Implement some way to send email to stkn@hust.edu.vn after filled the form

"use client";

import { useState } from "react";
import type { FormData } from "./types";
import { Input } from "@/components/ui/input"; // Import Shadcn Input
import { Textarea } from "@/components/ui/textarea"; // Import Shadcn Textarea
import { Label } from "@/components/ui/label"; // Import Shadcn Label
import { Button } from "@/components/ui/button"; // Import Shadcn Button
import { Loader2 } from "lucide-react"; // Import Loader icon

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Implement form submission to WordPress or other backend
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to submit form");
      // }

      console.log("Form Data Submitted (Simulated):", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"> {/* Grid for name/email */}
        <div className="space-y-1.5"> {/* Use space-y for label/input */}
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tên của bạn"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Tiêu đề</Label>
        <Input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Vấn đề bạn muốn trao đổi"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Nội dung</Label>
        <Textarea
          name="message"
          id="message"
          rows={5} // Adjusted rows
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Nội dung chi tiết..."
        />
      </div>

      {submitStatus === "success" && (
        <p className="text-sm text-success"> {/* Use theme color */}
          Cảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ phản hồi sớm nhất có thể!
        </p>
      )}

      {submitStatus === "error" && (
        <p className="text-sm text-destructive"> {/* Use theme color */}
          Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
      </Button>
    </form>
  );
}
