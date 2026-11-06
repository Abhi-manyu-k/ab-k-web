import Link from "next/link";
import { contactTopics, siteConfig } from "@/lib/site";
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
          <label htmlFor="name" className="note mb-1 block">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={fieldClass}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="note mb-1 block">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={fieldClass}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="organisation" className="note mb-1 block">
          Organisation
        </label>
        <input
          type="text"
          id="organisation"
          name="organisation"
          autoComplete="organization"
          className={fieldClass}
          placeholder="Conference, university or company (optional)"
        />
      </div>

      <div>
        <label htmlFor="topic" className="note mb-1 block">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          required
          className={cn(fieldClass, "form-select")}
          defaultValue=""
        >
          <option value="" disabled>
            Select a topic
          </option>
          {contactTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="note mb-1 block">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder="What would you like to talk about?"
        />
      </div>

      <p className="text-xs text-muted">
        I use your details only to reply to your message and do not share them. Submissions are stored
        by my host, Netlify — see the{" "}
        <Link href="/datenschutz" className="link text-ink-2">
          privacy notice
        </Link>
        .
      </p>

      <button
        type="submit"
        className="btn btn-ink w-full sm:w-auto"
      >
        {siteConfig.contact.formTitle}
      </button>
    </form>
  );
}
