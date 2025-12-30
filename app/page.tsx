'use client';

import { useState } from 'react';

const Footer = () => {
  // State to track which sections are open (for accordion on mobile)
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
    2: false,
  });

  // Toggle accordion section
  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Static data for testing
  const staticData = {
    logo: '/logo.png', // Replace with your actual logo path
    about: 'We are a leading company providing innovative solutions to help businesses grow and succeed in the digital world.',
    copyright: '© 2024 Your Company. All rights reserved.',
    socialLinks: [
      { name: 'facebook', url: 'https://facebook.com', icon: '📘' },
      { name: 'twitter', url: 'https://twitter.com', icon: '🐦' },
      { name: 'instagram', url: 'https://instagram.com', icon: '📷' },
      { name: 'linkedin', url: 'https://linkedin.com', icon: '💼' },
    ],
    footerSections: [
      {
        title: 'Company',
        links: [
          { label: 'About Us', url: '/about' },
          { label: 'Careers', url: '/careers' },
          { label: 'Press', url: '/press' },
          { label: 'Blog', url: '/blog' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Features', url: '/features' },
          { label: 'Pricing', url: '/pricing' },
          { label: 'Solutions', url: '/solutions' },
          { label: 'Integrations', url: '/integrations' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', url: '/help' },
          { label: 'Contact Us', url: '/contact' },
          { label: 'FAQ', url: '/faq' },
          { label: 'Community', url: '/community' },
        ],
      },
    ],
    bottomLinks: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Cookie Policy', url: '/cookies' },
    ],
  };

  return (
    <footer
      style={{
        backgroundColor: '#1a1a2e',
        color: '#e0e0e0',
        padding: '60px 20px 40px',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* About Section */}
          <div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#4a9eff',
              }}
            >
              Your Company
            </div>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', color: '#b0b0b0' }}>
              {staticData.about}
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              {staticData.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#2d2d44',
                    fontSize: '20px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4a9eff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#2d2d44';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections with Accordion */}
          {staticData.footerSections.map((section, index) => (
            <div key={index}>
              {/* Mobile: Accordion Header (Clickable) */}
              <div
                onClick={() => toggleSection(index)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '12px 0',
                  borderBottom: '1px solid #2d2d44',
                  marginBottom: openSections[index] ? '16px' : '0',
                  transition: 'all 0.3s ease',
                }}
                className="accordion-header md:hidden"
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {section.title}
                </h3>
                <span
                  style={{
                    fontSize: '20px',
                    color: '#4a9eff',
                    transform: openSections[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                  }}
                >
                  ▼
                </span>
              </div>

              {/* Desktop: Always Visible Header */}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#ffffff',
                }}
                className="hidden md:block"
              >
                {section.title}
              </h3>

              {/* Mobile: Collapsible Content */}
              <div
                style={{
                  maxHeight: openSections[index] ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  opacity: openSections[index] ? 1 : 0,
                }}
                className="md:hidden"
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, paddingBottom: '16px' }}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={{ marginBottom: '12px' }}>
                      <a
                        href={link.url}
                        style={{
                          color: '#b0b0b0',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          display: 'block',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#4a9eff';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#b0b0b0';
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desktop: Always Visible Content */}
              <ul
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
                className="hidden md:block"
              >
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.url}
                      style={{
                        color: '#b0b0b0',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#4a9eff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#b0b0b0';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: '1px solid #2d2d44',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <p style={{ margin: 0, color: '#808080' }}>{staticData.copyright}</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {staticData.bottomLinks.map((link, index) => (
              <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a
                  href={link.url}
                  style={{
                    color: '#b0b0b0',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#4a9eff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#b0b0b0';
                  }}
                >
                  {link.label}
                </a>
                {index < staticData.bottomLinks.length - 1 && (
                  <span style={{ color: '#808080' }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Background Gradient Effect */}
      <div
      className='translate3d-0'
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(74, 158, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
    </footer>
  );
};

export default Footer;
