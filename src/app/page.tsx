"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  /* State Management */
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  /* Configuration */
  const fullText = "Barek Stripling";

  /* Projects Data */
  const projects = [
    {
      year: "2025 - Present",
      title: "AI-Powered PDF Chatbot",
      description: "Built intelligent document Q&A system using RAG architecture with LangChain for PDF processing and text chunking, OpenAI embeddings for semantic search, Supabase vector database for document storage and retrieval, and GPT-4 integration for contextual responses. Deployed with Vercel. [In Progress]",
      link: "https://github.com/BarkStrip/Rag-Chabot",
      demo: "https://barekstripling-chabot.vercel.app/"
    },
    {
      year: "2022",
      title: "Weather Forecast Webpage",
      description: "Built full-stack web application using web scraping to fetch weather data, MySQL database to store weather information, and PHP to create intelligent data refresh system",
      link: "https://github.com/BarkStrip/WeatherDashboard",
      demo: ""
    },
    {
      year: "2021",
      title: "Tic Tac Toe Game",
      description: "Developed desktop game using Java and Swing GUI with separated game logic, interface, and settings components",
      link: "https://github.com/BarkStrip/Tic-Tac-Toe",
      demo: ""
    }
  ];

  /* Typing Animation Effect */
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowProjects(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  /* Projects Slide-Up Animation Effect */
  useEffect(() => {
    if (showProjects) {
      projects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => [...prev, index]);
        }, index * 200);
      });
    }
  }, [showProjects]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 flex items-start" style={{ minHeight: "100vh" }}>
        {/* Main Content Container */}
        <div
          className="flex flex-col justify-center"
          style={{
            width: "100%",
            marginTop: "20vh",
          }}
        >
          {/* Text Content Wrapper */}
          <div className="text-left max-w-2xl px-6" style={{ marginLeft: "10vw" }}>
            {/* Animated Name with Typing Cursor */}
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              {displayText}
              <span className="animate-pulse">|</span>
            </h1>

            {/* Professional Description */}
            <p className="text-lg md:text-xl leading-relaxed font-light mt-6 mb-8">
              Aspiring Software Developer passionate about building solutions that solve real-world problems and eager to expand technical expertise.
            </p>

            {/* GitHub Profile Link */}
            <a
              href="https://github.com/BarkStrip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-light hover:opacity-80 transition-opacity duration-200 underline"
            >
              GitHub
            </a>
            <span className="text-lg md:text-xl font-light">↗</span>

            {/* Projects Section */}
            <div className={`mt-35 transition-opacity duration-2500 ${showProjects ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Projects
              </h2>

              {/* Projects List with Slide-Up Animation */}
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`mb-8 transition-all duration-2000 ease-out ${visibleProjects.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-75'
                    }`}
                >
                  <p className="text-sm mb-1 opacity-60">{project.year}</p>
                  <h3 className="text-lg md:text-xl font-medium mb-2">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed opacity-80">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-light hover:opacity-80 underline"
                  >
                    GitHub
                  </a>
                  <span className="text-base md:text-lg font-light mr-5">↗</span>

                  {project.demo && (
                    <>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-lg font-light hover:opacity-80 underline"
                      >
                        Try it!
                      </a>

                      <span className="text-base md:text-lg font-light">↗</span>
                    </>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 flex items-center justify-center">
        <div className="flex items-center">
          <Image src="/favicon.ico" alt="Favicon" width={20} height={20} className="mr-2" />
          <span className="text-sm opacity-60">Thanks for visiting!</span>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}