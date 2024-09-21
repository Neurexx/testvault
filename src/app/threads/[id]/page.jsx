"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {Select,SelectTrigger,SelectContent,SelectItem,SelectValue} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";


export default function ThreadPage() {

  const {data:session,status}=useSession()
  const { id } = useParams()
  const [thread, setThread] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('latest');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchThreadData() {
      try {
        // Fetch thread data by id
        const threadResponse = await fetch(`/api/forum/threads/${id}`);
        const threadData = await threadResponse.json();
        if (!threadResponse.ok) throw new Error(threadData.error);

        // Fetch posts related to the thread
        const postsResponse = await fetch(`/api/forum/posts/${id}`);
        const postsData = await postsResponse.json();
        if (!postsResponse.ok) throw new Error(postsData.error);

        setThread(threadData);
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      }
    }

    if (id) fetchThreadData();
  }, [id, sortOption]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return; // Don't submit if the reply is empty

    setIsLoading(true);
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thread: id,
          author: session.user._id, // Replace with the actual logged-in user id
          content: newReply,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit the reply');
      }

      const newPost = await res.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the comments
      setNewReply(''); // Clear the textarea
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!thread) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          {/* Thread Header */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-2">{thread.title}</h1>
            <div className="text-sm text-gray-600 mb-4">
              <span>Posted by </span>
              <span className="font-bold">@{thread.author.name}</span>
              <span> | {new Date(thread.createdAt).toLocaleDateString()}</span>
              
            </div>
            <p className="text-lg mb-6">{thread.content}</p>
            {/* <div className="flex items-center gap-4 m-2">
              <Link
                href={`/threads/${id}/new-post`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                 <MessageCircleIcon className="h-5 w-5" /> 
                <Button>Reply to Thread</Button>
              </Link>
            </div> */}
          </div>

          {/* Sorting Options */}
          <div className="flex justify-between items-center mt-8">
            <h2 className="text-xl font-semibold">Replies</h2>
            <Select defaultValue={sortOption} onValueChange={setSortOption} className="w-4">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comments */}
          <div className="mt-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="p-4 bg-white rounded-lg shadow-md mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">@{post.author.name}</span>
                    <span className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{post.content}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    {/* <MessageCircleIcon className="h-4 w-4" /> */}
                    <Button>Reply</Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No replies yet.</p>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add a Reply</h3>
            <form onSubmit={handleReplySubmit}>
              <Textarea
                placeholder="Write your reply here..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={4}
                className="w-full mb-4"
              />
              <Button
                type="submit"
                className={`px-4 py-2  rounded-lg ${isLoading ? 'opacity-50' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Reply'}
              </Button>
            </form>
          </div>
      </main>
    </div>
  );
}