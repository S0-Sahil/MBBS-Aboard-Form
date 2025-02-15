"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Moon, Sun } from "lucide-react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { Mona_Sans as FontSans } from "next/font/google"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility functions
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Font configuration
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Site configuration
const siteConfig = {
  name: "Study MBBS Abroad",
  description: "Find the best opportunities to study MBBS abroad",
}

// Theme provider component
function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Button component
const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// Input component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

// Card components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// Accordion components
const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-200"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

// Theme toggle component
function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// Hero component
function Hero() {
  return (
    <motion.div
      className="text-center py-12 bg-primary text-primary-foreground rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold">Apply Now for MBBS Abroad</h1>
      <Button className="mt-4 bg-background text-primary hover:bg-secondary">Apply Now</Button>
    </motion.div>
  )
}

// WhyStudyAbroad component
function WhyStudyAbroad() {
  const reasons = [
    "Affordable tuition fees",
    "Globally recognized universities",
    "Diverse cultural experience",
    "Better career opportunities",
    "Advanced medical facilities",
    "International exposure",
  ]

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Why Study MBBS Abroad?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reasons.map((reason, index) => (
          <Card key={index} className="bg-card">
            <CardContent className="p-4">
              <p className="text-card-foreground">{reason}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// TopDestinations component
function TopDestinations() {
  const countries = [
    {
      name: "Russia",
      details: "Affordable tuition and globally recognized universities.",
    },
    { name: "Uzbekistan", details: "High-quality education with lower living costs." },
    {
      name: "Kazakhstan",
      details: "Modern medical universities with international recognition.",
    },
    {
      name: "Philippines",
      details: "English-medium education and US-based curriculum.",
    },
    { name: "Georgia", details: "No entrance exams and affordable fees." },
    {
      name: "Kyrgyzstan",
      details: "Budget-friendly medical education with good facilities.",
    },
    {
      name: "Egypt",
      details: "Well-established medical programs with global acceptance.",
    },
  ]

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Top Destinations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country, index) => (
          <Card key={index} className="bg-card">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-card-foreground">{country.name}</h3>
              <p className="text-muted-foreground">{country.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ContactForm component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!formData.name) errors.name = "Name is required"
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Valid email is required"
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errors.phone = "Valid phone number is required"
    if (!formData.country) errors.country = "Preferred country is required"
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      alert("Form submitted successfully!")
      setFormData({ name: "", email: "", phone: "", country: "" })
    }
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Get More Information</h2>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-4"
          required
        />
        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4"
          required
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
        <Input
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="mb-4"
          required
        />
        {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
        <Input
          type="text"
          name="country"
          placeholder="Preferred Country"
          value={formData.country}
          onChange={handleChange}
          className="mb-4"
          required
        />
        {errors.country && <p className="text-destructive text-sm">{errors.country}</p>}
        <Button type="submit" className="w-full bg-primary text-primary-foreground">
          Submit
        </Button>
      </motion.form>
    </section>
  )
}

// FAQ component
function FAQ() {
  const faqs = [
    {
      question: "What are the eligibility criteria for studying MBBS abroad?",
      answer:
        "Generally, you need to have completed high school with Biology, Physics, and Chemistry as main subjects. Some countries may require additional entrance exams or language proficiency tests.",
    },
    {
      question: "How long does it take to complete MBBS abroad?",
      answer:
        "The duration of MBBS programs abroad typically ranges from 5 to 6 years, including internship periods. This can vary depending on the country and university.",
    },
    {
      question: "Are degrees from foreign medical universities recognized globally?",
      answer:
        "Many foreign medical universities offer globally recognized degrees. However, it's important to check if the university is listed in the World Directory of Medical Schools and recognized by the medical council in your home country.",
    },
    {
      question: "What is the medium of instruction for MBBS programs abroad?",
      answer:
        "The medium of instruction varies by country. Many universities offer programs in English, while some may require proficiency in the local language.",
    },
    {
      question: "What are the career prospects after completing MBBS abroad?",
      answer:
        "After completing MBBS abroad, you can practice medicine in the country of study, return to your home country (after clearing necessary licensing exams), or pursue further specialization in other countries.",
    },
  ]

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

// Main component
export default function StudyMBBSAbroad() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`min-h-screen bg-background p-6 ${fontSans.variable} font-sans`}>
        <motion.div
          className="fixed top-4 right-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ThemeToggle />
        </motion.div>
        <Hero />
        <WhyStudyAbroad />
        <TopDestinations />
        <ContactForm />
        <FAQ />
      </div>
    </ThemeProvider>
  )
}

