'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Database,
  Globe,
  Terminal,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
} from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <div className="hidden md:flex gap-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
              Your Name Here
            </h2>
            <p className="text-2xl md:text-3xl text-slate-600 mb-8">
              Full Stack Developer & Designer
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Crafting beautiful, performant, and scalable web applications with
              modern technologies. Passionate about creating exceptional user
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="group"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>
            <div className="flex gap-6 justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors hover:scale-110 transform duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors hover:scale-110 transform duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-slate-600 hover:text-slate-900 transition-colors hover:scale-110 transform duration-200"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="h-8 w-8 text-slate-400" />
          </button>
        </div>
      </section>

      <section id="about" className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About Me
          </h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Hello! I'm a passionate developer with over X years of
                experience in building web applications. I specialize in
                creating clean, efficient, and user-friendly solutions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                My journey in tech started with a curiosity for how things work,
                and has evolved into a career focused on solving complex
                problems through elegant code and thoughtful design.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Award className="h-8 w-8 text-slate-700 mb-4" />
                <h4 className="font-bold text-2xl mb-2">10+</h4>
                <p className="text-slate-600">Projects Completed</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Briefcase className="h-8 w-8 text-slate-700 mb-4" />
                <h4 className="font-bold text-2xl mb-2">5+</h4>
                <p className="text-slate-600">Years Experience</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Globe className="h-8 w-8 text-slate-700 mb-4" />
                <h4 className="font-bold text-2xl mb-2">20+</h4>
                <p className="text-slate-600">Happy Clients</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <GraduationCap className="h-8 w-8 text-slate-700 mb-4" />
                <h4 className="font-bold text-2xl mb-2">15+</h4>
                <p className="text-slate-600">Certifications</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Skills & Expertise
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-slate-100 w-16 h-16 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-slate-700" />
              </div>
              <h4 className="text-xl font-bold mb-4">Frontend Development</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Building responsive and interactive user interfaces with modern
                frameworks and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Vue.js</Badge>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-slate-100 w-16 h-16 flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-slate-700" />
              </div>
              <h4 className="text-xl font-bold mb-4">Backend Development</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Creating robust APIs and server-side applications with focus on
                scalability and performance.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">PostgreSQL</Badge>
                <Badge variant="secondary">MongoDB</Badge>
                <Badge variant="secondary">Express</Badge>
                <Badge variant="secondary">GraphQL</Badge>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-slate-100 w-16 h-16 flex items-center justify-center mb-6">
                <Palette className="h-8 w-8 text-slate-700" />
              </div>
              <h4 className="text-xl font-bold mb-4">UI/UX Design</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Designing intuitive and beautiful interfaces that users love to
                interact with.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Figma</Badge>
                <Badge variant="secondary">Adobe XD</Badge>
                <Badge variant="secondary">Prototyping</Badge>
                <Badge variant="secondary">Design Systems</Badge>
                <Badge variant="secondary">Wireframing</Badge>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-slate-100 w-16 h-16 flex items-center justify-center mb-6">
                <Terminal className="h-8 w-8 text-slate-700" />
              </div>
              <h4 className="text-xl font-bold mb-4">DevOps & Tools</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Automating workflows and managing infrastructure for efficient
                development and deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Docker</Badge>
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">CI/CD</Badge>
                <Badge variant="secondary">AWS</Badge>
                <Badge variant="secondary">Vercel</Badge>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-slate-100 w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-slate-700" />
              </div>
              <h4 className="text-xl font-bold mb-4">Performance</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Optimizing applications for speed, accessibility, and search
                engine visibility.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Optimization</Badge>
                <Badge variant="secondary">SEO</Badge>
                <Badge variant="secondary">Analytics</Badge>
                <Badge variant="secondary">Accessibility</Badge>
                <Badge variant="secondary">Lighthouse</Badge>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-slate-100 w-16 h-16 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-slate-700" />
              </div>
              <h4 className="text-xl font-bold mb-4">Web Technologies</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Leveraging modern web standards and technologies to build
                cutting-edge applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">HTML5</Badge>
                <Badge variant="secondary">CSS3</Badge>
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">REST APIs</Badge>
                <Badge variant="secondary">WebSockets</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="h-24 w-24 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-3">Project Name 1</h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  A comprehensive web application built with React and Node.js.
                  Features include real-time updates, authentication, and
                  responsive design.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>Tailwind</Badge>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="group/btn">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Palette className="h-24 w-24 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-3">Project Name 2</h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  An elegant e-commerce platform with advanced filtering, cart
                  management, and payment integration. Built for scalability.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Stripe</Badge>
                  <Badge>PostgreSQL</Badge>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="group/btn">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database className="h-24 w-24 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-3">Project Name 3</h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  A data visualization dashboard providing insights through
                  interactive charts and real-time analytics.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge>Vue.js</Badge>
                  <Badge>D3.js</Badge>
                  <Badge>Express</Badge>
                  <Badge>Redis</Badge>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="group/btn">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="h-24 w-24 text-slate-400" />
                </div>
              </div>
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-3">Project Name 4</h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  A social media platform with real-time messaging, post
                  sharing, and advanced user interaction features.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge>React</Badge>
                  <Badge>Socket.io</Badge>
                  <Badge>AWS</Badge>
                  <Badge>GraphQL</Badge>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="group/btn">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Experience
          </h3>
          <div className="space-y-12">
            <div className="relative pl-8 border-l-2 border-slate-300 hover:border-slate-400 transition-colors">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-slate-600"></div>
              <div className="mb-2 text-sm text-slate-500">2022 - Present</div>
              <h4 className="text-2xl font-bold mb-2">Senior Full Stack Developer</h4>
              <p className="text-slate-600 mb-3 font-medium">Company Name</p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Leading development of enterprise-level web applications,
                mentoring junior developers, and implementing best practices
                across the engineering team.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Leadership</Badge>
                <Badge variant="outline">Architecture</Badge>
                <Badge variant="outline">Mentoring</Badge>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-300 hover:border-slate-400 transition-colors">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-slate-600"></div>
              <div className="mb-2 text-sm text-slate-500">2020 - 2022</div>
              <h4 className="text-2xl font-bold mb-2">Full Stack Developer</h4>
              <p className="text-slate-600 mb-3 font-medium">Previous Company</p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Developed and maintained multiple client projects, focusing on
                modern web technologies and creating seamless user experiences.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">AWS</Badge>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-300 hover:border-slate-400 transition-colors">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-slate-600"></div>
              <div className="mb-2 text-sm text-slate-500">2018 - 2020</div>
              <h4 className="text-2xl font-bold mb-2">Frontend Developer</h4>
              <p className="text-slate-600 mb-3 font-medium">Startup Company</p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Built responsive web applications and collaborated with design
                teams to deliver pixel-perfect implementations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">JavaScript</Badge>
                <Badge variant="outline">CSS</Badge>
                <Badge variant="outline">UI/UX</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work Together
          </h3>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <Mail className="h-8 w-8 text-slate-700 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Email</h4>
              <a
                href="mailto:your.email@example.com"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                your.email@example.com
              </a>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <Linkedin className="h-8 w-8 text-slate-700 mx-auto mb-4" />
              <h4 className="font-bold mb-2">LinkedIn</h4>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                /in/yourprofile
              </a>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <Github className="h-8 w-8 text-slate-700 mx-auto mb-4" />
              <h4 className="font-bold mb-2">GitHub</h4>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                @yourusername
              </a>
            </Card>
          </div>
          <Button size="lg" className="group">
            <Mail className="h-5 w-5 mr-2" />
            Send Me an Email
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-2xl font-bold mb-2">Portfolio</h4>
              <p className="text-slate-400">
                Building the future, one line of code at a time.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
