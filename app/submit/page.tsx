"use client";

import { useState } from "react";
import { resourceCategories } from "@/lib/resources";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "",
    creator: "",
    creatorUrl: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to a backend API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500 mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Thank You for Your Submission
            </h2>
            <p className="text-foreground/70 mb-6">
              Your resource submission has been received. Our team will review it and add it to the 
              Resources Vault if it meets our curation standards.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: "",
                  url: "",
                  category: "",
                  creator: "",
                  creatorUrl: "",
                  description: "",
                });
              }}
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Submit Another Resource
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Submit a Resource
          </h1>
          <p className="text-lg text-foreground/70 mb-6">
            Help grow the Unity Lab resource vault by submitting valuable ERLC resources. All submissions 
            are reviewed to ensure quality and proper organization.
          </p>
          <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
            <p className="text-sm text-foreground/80">
              <strong className="font-semibold">Moderation Notice:</strong> All submissions are reviewed 
              before being added to the Resources Vault. We ensure resources are relevant, properly credited, 
              and align with Unity Lab's mission.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Resource Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter resource title"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
              Resource URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              required
              value={formData.url}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="https://example.com/resource"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a category</option>
              {resourceCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="creator" className="block text-sm font-medium text-foreground mb-2">
              Creator Name *
            </label>
            <input
              type="text"
              id="creator"
              name="creator"
              required
              value={formData.creator}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Name of the original creator"
            />
          </div>

          <div>
            <label htmlFor="creatorUrl" className="block text-sm font-medium text-foreground mb-2">
              Creator URL (Optional)
            </label>
            <input
              type="url"
              id="creatorUrl"
              name="creatorUrl"
              value={formData.creatorUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="https://example.com/creator"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Brief description of the resource"
            />
          </div>

          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-sm text-foreground/70">
              By submitting this resource, you confirm that you have permission to share it and that 
              proper credit will be given to the original creator.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Submit Resource
          </button>
        </form>
      </div>
    </div>
  );
}
