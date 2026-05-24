import { projectStages, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const fieldClass = "form-field";

export function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/contact/success"
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-text-primary">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className={fieldClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium text-text-primary">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            className={fieldClass}
            placeholder="Your role"
          />
        </div>
      </div>

      <div>
        <label htmlFor="project-stage" className="mb-2 block text-sm font-medium text-text-primary">
          Project stage
        </label>
        <select
          id="project-stage"
          name="project-stage"
          required
          className={cn(fieldClass, "form-select")}
          defaultValue=""
        >
          <option value="" disabled>
            Select a stage
          </option>
          {projectStages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-primary">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder="Tell us about your AI initiative, constraints, and goals."
        />
      </div>

      <p className="text-xs text-text-muted">
        By submitting, you agree to be contacted about your inquiry. We do not share your
        information with third parties.
      </p>

      <button
        type="submit"
        className="w-full rounded-lg bg-electric px-8 py-3.5 text-sm font-semibold text-onyx transition-colors hover:bg-cyan-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon focus-visible:ring-offset-2 focus-visible:ring-offset-onyx sm:w-auto"
      >
        {siteConfig.contact.formTitle}
      </button>
    </form>
  );
}
