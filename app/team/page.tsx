'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from 'lucide-react'
import { motion } from "framer-motion"

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
    image: "/angelo_baricante.jpg"
  },
  {
    name: "Elwin Jen M. Barredo",
    role: "Front End Developer",
    github: "https://github.com/elwintheDEVisor",
    image: "/elwin.png"
  },
  {
    name: "Boris G. Hernandez",
    role: "Backend Developer",
    github: "https://github.com/BorisHer",
    image: "/boris.png"
  },
  {
    name: "Cyrus R. Rol",
    role: "Frontend Developer",
    github: "https://github.com/cyrsrol",
    image: "/cyrus.png"
  },
]

const advisor = {
  name: "Ms. FATIMA MARIE P. AGDON, MSCS",
  role: "Project Advisor",
  github: "https://github.com/marieemoiselle",
  image: "/fatima_agdon.jpg"
}

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tighter">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground">
          We&apos;re passionate developers making Huffman coding accessible through interactive visualization. Our platform bridges theory and practice, helping users grasp data compression concepts intuitively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="bg-card hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <CardHeader className="p-4 relative overflow-hidden">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 transform hover:scale-105"
                    />
                  </div>
                  {hoveredMember === index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors duration-300 flex items-center"
                        aria-label={`${member.name}'s GitHub profile`}
                      >
                        <Github className="w-8 h-8 mr-2" />
                        <span className="text-lg font-semibold">GitHub Profile</span>
                      </a>
                    </motion.div>
                  )}
                </CardHeader>
                <CardContent className="text-center p-4">
                  <CardTitle className="mb-2 text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tighter">Our Advisor</h2>
          <p className="text-lg text-muted-foreground">
            Guiding our team with expertise and vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-card max-w-sm mx-auto overflow-hidden">
            <CardHeader className="p-4 relative">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="text-center p-6">
              <CardTitle className="mb-2 text-2xl">{advisor.name}</CardTitle>
              <p className="mb-4 text-lg text-muted-foreground">{advisor.role}</p>
              <a
                href={advisor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline text-lg"
                aria-label={`${advisor.name}'s GitHub profile`}
              >
                <Github className="w-6 h-6 mr-2" />
                GitHub Profile
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}