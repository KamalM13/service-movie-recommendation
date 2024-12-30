import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function TermsOfService() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    acceptance: true,
    services: false,
    account: false,
    intellectualProperty: false,
    userContent: false,
    prohibited: false,
    termination: false,
    disclaimer: false,
    limitation: false,
    changes: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const SectionTitle = ({ title, section }: { title: string; section: string }) => (
    <h2 
      className="text-xl font-semibold mb-2 cursor-pointer flex justify-between items-center"
      onClick={() => toggleSection(section)}
    >
      {title}
      {openSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </h2>
  )

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service for Al-Rawy Website</h1>
      <p className="mb-4 text-sm text-gray-600">Last updated: 10 Oct 2024</p>

      <section className="mb-6">
        <SectionTitle title="1. Acceptance of Terms" section="acceptance" />
        {openSections.acceptance && (
          <p className="mb-4">
            By accessing or using Al-Rawy Website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the website.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="2. Description of Services" section="services" />
        {openSections.services && (
          <p className="mb-4">
            Al-Rawy Website provides an online platform for browsing interior design products, packages, and services. We also offer user reviews, contact forms, and account creation functionality.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="3. User Account" section="account" />
        {openSections.account && (
          <>
            <p className="mb-2">To access certain features of the website, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            <p className="mb-2">You are responsible for safeguarding the password that you use to access the website and for any activities or actions under your password.</p>
          </>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="4. Intellectual Property" section="intellectualProperty" />
        {openSections.intellectualProperty && (
          <p className="mb-4">
            The website and its original content, features, and functionality are owned by Al-Rawy and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="5. User-Generated Content" section="userContent" />
        {openSections.userContent && (
          <>
            <p className="mb-2">By posting content to the website, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the website.</p>
            <p className="mb-2">You agree that this license includes the right for us to make your content available to other users of the website, who may also use your content subject to these Terms.</p>
          </>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="6. Prohibited Activities" section="prohibited" />
        {openSections.prohibited && (
          <ul className="list-disc pl-6 mb-4">
            <li>Use the website in any way that violates any applicable national or international law or regulation.</li>
            <li>Impersonate or attempt to impersonate Al-Rawy, an Al-Rawy employee, another user, or any other person or entity.</li>
            <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which, as determined by us, may harm Al-Rawy or users of the website or expose them to liability.</li>
          </ul>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="8. Termination" section="termination" />
        {openSections.termination && (
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the website immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="9. Disclaimer" section="disclaimer" />
        {openSections.disclaimer && (
          <p className="mb-4">
            The website is provided on an "AS IS" and "AS AVAILABLE" basis. Al-Rawy expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="10. Limitation of Liability" section="limitation" />
        {openSections.limitation && (
          <p className="mb-4">
            In no event shall Al-Rawy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="12. Changes to Terms" section="changes" />
        {openSections.changes && (
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        )}
      </section>
    </div>
  )
}