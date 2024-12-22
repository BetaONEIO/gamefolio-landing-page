import React from 'react';
import { useForm } from './hooks/useForm';
import { CreatorType } from './types';

export function SubmissionForm() {
  const { formData, handleChange, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-white/10 border border-gray-600 
                   text-gray-100 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-white/10 border border-gray-600 
                   text-gray-100 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          I am a... *
        </label>
        <div className="space-y-2">
          {Object.values(CreatorType).map((type) => (
            <label key={type} className="flex items-center space-x-3">
              <input
                type="radio"
                name="creatorType"
                value={type}
                checked={formData.creatorType === type}
                onChange={handleChange}
                required
                className="text-blue-500 focus:ring-blue-500 bg-white/10 border-gray-600"
              />
              <span className="text-gray-200">{type}</span>
            </label>
          ))}
        </div>
        {errors.creatorType && (
          <p className="mt-1 text-sm text-red-400">{errors.creatorType}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-200">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md bg-white/10 border border-gray-600 
                   text-gray-100 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Tell us about your content..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      <div>
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="mt-1 text-blue-500 focus:ring-blue-500 bg-white/10 border-gray-600"
          />
          <span className="text-sm text-gray-300">
            I accept and agree to the{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              terms and conditions
            </a>{' '}
            *
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-400">{errors.acceptTerms}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 
                 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}