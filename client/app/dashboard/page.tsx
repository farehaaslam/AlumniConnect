"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopNavbar } from "@/components/layout/top-navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AlumniCard } from "@/components/alumni/alumni-card";
import { PostCard } from "@/components/feed/post-card";
import { CreatePostButton } from "@/components/feed/create-post-button";
import { motion } from "framer-motion";

// Mock data for alumni
const alumniData = [
  {
    id: 1,
    name: "Areeb Khan",
    graduationYear: 2020,
    batch: "2016-2020",
    major: "Computer Engineering",
    branch: "CSE",
    location: "Bengaluru, India",
    company: "Google",
    position: "Software Engineer",
    jobTitle: "Software Engineer",
    skills: ["React", "Node.js", "System Design"],
    avatar: "/placeholder.svg?height=100&width=100&text=AK",
    bio: "Working at Google as a full-stack developer. FET-JMI gave me the foundation I needed. Still miss the canteen samosas!",
  },
  {
    id: 2,
    name: "Fareha Ansari",
    graduationYear: 2019,
    batch: "2015-2019",
    major: "Electronics and Communication",
    branch: "ECE",
    location: "Noida, India",
    company: "Samsung R&D",
    position: "System Engineer",
    jobTitle: "Embedded Systems Engineer",
    skills: ["Embedded C", "VHDL", "IoT"],
    avatar: "/placeholder.svg?height=100&width=100&text=FA",
    isConnected: true,
  },
  {
    id: 3,
    name: "Rehan Siddiqui",
    graduationYear: 2018,
    batch: "2014-2018",
    major: "Mechanical Engineering",
    branch: "ME",
    location: "Delhi, India",
    company: "Maruti Suzuki",
    position: "Design Engineer",
    jobTitle: "Design Engineer",
    skills: ["SolidWorks", "AutoCAD", "Thermodynamics"],
    avatar: "/placeholder.svg?height=100&width=100&text=RS",
  },
  {
    id: 4,
    name: "Afreen Javed",
    graduationYear: 2021,
    batch: "2017-2021",
    major: "Electrical Engineering",
    branch: "EE",
    location: "Mumbai, India",
    company: "Tata Power",
    position: "Junior Engineer",
    jobTitle: "Power Systems Engineer",
    skills: ["Power Systems", "MATLAB", "Switchgear"],
    avatar: "/placeholder.svg?height=100&width=100&text=AJ",
  },
  {
    id: 5,
    name: "Tariq Ahmed",
    graduationYear: 2017,
    batch: "2013-2017",
    major: "Civil Engineering",
    branch: "CE",
    location: "Dubai, UAE",
    company: "AECOM",
    position: "Site Engineer",
    jobTitle: "Site Engineer",
    skills: ["AutoCAD", "Construction Management", "Revit"],
    avatar: "/placeholder.svg?height=100&width=100&text=TA",
  },
];

// Mock data for posts
const postsData = [
  {
    id: 1,
    author: {
      name: "Areeb Khan",
      avatar: "/placeholder.svg?height=40&width=40&text=AK",
      role: "Software Engineer at Google",
      id: 1,
    },
    title: "Internship Alert for FETians!",
    content:
      "Google is opening internship positions for Summer 2025. If you're from FET and passionate about backend systems, feel free to drop me a message. Happy to refer! #Tech #Internship #FETJMI",
    timestamp: "1 hour ago",
    likes: 62,
    comments: 9,
    shares: 4,
    isLiked: true,
    tags: ["Internship", "Tech", "FETians"],
  },
  {
    id: 2,
    author: {
      name: "Fareha Ansari",
      avatar: "/placeholder.svg?height=40&width=40&text=FA",
      role: "Embedded Systems Engineer at Samsung R&D",
      id: 2,
    },
    title: "Calling ECE Juniors!",
    content:
      "I’m conducting a virtual workshop on embedded systems basics and interview tips for core ECE roles. Drop a 👍 in the comments if interested and I’ll DM the link!",
    timestamp: "4 hours ago",
    likes: 48,
    comments: 13,
    shares: 5,
    isLiked: false,
    tags: ["ECE", "Mentorship", "Workshop"],
  },
  {
    id: 3,
    author: {
      name: "Rehan Siddiqui",
      avatar: "/placeholder.svg?height=40&width=40&text=RS",
      role: "Design Engineer at Maruti Suzuki",
      id: 3,
    },
    title: "Project Collaboration Opportunity",
    content:
      "Looking to collaborate on a sustainable vehicle design project for an upcoming international competition. If you’re a Mech or Auto enthusiast from FET, let’s team up!",
    timestamp: "Yesterday",
    likes: 34,
    comments: 4,
    shares: 2,
    isLiked: false,
    tags: ["Mechanical", "Collab", "Sustainability"],
  },
  {
    id: 4,
    author: {
      name: "Afreen Javed",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      role: "Power Systems Engineer at Tata Power",
      id: 4,
    },
    title: "Power Systems Conference — Registrations Open",
    content:
      "I'm speaking at IEEE’s Power Systems Conference next month. Would love to see some familiar faces from Jamia in the audience! Use code FETJMI2024 for a discount!",
    timestamp: "2 days ago",
    likes: 22,
    comments: 5,
    shares: 3,
    isLiked: false,
    tags: ["Electrical", "Conference", "IEEE"],
  },
];

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("directory");
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [posts, setPosts] = useState(postsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    batch: "",
    branch: "",
    jobTitle: "",
    location: "",
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("graduationYear");

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
            isLiked,
          };
        }
        return post;
      })
    );
  };

  const toggleComments = (postId: number) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter((id) => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };

  const handleCreatePost = (newPost: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    const postObj = {
      id: posts.length + 1,
      author: {
        name: "Michael Scott",
        avatar: "/placeholder.svg?height=40&width=40&text=MS",
        role: "Regional Manager at Dunder Mifflin",
        id: 1,
      },
      title: newPost.title,
      content: newPost.content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      tags: newPost.tags,
    };

    setPosts([postObj, ...posts]);
  };

  type SortCriteria = 'graduationYear' | 'profession' | 'name';

  const handleSort = (criteria: SortCriteria) => {
    setSortCriteria(criteria);
    setShowSortDropdown(false); // Close the dropdown after selection
  };

  // Add this logic to handle filtered and sorted data
  const filteredAndSortedAlumni = alumniData
    .filter((alumni) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        alumni.name.toLowerCase().includes(query) ||
        alumni.jobTitle.toLowerCase().includes(query) ||
        alumni.batch.toLowerCase().includes(query) ||
        alumni.branch.toLowerCase().includes(query) ||
        alumni.location.toLowerCase().includes(query);

      const matchesBatch = filters.batch
        ? alumni.batch === filters.batch
        : true;
      const matchesBranch = filters.branch
        ? alumni.branch === filters.branch
        : true;
      const matchesJob = filters.jobTitle
        ? alumni.jobTitle === filters.jobTitle
        : true;
      const matchesLocation = filters.location
        ? alumni.location === filters.location
        : true;

      return (
        matchesSearch &&
        matchesBatch &&
        matchesBranch &&
        matchesJob &&
        matchesLocation
      );
    })
    .sort((a, b) => {
      switch (sortCriteria) {
        case "graduationYear":
          return a.graduationYear - b.graduationYear;
        case "profession":
          return a.jobTitle.localeCompare(b.jobTitle);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return a.graduationYear - b.graduationYear;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar
        onMenuClick={toggleSidebar}
        className="pl-[70px] lg:pl-[280px]"
      />
      <Sidebar className="pt-16" />

      <main className="pt-16 transition-all duration-300 pl-[70px] lg:pl-[280px]">
        <div className="container max-w-6xl p-4 md:p-6">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-navy">
              Dashboard
            </h1>
            <p className="text-navy/70">
              Welcome back to your alumni dashboard
            </p>
          </motion.div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white p-1 mb-6 rounded-lg shadow-sm">
              <TabsTrigger
                value="directory"
                className="data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Alumni Directory
              </TabsTrigger>
              <TabsTrigger
                value="feed"
                className="data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Community Feed
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap lg:flex-nowrap lg:items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search by name or job title"
                className="w-full lg:w-1/3 px-4 py-2 rounded-md border border-gray-300 text-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="flex items-center gap-4 relative">
                <button
                  id="sortButton"
                  className="px-4 py-2 rounded-md border border-gray-300 text-sm bg-gray-100 cursor-pointer"
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                >
                  Sort
                </button>

                {/* Dropdown for Sort */}
                {showSortDropdown && (
                  <select
                    id="sort"
                    className="px-3 py-2 rounded-md border border-gray-300 text-sm mt-2 absolute top-full left-0 bg-white shadow-lg z-10"
                    onChange={(e) => handleSort(e.target.value as SortCriteria)}
                  >
                    <option value="graduationYear">Graduation Year</option>
                    <option value="profession">Profession</option>
                    <option value="name">Name</option>
                  </select>
                )}
              </div>

              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                {/* Filter Dropdowns */}
                <select
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, batch: e.target.value })
                  }
                >
                  <option value="">All Batches</option>
                  <option value="2016-2020">2016–2020</option>
                  <option value="2015-2019">2015–2019</option>
                  <option value="2014-2018">2014–2018</option>
                </select>

                <select
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, branch: e.target.value })
                  }
                >
                  <option value="">All Branches</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                </select>

                <select
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, jobTitle: e.target.value })
                  }
                >
                  <option value="">All Job Titles</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Embedded Systems Engineer">
                    Embedded Systems Engineer
                  </option>
                  <option value="Design Engineer">Design Engineer</option>
                </select>

                <select
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                >
                  <option value="">All Locations</option>
                  <option value="Bengaluru, India">Bengaluru</option>
                  <option value="Noida, India">Noida</option>
                  <option value="Delhi, India">Delhi</option>
                </select>
              </div>
            </div>

            <TabsContent value="directory">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedAlumni.map((alumni) => (
                  <AlumniCard key={alumni.id} alumni={alumni} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feed" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6">
                <div className="space-y-6">
                  {posts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={index}
                      onLike={handleLike}
                      onToggleComments={toggleComments}
                      expandedComments={expandedComments}
                    />
                  ))}
                </div>

                <div className="hidden lg:block">
                  <div className="sticky top-24">
                    <CreatePostButton onCreatePost={handleCreatePost} />
                  </div>
                </div>
              </div>

              {/* Mobile create post button */}
              <CreatePostButton
                onCreatePost={handleCreatePost}
                isMobile={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
