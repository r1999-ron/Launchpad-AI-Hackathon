# DocuSeek :mag_right: :rocket:

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)
![Node.js Version](https://img.shields.io/badge/node.js-14%2B-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**AI-powered enterprise search and workflow automation via WhatsApp**

DocuSeek revolutionizes organizational efficiency by combining AI-powered document retrieval with HR automation through the familiar WhatsApp interface.

## Table of Contents
- [Key Features](#key-features-sparkles)
- [Technology Stack](#technology-stack-computer)
- [Getting Started](#getting-started-rocket)
- [Deployment](#deployment-arrow_forward)
- [Screenshots](#screenshots-camera)
- [API Reference](#api-reference-books)
- [FAQ](#faq-question)
- [Roadmap](#roadmap-map)
- [Contributing](#contributing-handshake)
- [License](#license-page_facing_up)
- [Contact](#contact-email)

## Key Features :sparkles:

### :brain: Intelligent Search
- Natural language queries for policies, guidelines, and reports
- Semantic understanding with Google Gemini and Hugging Face models
- FAISS-powered vector search for lightning-fast results
- Context-aware document recommendations

### :date: Attendance Automation
- Submit leave/WFH requests via WhatsApp
- Manager approval workflows with real-time notifications
- Automated attendance logging
- Calendar integration and conflict detection

### :lock: Secure Access
- Role-based permissions for document access
- Enterprise-grade data protection
- Audit trails for all interactions
- End-to-end encryption for sensitive data

### :control_knobs: Admin Dashboard
- Centralized document management
- Approval workflow configuration
- Analytics and reporting
- User activity monitoring

## Technology Stack :computer:

| Component        | Technology               |
|-----------------|--------------------------|
| AI/ML           | Google Gemini, Hugging Face |
| Vector Database | FAISS                    |
| Backend         | FastAPI (Python)         |
| Frontend        | React.js + Tailwind CSS  |
| Messaging       | Twilio WhatsApp API      |
| Authentication  | JWT                      |
| Deployment      | Render                   |
| CI/CD           | GitHub Actions           |

## Getting Started :rocket:

### Prerequisites

- Python 3.8+
- Node.js 14+
- Twilio account with WhatsApp API enabled
- Google Cloud API key (for Gemini)
- PostgreSQL (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/docuseek.git
cd docuseek

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
