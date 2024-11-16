'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log({ name, email, message })
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>You can also reach us through the following channels:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>huffman@example.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>123 Coding Street, Algorithm City, 12345</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">What is Huffman coding?</h3>
              <p className="text-muted-foreground">Huffman coding is a data compression algorithm that assigns variable-length codes to characters based on their frequency of occurrence.</p>
            </div>
            <div>
              <h3 className="font-semibold">How can I use your visualizer?</h3>
              <p className="text-muted-foreground">Our visualizer is web-based and can be accessed directly through your browser. Simply input your data and watch the Huffman coding process unfold step-by-step.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is the visualizer free to use?</h3>
              <p className="text-muted-foreground">Yes, our Huffman Coding Visualizer is completely free for educational and non-commercial use.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}