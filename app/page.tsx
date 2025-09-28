"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Shield,
  Search,
  MousePointer,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 34,
    seconds: 56,
  })

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timer)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Instant Eligibility Check",
      description: "Connect wallet, check if you qualify.",
      icon: <Search className="size-5" />,
    },
    {
      title: "One-Click Claiming",
      description: "Claim your reward instantly, no gas fees.",
      icon: <MousePointer className="size-5" />,
    },
    {
      title: "Ironclad Security",
      description: "Non-custodial, fully secure automated claims.",
      icon: <Shield className="size-5" />,
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span>AsterDrop</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </button>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Connect Wallet
            </Link>
            <Button className="rounded-full">
              Launch App
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection("features")} className="py-2 text-sm font-medium text-left">
                Features
              </button>
              <button onClick={() => scrollToSection("how-it-works")} className="py-2 text-sm font-medium text-left">
                How It Works
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="py-2 text-sm font-medium text-left">
                Community
              </button>
              <button onClick={() => scrollToSection("faq")} className="py-2 text-sm font-medium text-left">
                FAQ
              </button>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Connect Wallet
                </Link>
                <Button className="rounded-full">
                  Launch App
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-r from-primary/20 to-yellow-400/20 border border-primary/30 rounded-full px-6 py-3">
                  <div className="flex items-center gap-4 text-sm font-mono">
                    <Clock className="size-4 text-primary" />
                    <span className="text-muted-foreground">Claim deadline:</span>
                    <div className="flex gap-2">
                      <span className="bg-primary/20 px-2 py-1 rounded text-primary font-bold">{timeLeft.days}d</span>
                      <span className="bg-primary/20 px-2 py-1 rounded text-primary font-bold">{timeLeft.hours}h</span>
                      <span className="bg-primary/20 px-2 py-1 rounded text-primary font-bold">
                        {timeLeft.minutes}m
                      </span>
                      <span className="bg-primary/20 px-2 py-1 rounded text-primary font-bold">
                        {timeLeft.seconds}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-primary/20 to-yellow-400/20 border-primary/30"
                variant="secondary"
              >
                Historic AsterDex Airdrop
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-yellow-400">
                Claim Your AsterDex Airdrop—Effortlessly. One Chance Only.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Automated, gas-free claiming tool for the historic AsterDex token drop.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90"
                >
                  Start Claiming
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-primary/30 hover:bg-primary/10"
                >
                  View Demo
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>No gas fees</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>One-time event</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Secure & mysterious</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
                
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/40 to-yellow-400/40 blur-3xl opacity-80 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-yellow-400/40 to-primary/40 blur-3xl opacity-80 animate-pulse"></div>
              <div className="absolute top-10 right-10 text-yellow-400/60 animate-pulse">
                <Star className="size-6 fill-current" />
              </div>
              <div className="absolute bottom-20 left-20 text-primary/60 animate-pulse">
                <Star className="size-4 fill-current" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Logos Section */}
        nd md:text-lg">
                The one-time AsterDex airdrop requires precision. Our automated system ensures you don't miss this rare
                opportunity.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-lg hover:shadow-primary/20">
                    <CardContent className="p-8 flex flex-col h-full text-center">
                      <div className="size-12 rounded-full bg-gradient-to-br from-primary/20 to-yellow-400/20 flex items-center justify-center text-primary mb-6 mx-auto">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-primary/20 to-yellow-400/20 border-primary/30"
                variant="secondary"
              >
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your Path to the Historic Drop</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Three simple steps separate you from your AsterDex rewards. Our mysterious system handles the
                complexity.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Connect Wallet",
                  description: "Connect wallet, check if you qualify.",
                },
                {
                  step: "02",
                  title: "Check Eligibility",
                  description: "Instant verification of your AsterDex activity and reward eligibility.",
                },
                {
                  step: "03",
                  title: "Claim Reward",
                  description: "One-click claiming with zero gas fees. Your ASTER tokens arrive instantly.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-primary/20 to-yellow-400/20 border-primary/30"
                variant="secondary"
              >
                Community
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Saved from Missing the Historic Drop</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Community members who almost missed their once-in-a-lifetime AsterDex airdrop opportunity.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "I almost missed the AsterDex airdrop completely! AsterDrop saved me at the last minute. This tool is a lifesaver for the one-time historic drop.",
                  author: "Alex Chen",
                  role: "DeFi Trader",
                  rating: 5,
                },
                {
                  quote:
                    "The deadline was approaching and I was traveling. AsterDrop claimed my historic AsterDex tokens automatically. I would have lost everything without it.",
                  author: "Sarah Kim",
                  role: "Crypto Enthusiast",
                  rating: 5,
                },
                {
                  quote:
                    "This isn't just another airdrop - it's THE AsterDex drop. AsterDrop made sure I didn't miss this once-in-a-lifetime opportunity. Pure genius.",
                  author: "Marcus Rodriguez",
                  role: "AsterDex Power User",
                  rating: 5,
                },
                {
                  quote:
                    "I was skeptical about the urgency until I realized this was the only AsterDex airdrop ever. AsterDrop secured my historic rewards flawlessly.",
                  author: "Emma Thompson",
                  role: "Community Member",
                  rating: 5,
                },
                {
                  quote:
                    "The countdown timer showed me how close I was to missing everything. AsterDrop claimed my tokens with hours to spare. Incredible tool.",
                  author: "David Park",
                  role: "Long-term Holder",
                  rating: 5,
                },
                {
                  quote:
                    "This is history in the making - the first and only AsterDex airdrop. AsterDrop ensured I'm part of this exclusive group of recipients.",
                  author: "Lisa Wang",
                  role: "DeFi Investor",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md hover:shadow-primary/10">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-gradient-to-br from-primary/20 to-yellow-400/20 flex items-center justify-center text-foreground font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-primary/20 to-yellow-400/20 border-primary/30"
                variant="secondary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Critical Questions About Your Claim</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Everything you need to know about claiming your historic AsterDex airdrop.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How do I know if I'm eligible for the AsterDex airdrop?",
                    answer:
                      "Connect your wallet to AsterDrop and we'll instantly check your eligibility based on your AsterDex trading history, liquidity provision, and community participation. The historic airdrop rewards active users who contributed to the platform's growth.",
                  },
                  {
                    question: "Is this really the only AsterDex airdrop ever?",
                    answer:
                      "Yes, this is the one and only AsterDex airdrop event. It's a historic distribution to reward early adopters and active community members. There will be no future airdrops, making this a once-in-a-lifetime opportunity.",
                  },
                  {
                    question: "What happens if I miss the claiming deadline?",
                    answer:
                      "Unclaimed tokens will be permanently lost after the deadline. This is why AsterDrop exists - to ensure you never miss this historic opportunity. Our automated system claims your tokens before the deadline expires.",
                  },
                  {
                    question: "How does AsterDrop claim without gas fees?",
                    answer:
                      "AsterDrop uses advanced transaction optimization and covers all gas costs for users. You receive 100% of your eligible ASTER tokens without any deductions or fees. This is our commitment to the community.",
                  },
                  {
                    question: "Is my wallet secure with AsterDrop?",
                    answer:
                      "Absolutely. AsterDrop is non-custodial and never stores your private keys. We only request the minimum permissions necessary to execute the claiming transaction on your behalf. Your funds remain completely under your control.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-yellow-400 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 text-white/30 animate-pulse">
            <Star className="size-8 fill-current" />
          </div>
          <div className="absolute bottom-32 left-32 text-white/20 animate-pulse">
            <Star className="size-6 fill-current" />
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Don't Miss History in the Making
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
                The first and only AsterDex airdrop. A rare, once-in-a-lifetime opportunity that will never come again.
                Claim your place in crypto history.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-white text-primary hover:bg-white/90"
                >
                  Start Claiming Now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  View Demo
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80 mt-4">
                No gas fees. One-time event. Secure & mysterious experience.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  A
                </div>
                <span>AsterDrop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The automated utility for the historic AsterDex airdrop. Claim your once-in-a-lifetime rewards with
                mysterious, elegant precision.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} AsterDrop. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
