export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>Brief overview of the proposed software solution.</p>
      
      <h2>Project Scope</h2>
      <p>Detailed description of project objectives, deliverables, and timeline.</p>
      
      <h2>Technical Requirements</h2>
      <ul>
        <li>Technology stack</li>
        <li>Architecture overview</li>
        <li>Integration requirements</li>
      </ul>

      <h2>Budget & Timeline</h2>
      <p>Cost estimates and project schedule breakdown.</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Project Overview</h2>
      <p>Introduction to the project and its objectives.</p>

      <h2>Goals & Objectives</h2>
      <ul>
        <li>Primary goal</li>
        <li>Secondary objectives</li>
        <li>Success metrics</li>
      </ul>

      <h2>Implementation Plan</h2>
      <p>Strategy and methodology for project execution.</p>

      <h2>Resources & Budget</h2>
      <p>Required resources and financial considerations.</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <div class="letter-header">
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP]</p>
        <p>[Date]</p>
      </div>

      <div class="recipient">
        <p>[Recipient Name]</p>
        <p>[Company Name]</p>
        <p>[Address]</p>
        <p>[City, State ZIP]</p>
      </div>

      <p>Dear [Recipient Name],</p>

      <p>[Body of the letter]</p>

      <p>Sincerely,</p>
      <p>[Your Name]</p>
      <p>[Your Title]</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Email] | [Phone] | [Location]</p>

      <h2>Professional Summary</h2>
      <p>Brief overview of your professional background and key strengths.</p>

      <h2>Work Experience</h2>
      <div class="experience">
        <h3>[Company Name] - [Job Title]</h3>
        <p>[Dates]</p>
        <ul>
          <li>Key achievement or responsibility</li>
          <li>Key achievement or responsibility</li>
        </ul>
      </div>

      <h2>Education</h2>
      <p>[Degree] - [Institution]</p>
      <p>[Graduation Year]</p>

      <h2>Skills</h2>
      <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
      </ul>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <div class="letter-header">
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP]</p>
        <p>[Date]</p>
      </div>

      <div class="recipient">
        <p>[Hiring Manager's Name]</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p>[City, State ZIP]</p>
      </div>

      <p>Dear [Hiring Manager's Name],</p>

      <p>I am writing to express my interest in the [Position] role at [Company Name].</p>

      <p>[Body paragraph about your qualifications]</p>

      <p>[Body paragraph about why you're interested in the company]</p>

      <p>Thank you for considering my application. I look forward to discussing how I can contribute to [Company Name].</p>

      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <div class="letter-header">
        <p>[Your Address]</p>
        <p>[City, State ZIP]</p>
        <p>[Date]</p>
      </div>

      <div class="recipient">
        <p>[Recipient's Name]</p>
        <p>[Address]</p>
        <p>[City, State ZIP]</p>
      </div>

      <p>Dear [Recipient's Name],</p>

      <p>[First paragraph: Introduction and purpose of the letter]</p>

      <p>[Second paragraph: Main content of the letter]</p>

      <p>[Final paragraph: Closing thoughts and call to action if needed]</p>

      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
];
