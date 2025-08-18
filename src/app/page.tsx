"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  /* State Management */
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [showImages, setShowImages] = useState<number[]>([]);

  /* Refs for project alignment */
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Configuration */
  const fullText = "Barek Stripling";

  /* Projects Data */
  const projects = [
    {
      title: "AI-Powered PDF Chatbot",
      description: "Built intelligent document Q&A system using RAG architecture with LangChain for PDF processing and text chunking, OpenAI embeddings for semantic search, Supabase vector database for document storage and retrieval, and GPT-4 integration for contextual responses. Deployed with Vercel. [In Progress]",
      link: "https://github.com/BarkStrip/Rag-Chabot",
      demo: "https://barekstripling-chabot.vercel.app/",
      image: "/images/project-preview.png"
    },
    {
      title: "Weather Forecast Webpage",
      description: "Built full-stack web application using web scraping to fetch weather data, MySQL database to store weather information, and PHP to create intelligent data refresh system",
      link: "https://github.com/BarkStrip/WeatherDashboard",
      demo: ""
    },
    {
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

  /* Show images with delay after project text */
  useEffect(() => {
    visibleProjects.forEach((index) => {
      if (projects[index].image && !showImages.includes(index)) {
        setTimeout(() => {
          setShowImages(prev => [...prev, index]);
        }, 2000); // 2 second delay after project appears
      }
    });
  }, [visibleProjects]);


  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
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
                  ref={(el) => (projectRefs.current[index] = el)}
                  className={`mb-12 transition-all duration-2000 ease-out ${visibleProjects.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-75'
                    }`}
                >
                  <h3 className="text-lg md:text-xl font-medium mb-2">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed opacity-80 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg font-light hover:opacity-80 underline"
                    >
                      GitHub↗
                    </a>

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-lg font-light hover:opacity-80 underline"
                      >
                        Try it!↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Image Container - Positioned next to description container */}
      {showProjects && (
        <div
          className="absolute"
          style={{
            left: 'calc(10vw + 42rem + 3rem + 2rem)', // 10vw margin + 42rem max-w-2xl + 3rem px-6 padding + 2rem gap
            top: '20vh',
            width: '400px'
          }}
        >
          {projects.map((project, index) => {
            const projectElement = projectRefs.current[index];
            const topOffset = projectElement ?
              projectElement.offsetTop - (window.innerHeight * 0.2) :
              index * 200;

            return (
              project.image && visibleProjects.includes(index) && (
                <div
                  key={`image-${index}`}
                  className={`absolute transition-opacity duration-2000 ease-out ${showImages.includes(index)
                      ? 'opacity-100'
                      : 'opacity-0'
                    }`}
                  style={{
                    top: `${topOffset}px`
                  }}
                >
                  <a
                    href={project.demo || project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                      priority={index === 0}
                    />
                  </a>
                </div>
              )
            );
          })}
        </div>
      )}

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