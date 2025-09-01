"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { register } from "../../../redux/slices/authSlice";
import { Dumbbell, Eye, EyeOff, ArrowLeft, User, Users } from "lucide-react";
import Link from "next/link";
import { UserRole } from "../../../types/prisma";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.CLIENT,
    phone: "",
    experience: "",
    specializations: "",
    hourlyRate: "",
    documentation: null as File | null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const disposableDomains = [
    "tempmail.com",
    "10minutemail.com",
    "mailinator.com",
    "guerrillamail.com",
    "yopmail.com",
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) errors.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.name.trim()))
      errors.name = "Name must contain only letters and spaces";
    else if (formData.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters";

    // Email validation
    if (!formData.email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Email is invalid";
    else {
      const domain = formData.email.split("@")[1]?.toLowerCase();
      if (disposableDomains.some((d) => domain.includes(d))) {
        errors.email = "Disposable/temporary emails are not allowed";
      }
    }

    // Phone validation (optional)
    if (formData.phone.trim() && !/^\d{7,15}$/.test(formData.phone.trim())) {
      errors.phone = "Phone must be 7–15 digits only";
    }

    // Password validation
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)
    ) {
      errors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }

    // Confirm password
    if (!formData.confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    // Trainer-specific fields
    if (formData.role === UserRole.TRAINER) {
      if (!formData.experience.trim())
        errors.experience = "Experience is required for trainers";
      else if (!/^\d+$/.test(formData.experience.trim()))
        errors.experience = "Experience must be a valid number";

      // Specializations validation (comma-separated text only)
      if (!formData.specializations.trim()) {
        errors.specializations = "Specialization is required for trainers";
      } else {
        const specializationsArray = formData.specializations
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        if (specializationsArray.length === 0) {
          errors.specializations = "Enter at least one specialization";
        } else {
          const invalid = specializationsArray.some(
            (s) => !/^[A-Za-z\s]+$/.test(s) // only letters and spaces
          );
          if (invalid) {
            errors.specializations =
              "Specializations must contain only letters and spaces, separated by commas";
          }
        }
      }

      if (!formData.hourlyRate.trim())
        errors.hourlyRate = "Hourly rate is required for trainers";
      else if (isNaN(Number(formData.hourlyRate)))
        errors.hourlyRate = "Hourly rate must be a number";
      else if (Number(formData.hourlyRate) < 0)
        errors.hourlyRate = "Hourly rate cannot be negative";

      if (!formData.documentation)
        errors.documentation =
          "Please upload your certification or documentation";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          // For file input, value is already a File object
          payload.append(key, value as any);
        }
      });
      console.log("payload ", payload);
      const result = await dispatch(register(payload)); // Redux thunk must accept FormData
      if (register.fulfilled.match(result)) {
        router.push(
          formData.role === UserRole.TRAINER
            ? "/dashboard/trainer"
            : "/dashboard/client"
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, documentation: file }));
    if (formErrors.documentation)
      setFormErrors((prev) => ({ ...prev, documentation: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <div className="flex justify-center">
            <Dumbbell className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join FormaFit and start your fitness journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name, Email, Phone */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border ${
                  formErrors.name ? "border-red-300" : "border-gray-300"
                } rounded-lg`}
              />
              {formErrors.name && (
                <p className="text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border ${
                  formErrors.email ? "border-red-300" : "border-gray-300"
                } rounded-lg`}
              />
              {formErrors.email && (
                <p className="text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg"
              />
              {formErrors.phone && (
                <p className="text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: UserRole.CLIENT }))
                  }
                  className={`p-4 border-2 rounded-lg ${
                    formData.role === UserRole.CLIENT
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300"
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  Client
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: UserRole.TRAINER }))
                  }
                  className={`p-4 border-2 rounded-lg ${
                    formData.role === UserRole.TRAINER
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300"
                  }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  Trainer
                </button>
              </div>
            </div>

            {/* Trainer-specific fields */}
            {formData.role === UserRole.TRAINER && (
              <div className="space-y-4 border-t pt-4">
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border ${
                      formErrors.experience
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  {formErrors.experience && (
                    <p className="text-sm text-red-600">
                      {formErrors.experience}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="specializations"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Specialization
                  </label>
                  <input
                    id="specializations"
                    name="specializations"
                    type="text"
                    value={formData.specializations}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border ${
                      formErrors.specializations
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  {formErrors.specializations && (
                    <p className="text-sm text-red-600">
                      {formErrors.specializations}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="hourlyRate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hourly Rate (in USD)
                  </label>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="text"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border ${
                      formErrors.hourlyRate
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  {formErrors.hourlyRate && (
                    <p className="text-sm text-red-600">
                      {formErrors.hourlyRate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="documentation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Certification / Documentation
                  </label>
                  <input
                    id="documentation"
                    name="documentation"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
                  />
                  {formErrors.documentation && (
                    <p className="text-sm text-red-600">
                      {formErrors.documentation}
                    </p>
                  )}
                  {formData.documentation && (
                    <p className="text-sm text-green-600 mt-1">
                      Selected: {formData.documentation.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border ${
                    formErrors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border ${
                    formErrors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-4 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
