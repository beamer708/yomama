"use client";

import { useState, FormEvent } from "react";
import Icon from "@/components/Icon";

interface FormErrors {
  discordUsername?: string;
  discordId?: string;
  pastExperience?: string;
  submit?: string;
}

export default function StaffApplicationPage() {
  const [discordUsername, setDiscordUsername] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [pastExperience, setPastExperience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!discordUsername.trim()) {
      newErrors.discordUsername = "Discord Username is required";
    } else if (discordUsername.trim().length > 100) {
      newErrors.discordUsername = "Discord Username is too long";
    }

    if (!discordId.trim()) {
      newErrors.discordId = "Discord ID is required";
    } else if (!/^\d{17,19}$/.test(discordId.trim())) {
      newErrors.discordId = "Discord ID must be a valid 17-19 digit number";
    }

    if (!pastExperience.trim()) {
      newErrors.pastExperience = "Past Experience is required";
    } else if (pastExperience.trim().length < 10) {
      newErrors.pastExperience = "Past Experience must be at least 10 characters";
    } else if (pastExperience.trim().length > 2000) {
      newErrors.pastExperience = "Past Experience is too long (maximum 2000 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/staff-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          discordUsername: discordUsername.trim(),
          discordId: discordId.trim(),
          pastExperience: pastExperience.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrors({
            submit: "Too many requests. Please wait a moment before submitting again.",
          });
        } else if (data.errors && Array.isArray(data.errors)) {
          // Multiple validation errors
          const errorMessages = data.errors.join(". ");
          setErrors({ submit: errorMessages });
        } else {
          setErrors({ submit: data.error || "Failed to submit application. Please try again." });
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSuccess(true);
      setDiscordUsername("");
      setDiscordId("");
      setPastExperience("");
      setIsSubmitting(false);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrors({
        submit: "An unexpected error occurred. Please try again later.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Staff Application
          </h1>
          <p className="text-lg text-foreground/70">
            Apply to help Unity Vault find and organize resources for the ERLC community.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
            <div className="flex items-start gap-3">
              <Icon name="check" className="text-green-500 text-xl mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                  Application Submitted
                </p>
                <p className="text-sm text-foreground/70">
                  Thank you for applying. Your application has been submitted for review.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-8 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
            <div className="flex items-start gap-3">
              <Icon name="cross" className="text-red-500 text-xl mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                  Submission Error
                </p>
                <p className="text-sm text-foreground/70">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Discord Username */}
          <div>
            <label
              htmlFor="discord-username"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Discord Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="discord-username"
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              className={`w-full rounded-lg border ${
                errors.discordUsername
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-border focus:border-primary focus:ring-primary"
              } bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1`}
              placeholder="Your Discord username (e.g., username#1234)"
              disabled={isSubmitting}
              maxLength={100}
            />
            {errors.discordUsername && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.discordUsername}
              </p>
            )}
          </div>

          {/* Discord ID */}
          <div>
            <label
              htmlFor="discord-id"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Discord ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="discord-id"
              inputMode="numeric"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value.replace(/\D/g, ""))}
              className={`w-full rounded-lg border ${
                errors.discordId
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-border focus:border-primary focus:ring-primary"
              } bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1`}
              placeholder="Your Discord ID (17-19 digit number)"
              disabled={isSubmitting}
              maxLength={19}
            />
            {errors.discordId && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.discordId}
              </p>
            )}
            <p className="mt-1.5 text-xs text-foreground/60">
              You can find your Discord ID by enabling Developer Mode in Discord settings, then
              right-clicking your profile and selecting "Copy User ID".
            </p>
          </div>

          {/* Past Experience */}
          <div>
            <label
              htmlFor="past-experience"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Past Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              id="past-experience"
              value={pastExperience}
              onChange={(e) => setPastExperience(e.target.value)}
              rows={6}
              className={`w-full rounded-lg border ${
                errors.pastExperience
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-border focus:border-primary focus:ring-primary"
              } bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1 resize-y`}
              placeholder="Tell us about your experience with ERLC communities, resource curation, or similar work..."
              disabled={isSubmitting}
              maxLength={2000}
            />
            <div className="mt-1.5 flex items-center justify-between">
              {errors.pastExperience ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.pastExperience}
                </p>
              ) : (
                <div />
              )}
              <p className="text-xs text-foreground/60">
                {pastExperience.length} / 2000 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Icon name="check" className="text-base" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-foreground/70">
            <strong className="font-semibold text-foreground">Note:</strong> All applications are
            reviewed by the Unity Vault team. You will be contacted through Discord if your
            application is accepted.
          </p>
        </div>
      </div>
    </div>
  );
}
