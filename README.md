# Multimedia Solutions Cafe (MSC)

A responsive business website for **Multimedia Solutions Cafe**,
presenting wedding photography, cinematic videography, photo and video
editing, premium wedding albums, computer and PC solutions, CCTV
solutions, and an enquiry-based tech store.

## Project structure

``` text
MSC-index/
├── index.html          # Main business landing page
├── store.html          # MSC Tech Store and service information
├── privacy.html        # Privacy Policy
├── terms.html          # Terms and Conditions
├── css/
│   ├── style.css       # Main website styles
│   └── store.css       # Tech Store styles
├── js/
│   └── script.js       # Main page interactions and enquiry form behavior
└── data/
    ├── logo.png
    ├── MSC Store.mp4
    └── msc-store-hero.mp4
```

## Features

-   Business landing page with service highlights and portfolio-style
    sections.
-   Wedding photography, wedding films, photo/video editing, and wedding
    album sections.
-   Computer/PC, gaming setup, and CCTV-related service information.
-   Separate Tech Store information page for products and services.
-   Dedicated Privacy Policy and Terms & Conditions pages.
-   Responsive styling for desktop and mobile layouts.
-   Enquiry form with WhatsApp-based message flow on the main page.

## Technology

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   Local image and video assets

This version is a static front-end website. It does not include a PHP
backend, database, admin dashboard, shopping cart, or online payment
processing.

## Run locally

1.  Extract the ZIP archive.
2.  Open the `MSC-index` folder.
3.  Open `index.html` in a modern browser.

For a more reliable local preview, use a local static server such as the
VS Code **Live Server** extension. Keep the folder structure intact so
relative CSS, JavaScript, image, and video paths continue to work.

## Enquiry form

The main-page enquiry form uses the JavaScript in `js/script.js` to
prepare a WhatsApp enquiry. Test it on a device where WhatsApp or
WhatsApp Web is available. The current static version does not
automatically store enquiries in a database or send them to email.

If email notifications or database storage are required, connect a
secure backend or a trusted form service. Do not put email passwords,
API secrets, or other credentials in front-end JavaScript.

## Before publishing

-   Check every image and video on the actual hosting URL.
-   Test navigation, WhatsApp links, and the enquiry form on mobile and
    desktop.
-   Replace any placeholder content with verified business information
    and genuine customer feedback.
-   Confirm the phone number, email address, business hours, and
    location are correct.
-   Review the Privacy Policy against the actual data collection and
    tracking behavior.
-   Add SEO metadata, a favicon, and social sharing metadata where
    needed.
-   Use HTTPS on the live website.

## Deployment

This is a static HTML/CSS/JavaScript website and can be hosted on a
static hosting provider or regular web hosting. Upload the contents of
the `MSC-index` folder while preserving the folder structure. If you
later add PHP processing, database storage, or other server-side
features, choose hosting that supports those features.

## Maintenance

Keep a backup before changing files. When updating the website, check
both `index.html` and `store.html`, and verify that the styles and
assets still load correctly after deployment.

------------------------------------------------------------------------

**Project:** Multimedia Solutions Cafe (MSC)\
**Purpose:** Business showcase and customer enquiries\
**Status:** Static front-end website
