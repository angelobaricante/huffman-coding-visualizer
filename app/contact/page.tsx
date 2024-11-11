import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Users } from "lucide-react"

type TeamMember = {
  name: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  { name: "Mark Angelo R. Baricante", email: "22-03691@g.batstate-u.edu.ph" },
  { name: "Elwin Jen M. Barredo", email: "22-07108@g.batstate-u.edu.ph" },
  { name: "Boris G. Hernandez", email: "22-09664@g.batstate-u.edu.ph" },
  { name: "Cyrus R. Rol", email: "22-00906@g.batstate-u.edu.ph" },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-pale-violet-red text-pale-violet-red-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Mail className="w-6 h-6 mr-2" />
              General Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <a 
              href="22-03691@g.batstate-u.edu.ph" 
              className="text-xl font-semibold hover:underline"
            >
              22-03691@g.batstate-u.edu.ph
            </a>
            <p className="mt-4">
              For general questions about our Huffman Coding Visualizer or to share your feedback, please use this email address.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-pale-violet-red text-pale-violet-red-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Users className="w-6 h-6 mr-2" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {teamMembers.map((member, index) => (
                <li key={index} className="text-center">
                  <p className="font-semibold">{member.name}</p>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-sm hover:underline"
                  >
                    {member.email}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 text-center">
        We'd love to hear from you! Whether you have questions about our Huffman Coding Visualizer or want to share your feedback, don't hesitate to reach out.
      </p>
    </div>
  )
}