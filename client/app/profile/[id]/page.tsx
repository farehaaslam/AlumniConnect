"use client"

import { useState } from "react"
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Edit,
  Calendar,
  Users,
  MessageSquare,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AppHeader } from "@/components/app-header"

// Mock data for profile
const profileData = {
  id: 1,
  name: "Michael Scott",
  graduationYear: 2005,
  major: "Business Administration",
  location: "Scranton, PA",
  company: "Dunder Mifflin",
  position: "Regional Manager",
  email: "michael.scott@dundermifflin.com",
  website: "www.dundermifflin.com",
  linkedin: "linkedin.com/in/michaelscott",
  twitter: "twitter.com/michaelscott",
  bio: "Regional Manager at Dunder Mifflin Paper Company with over 15 years of experience in the paper industry. Passionate about creating a fun work environment and motivating my team to achieve sales targets.",
  skills: ["Leadership", "Sales", "Management", "Public Speaking", "Team Building", "Customer Relations"],
  education: [
    {
      degree: "Bachelor of Business Administration",
      institution: "Scranton University",
      year: "2001-2005",
    },
  ],
  experience: [
    {
      title: "Regional Manager",
      company: "Dunder Mifflin",
      period: "2005-Present",
      description: "Managing the Scranton branch of Dunder Mifflin, overseeing sales, operations, and staff.",
    },
    {
      title: "Sales Representative",
      company: "Dunder Mifflin",
      period: "2002-2005",
      description: "Consistently exceeded sales targets and built strong client relationships.",
    },
  ],
  achievements: [
    {
      title: "Top Sales Manager",
      organization: "Dunder Mifflin",
      year: "2010",
      description: "Recognized for leading the branch to record-breaking sales numbers.",
    },
    {
      title: "Best Boss Award",
      organization: "Scranton Business Association",
      year: "2008",
      description: "Voted as the best boss in the Scranton area by employees.",
    },
    {
      title: "Volunteer of the Year",
      organization: "Scranton Community Center",
      year: "2012",
      description: "Recognized for outstanding community service and volunteer work.",
    },
  ],
  avatar: "/placeholder.svg?height=200&width=200&text=MS",
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(profileData)

  // In a real app, you would fetch the profile data based on the ID
  // const { id } = params

  const handleEditProfile = () => {
    // In a real app, you would save the changes to the backend
    setIsEditing(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_3fr]">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 mb-4 border-2 border-gold">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback className="bg-navy text-soft-white">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-navy">{profile.name}</h2>
                    <p className="text-muted-foreground mb-4">
                      {profile.position} at {profile.company}
                    </p>

                    <div className="flex gap-2 mb-6">
                      <Button variant="outline" size="sm" className="border-navy/20 hover:bg-navy/5">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button size="sm" className="bg-navy hover:bg-navy/90 text-white">
                        <Users className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    </div>

                    <div className="w-full space-y-2 text-sm">
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                        Class of {profile.graduationYear} • {profile.major}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        {profile.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        {profile.company}
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        {profile.email}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-center gap-2">
                      {profile.website && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {profile.linkedin && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {profile.twitter && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={`https://${profile.twitter}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Skills</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className={isEditing ? "visible" : "invisible"}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Skills</DialogTitle>
                          <DialogDescription>Add or remove skills from your profile.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="skills">Skills (comma separated)</Label>
                            <Textarea
                              id="skills"
                              defaultValue={profile.skills.join(", ")}
                              placeholder="Leadership, Management, etc."
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleEditProfile}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>About</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className={isEditing ? "visible" : "invisible"}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Bio</DialogTitle>
                          <DialogDescription>Update your professional bio.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              defaultValue={profile.bio}
                              placeholder="Tell us about yourself..."
                              className="min-h-[150px]"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleEditProfile}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{profile.bio}</p>
                </CardContent>
              </Card>

              <Tabs defaultValue="experience">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="experience" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className={isEditing ? "visible" : "invisible"}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Experience
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Experience</DialogTitle>
                          <DialogDescription>Add a new work experience to your profile.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Job Title</Label>
                              <Input id="title" placeholder="Regional Manager" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="company">Company</Label>
                              <Input id="company" placeholder="Dunder Mifflin" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="period">Period</Label>
                            <Input id="period" placeholder="2005-Present" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleEditProfile}>Add Experience</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {profile.experience.map((exp, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            {exp.period}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="education" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Education</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className={isEditing ? "visible" : "invisible"}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Education
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Education</DialogTitle>
                          <DialogDescription>Add a new education entry to your profile.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="degree">Degree</Label>
                            <Input id="degree" placeholder="Bachelor of Business Administration" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="institution">Institution</Label>
                            <Input id="institution" placeholder="Scranton University" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Input id="year" placeholder="2001-2005" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleEditProfile}>Add Education</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {profile.education.map((edu, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            {edu.year}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Achievements & Awards</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className={isEditing ? "visible" : "invisible"}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Achievement
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Achievement</DialogTitle>
                          <DialogDescription>Add a new achievement or award to your profile.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="achievement-title">Title</Label>
                            <Input id="achievement-title" placeholder="Top Sales Manager" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="organization">Organization</Label>
                            <Input id="organization" placeholder="Dunder Mifflin" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="achievement-year">Year</Label>
                            <Input id="achievement-year" placeholder="2010" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="achievement-description">Description</Label>
                            <Textarea id="achievement-description" placeholder="Describe your achievement..." />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleEditProfile}>Add Achievement</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {profile.achievements.map((achievement, index) => (
                    <Card key={index} className="border-navy/10">
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold text-navy">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            {achievement.year}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>

              {/* Edit profile button */}
              <div className="flex justify-end">
                <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Done Editing" : "Edit Profile"}</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
