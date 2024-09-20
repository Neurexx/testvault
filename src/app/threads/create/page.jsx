"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useSession } from "next-auth/react";

export default function CreateThread() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // category should be populated from the backend
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {data:session,status}=useSession()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/forum/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category, 
          author: session.user._id , // You should replace this with the actual logged-in user ID from session/auth
        }),
      });

      if (res.ok) {
        // If the thread is created successfully, redirect to the threads page
        router.push("/threads");
      } else {
        // Handle any errors that occur during thread creation
        const errorData = await res.json();
        console.error("Error creating thread:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6">Create New Thread</h1>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Thread Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2"
            placeholder="Enter the thread title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-2"
            placeholder="Enter the thread content"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {/* Replace the hardcoded options below with dynamic categories from your backend */}
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="exams">Exams</SelectItem>
              <SelectItem value="tips">Study Tips</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mx-auto p-2" disabled={loading}>
          {loading ? "Creating..." : "Create Thread"}
        </Button>
      </form>
    </div>
  );
}
