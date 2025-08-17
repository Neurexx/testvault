"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  BookIcon,
  BarChartIcon,
  ExamIcon,
  ForumIcon,
  SettingsIcon,
} from "@/components/icons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Spinner from "@/components/Spinner";
import Sidebar from "@/components/Sidebar";

const fetchThreads = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/forum/threads?page=${pageParam}`);

  if (!res.ok) {
    throw new Error("Failed to fetch threads");
  }

  const data = await res.json();
  return {
    threads: data,
    nextPage: data.length > 0 ? pageParam + 1 : undefined,
  };
};

export default function ThreadsPage() {
  const [threads, setThreads] = useState([]);
  
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [filteredThreads, setFilteredThreads] = useState([]);

  const { ref, inView } = useInView();

  const {data,isLoading,fetchNextPage,
    hasNextPage,isFetchingNextPage,error,} = useInfiniteQuery({
    queryKey: ["threads"],
    queryFn: fetchThreads,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage;
    },
  });
  

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);


  useEffect(() => {
    // Handle filtering and sorting logic when search or sort changes
    let filtered = threads.filter((thread) =>
      thread.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "latest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "oldest") {
      filtered = filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortBy === "most-replies") {
      filtered = filtered.sort((a, b) => b.repliesCount - a.repliesCount);
    }

    setFilteredThreads(filtered);
  }, [search, sortBy, threads]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col w-full">
      <Sidebar/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex-1 py-8 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link href="/threads/create" className="m-8">
                <Button className="rounded-full text-justify">
                  <PlusIcon className="h-4 w-4" />
                  Create New Thread
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Search threads..."
                  className="max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="most-replies">Most Replies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {data?.pages.map((page, pageIndex) => (
                <div key={pageIndex} className="flex flex-col gap-4">
                  {page.threads.map((thread, threadIndex) => (
                    <div
                      key={thread._id}
                      ref={threadIndex === page.threads.length - 1 ? ref : null}
                      className=" "
                    >
                      <Card className="rounded-none border-border border-t-0 mx-0">
                        <CardHeader>
                          <CardTitle className="overflow-ellipsis text-nowrap overflow-hidden">
                            <Link
                              href={`/threads/${thread._id}`}
                              className="font-medium hover:underline"
                            >
                              {thread.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="overflow-ellipsis text-nowrap overflow-hidden">{thread.content}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageCircleIcon className="h-4 w-4" />
                            <span>{thread.postCount || 0} replies</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>@{thread.author.name}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              ))}

              {isFetchingNextPage && <Spinner />}
            </div>
          </div>
        </main>
      </div>

      {/* <footer className="bg-muted text-muted-foreground py-4 px-6 fixed bottom-0 left-0 right-0">
        <div className="container mx-auto flex justify-center p-4">
          <Link
            href="/threads/create"
            className="inline-flex items-center gap-2 rounded-md bg-primary  px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <PlusIcon className="h-4 w-4" />
            Create New Thread
          </Link>
        </div>
      </footer> */}
    </div>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
