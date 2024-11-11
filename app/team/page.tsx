import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

type TeamMember = {
  name: string;
  role: string;
  github: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Mark Angelo R. Baricante",
    role: "Project Manager/Fullstack Developer",
    github: "https://github.com/angelobaricante",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Elwin Jen M. Barredo",
    role: "Front End Developer",
    github: "https://github.com/elwintheDEVisor",
    image: "/images/elwin.jpg"
  },
  {
    name: "Boris G. Hernandez",
    role: "Backend Developer",
    github: "https://github.com/BorisHer",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    name: "Cyrus R. Rol",
    role: "Frontend Developer",
    github: "https://github.com/cyrsrol",
    image: "/placeholder.svg?height=200&width=200"
  },
]

const advisor = {
  name: "Ms. FATIMA MARIE P. AGDON, MSCS",
  role: "Project Advisor",
  github: "https://github.com/marieemoiselle",
  image: "/placeholder.svg?height=200&width=200"
}

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="bg-card">
            <CardHeader className="p-4">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto object-cover"
              />
            </CardHeader>
            <CardContent className="text-center p-4">
              <CardTitle className="mb-2 text-lg">{member.name}</CardTitle>
              <p className="mb-2 text-sm text-muted-foreground">{member.role}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
                aria-label={`${member.name}'s GitHub profile`}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Profile
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-center">Our Advisor</h2>
      <Card className="bg-card max-w-none mx-auto sm:max-w-sm">
        <CardHeader className="p-4">
          <Image
            src={advisor.image}
            alt={advisor.name}
            width={200}
            height={200}
            className="rounded-full mx-auto object-cover"
          />
        </CardHeader>
        <CardContent className="text-center p-4">
          <CardTitle className="mb-2 text-lg">{advisor.name}</CardTitle>
          <p className="mb-2 text-sm text-muted-foreground">{advisor.role}</p>
          <a
            href={advisor.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
            aria-label={`${advisor.name}'s GitHub profile`}
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub Profile
          </a>
        </CardContent>
      </Card>
    </div>
  )
}