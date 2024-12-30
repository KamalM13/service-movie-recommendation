import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/accordion";

export default function FAQs() {
  return (
    <section className="text-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="services">
            <AccordionTrigger className="text-lg font-medium">What services does NovaTech offer?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  NovaTech specializes in Web Development, Mobile App Development, and AI solutions. We provide customized software solutions tailored to meet the unique needs of businesses across various industries.
                </p>
                <p>
                  Our services include building responsive websites, creating cross-platform mobile applications, and implementing AI-powered features to enhance user experience.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="projectTimeline">
            <AccordionTrigger className="text-lg font-medium">How long does it take to complete a project?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  The project timeline varies depending on the scope and complexity of the project. After an initial consultation, we provide an estimated timeline that outlines each phase of the project from planning to deployment.
                </p>
                <p>
                  We strive to deliver projects on time while maintaining the highest standards of quality and efficiency.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pricing">
            <AccordionTrigger className="text-lg font-medium">How is pricing determined for your services?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  Our pricing is tailored to each project based on factors such as project size, complexity, and specific client requirements. We offer a transparent pricing model and will provide a detailed quote after understanding your needs.
                </p>
                <p>
                  Please contact us for a consultation to discuss your project and receive a personalized quote.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger className="text-lg font-medium">What kind of support do you provide after project completion?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  NovaTech offers post-launch support to ensure your project runs smoothly. This includes bug fixes, performance monitoring, and updates as needed.
                </p>
                <p>
                  We also offer extended maintenance and support packages to keep your solution up-to-date with the latest technologies and industry standards.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="security">
            <AccordionTrigger className="text-lg font-medium">How does NovaTech ensure data security?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  Data security is a top priority at NovaTech. We implement industry-standard security measures, including encryption, secure coding practices, and regular security audits, to protect your data from unauthorized access.
                </p>
                <p>
                  Our team is dedicated to following best practices in cybersecurity to safeguard your business information.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="technologies">
            <AccordionTrigger className="text-lg font-medium">What technologies does NovaTech use?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  NovaTech uses a wide range of modern technologies tailored to the needs of each project. Our tech stack includes popular frameworks and languages such as React, Flutter, Node.js, Python, and more.
                </p>
                <p>
                  We continually explore new technologies to ensure we provide cutting-edge solutions for our clients.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="consultation">
            <AccordionTrigger className="text-lg font-medium">How can I schedule a consultation with NovaTech?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>
                  Scheduling a consultation with NovaTech is easy. You can contact us via our website, send us an email, or call us directly to discuss your project needs.
                </p>
                <p>
                  Our team is ready to assist you and provide expert guidance on how we can bring your vision to life.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
