# DocuSeek :mag_right: :rocket:

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)
![Node.js Version](https://img.shields.io/badge/node.js-14%2B-green)

**AI-powered enterprise search and workflow automation via WhatsApp**

DocuSeek revolutionizes organizational efficiency by combining AI-powered document retrieval with HR automation through the familiar WhatsApp interface.

## Key Features :sparkles:

### :brain: Intelligent Search
- Natural language queries for policies, guidelines, and reports
- Semantic understanding with Google Gemini and Hugging Face models
- FAISS-powered vector search for lightning-fast results

### :date: Attendance Automation
- Submit leave/WFH requests via WhatsApp
- Manager approval workflows with real-time notifications
- Automated attendance logging

### :lock: Secure Access
- Role-based permissions for document access
- Enterprise-grade data protection
- Audit trails for all interactions

### :control_knobs: Admin Dashboard
- Centralized document management
- Approval workflow configuration
- Analytics and reporting

## Technology Stack :computer:

| Component        | Technology               |
|-----------------|--------------------------|
| AI/ML           | Google Gemini, Hugging Face |
| Vector Database | FAISS                    |
| Backend         | FastAPI (Python)         |
| Frontend        | React.js                 |
| Messaging       | Twilio WhatsApp API      |
| Deployment      | Docker, AWS/GCP          |

## Getting Started :rocket:

### Prerequisites

- Python 3.8+
- Node.js 14+
- Twilio account with WhatsApp API enabled
- Google Cloud API key (for Gemini)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/docuseek.git
   cd docuseek
