import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-navy text-white">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between md:py-12 px-4 md:px-6">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-gold" />
            <span className="text-lg font-semibold">AlumniConnect</span>
          </Link>
          <p className="text-sm text-white/70">
            Connecting alumni since 2023. <br />
            &copy; {new Date().getFullYear()} AlumniConnect. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gold">Platform</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Features
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gold">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                About
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Blog
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Careers
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Cookies
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gold">Support</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Contact
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Help Center
              </Link>
              <Link href="#" className="text-sm hover:text-gold transition-colors">
                Feedback
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
