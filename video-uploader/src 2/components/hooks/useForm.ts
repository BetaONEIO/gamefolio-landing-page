import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, FormErrors, CreatorType } from '../types';

const initialFormData: FormData = {
  name: '',
  email: '',
  creatorType: CreatorType.Streamer,
  message: '',
  acceptTerms: false,
};

export function useForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : null;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        // Reset form after successful submission
        setFormData(initialFormData);
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}