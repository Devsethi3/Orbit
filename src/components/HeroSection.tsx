import Link from 'next/link'
import React from 'react'
import CanvasCursor from './CanvasCursor'
import { Button } from './ui/button'
import { FaGithub } from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-b from-indigo-50 via-slate-50 to-white overflow-hidden">
            <CanvasCursor />

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-30"></div>
                <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
            </div>

            <section className="relative pt-32 pb-14 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center">


                        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary">
                            Orbit Docs
                        </h1>

                        {/* Description with badges */}
                        <div className="flex flex-col items-center gap-4 mb-10">
                            <p className="xl:text-xl lg:text-lg text-slate-600 max-w-2xl">
                                Comprehensive documentation and guides for building amazing products with Orbit.
                                Get started with our libraries, tools, and resources.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Zero Config
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.094-.666.232-.957C12.425 12.68 12.96 12 14 12c1.04 0 1.575.68 1.768 1.043.138.29.217.617.232.957H12z" />
                                    </svg>
                                    Easy to Use
                                </span>
                                <a
                                    href="https://github.com/orbit/orbit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                                >
                                    <FaGithub className='mr-2' />
                                    GitHub
                                </a>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700">
                                    <SiTypescript className='mr-2' />
                                    TypeScript
                                </span>
                            </div>
                        </div>

                        <div className="flex mb-10 flex-wrap items-center justify-center lg:gap-6 gap-4">
                            <Link href="/dashboard">
                                <Button>Get Started</Button>
                            </Link>
                            <Link href="https://github.com/DevSethi3">
                                <Button variant="outline">
                                    <FaGithub />
                                    Who made this?</Button>
                            </Link>
                        </div>

                        {/* Demo Video */}
                        <div className="w-full max-w-7xl mb-10">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur group-hover:blur-md transition-all"></div>
                                <div className="relative">
                                    <video
                                        className="w-full rounded-lg border-2 border-transparent shadow-lg"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/demo-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons with hover effects */}

                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection