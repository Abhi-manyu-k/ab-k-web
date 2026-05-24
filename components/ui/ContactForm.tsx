import { projectStages, siteConfig } from "@/lib/site";

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
            className="w-full rounded-lg border border-slate-border bg-slate-deep px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon"
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
            className="w-full rounded-lg border border-slate-border bg-slate-deep px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon"
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
            className="w-full rounded-lg border border-slate-border bg-slate-deep px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon"
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
            className="w-full rounded-lg border border-slate-border bg-slate-deep px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon"
            placeholder="Your role"
          />
        </div>
      </div>

      <div>
        <label htmlFor="project-stage" className="mb-2 block text-sm font-medium text-text-primary">
          Project Stage
        </label>
        <select
          id="project-stage"
          name="project-stage"
          className="w-full rounded-lg border border-slate-border bg-slate-deep px-4 py-3 text-text-primary focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon"
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
          className="w-full resize-y rounded-lg border border-slate-border bg-slate-deep px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cyan-neon focus:outline-none focus:ring-1 focus:ring-cyan-neon"
          placeholder="Tell us about your AI initiative, constraints, and goals."
        />
      </div>

      <p className="text-xs text-text-muted">
        By submitting, you agree to be contacted about your inquiry. We do not share your
        information with third parties.
      </p>

      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-electric to-cyan-neon px-8 py-4 font-semibold text-onyx transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-neon focus-visible:ring-offset-2 focus-visible:ring-offset-onyx sm:w-auto"
      >
        {siteConfig.contact.formTitle}
      </button>
    </form>
  );
}
