import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function PrivacyPolicy() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    introduction: true,
    collection: false,
    usage: false,
    storage: false,
    sharing: false,
    rights: false,
    cookies: false,
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
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy for Al-Rawy Website</h1>
      <p className="mb-4 text-sm text-gray-600">Last updated: 10 Oct 2024</p>

      <section className="mb-6">
        <SectionTitle title="1. Introduction" section="introduction" />
        {openSections.introduction && (
          <p className="mb-4">
            Welcome to Al-Rawy Website ("we", "our", or "us"), an interior design company. We are committed to protecting your personal information and your right to privacy. This privacy policy describes how we collect, use, store, and share your information when you use our website.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="2. Information We Collect" section="collection" />
        {openSections.collection && (
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Personal Information</strong>: When you create an account, we collect your username, email address, password, and phone number.</li>
            <li><strong>Contact Information</strong>: When you use our contact form, we collect your name, email address, and any message you provide.</li>
            <li><strong>Review Content</strong>: If you leave a review, we collect the content of your review along with your name and any rating you provide.</li>
          </ul>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="3. How We Use Your Information" section="usage" />
        {openSections.usage && (
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features of our website</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To provide you with news, special offers and general information about other goods, services and events which we offer</li>
          </ul>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="4. How We Store Your Information" section="storage" />
        {openSections.storage && (
          <p className="mb-4">
            We securely store your information using industry-standard encryption and security measures. We retain your information for as long as your account is active or as needed to provide you services. If you wish to cancel your account or request that we no longer use your information, please contact us.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="5. How We Share Your Information" section="sharing" />
        {openSections.sharing && (
          <>
            <p className="mb-4">We do not sell your personal information to third parties. We may share your information in the following situations:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>With service providers who assist us in operating our website</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights or property</li>
              <li>With your consent or at your direction</li>
            </ul>
          </>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="6. Your Data Protection Rights" section="rights" />
        {openSections.rights && (
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access, update or to delete your personal information</li>
            <li>The right of rectification</li>
            <li>The right to object</li>
            <li>The right of restriction</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="7. Cookies and Tracking Technologies" section="cookies" />
        {openSections.cookies && (
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        )}
      </section>

      <section className="mb-6">
        <SectionTitle title="8. Changes to This Privacy Policy" section="changes" />
        {openSections.changes && (
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        )}
      </section>
    </div>
  )
}