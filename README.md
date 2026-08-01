# Vultrack

Vultrack is a web security analysis project designed to inspect websites, identify common security issues and generate structured scan results.

The project combines a Python backend, a scanning engine and a Discord integration to make website security checks easier to launch and review.

## Overview

Vultrack can:

- Scan a website from a URL
- Analyze HTTP response headers
- Detect common web security weaknesses
- Assign severity levels to findings
- Calculate a global security score
- Generate structured scan results
- Expose scan features through an API
- Launch scans from a Discord bot

## Technologies

- Python
- FastAPI
- Pydantic
- AsyncIO
- HTTPX
- Discord.py
- HTML
- CSS
- JavaScript

## Technical features

- Asynchronous website scanning
- Modular scanner and analyzer architecture
- Security-header inspection
- Vulnerability severity classification
- Automatic score calculation
- REST API endpoints
- Structured response models
- Discord command integration
- Error handling and validation

## Architecture

The project is divided into several components:

- **Scanner** — collects website and HTTP information
- **Analyzer** — evaluates the collected data and identifies weaknesses
- **API** — exposes scan endpoints through FastAPI
- **Models** — defines validated request and response structures
- **Report system** — prepares scan results for export
- **Discord bot** — allows scans to be launched from Discord

## Example checks

Depending on the scanned website, Vultrack may inspect:

- Security-related HTTP headers
- HTTPS usage
- Redirect behavior
- Server information exposure
- Content Security Policy
- Clickjacking protection
- MIME-type protection
- Referrer policy
- Cookie security settings

## Project status

Vultrack is an experimental security analysis project under active development.

Some features are still being improved, including:

- Persistent scan history
- PDF report generation
- Technology detection
- Extended vulnerability checks
- Improved reporting
- Production deployment

## Security notice

Vultrack is intended for educational, defensive and authorized testing purposes only.

Only scan systems that you own or have explicit permission to test.

The results should not be considered a complete professional security audit.

## Repository notice

This repository contains a private personal project.

The source code is shared for portfolio, recruitment and technical evaluation purposes only.

## License

Copyright © 2026 Gabriel Sdika.

All rights reserved.

No part of this repository may be copied, modified, distributed, published, sublicensed or used commercially without prior written permission from the author.
