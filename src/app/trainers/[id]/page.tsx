import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, MapPin, Clock, DollarSign, Star } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  hourlyRate: number;
  location: string;
  specializations: string[];
  experience: number;
  bio: string;
  isAvailable: boolean;
}

// Reuse the same mock data as the listing page so links resolve correctly
const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/api/placeholder/120/120",
    rating: 4.9,
    totalReviews: 127,
    hourlyRate: 75,
    location: "New York, NY",
    specializations: ["Weight Training", "Cardio", "Nutrition"],
    experience: 8,
    bio: "Certified personal trainer with 8+ years of experience helping clients achieve their fitness goals.",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/api/placeholder/120/120",
    rating: 4.8,
    totalReviews: 89,
    hourlyRate: 65,
    location: "Los Angeles, CA",
    specializations: ["Yoga", "Pilates", "Flexibility"],
    experience: 5,
    bio: "Yoga and Pilates specialist focused on flexibility and mindfulness training.",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "/api/placeholder/120/120",
    rating: 4.7,
    totalReviews: 156,
    hourlyRate: 85,
    location: "Miami, FL",
    specializations: ["HIIT", "Strength Training", "Weight Loss"],
    experience: 10,
    bio: "High-intensity training expert helping clients transform their bodies and lives.",
    isAvailable: false,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/api/placeholder/120/120",
    rating: 4.9,
    totalReviews: 203,
    hourlyRate: 95,
    location: "Chicago, IL",
    specializations: ["Bodybuilding", "Powerlifting", "Sports Performance"],
    experience: 12,
    bio: "Former competitive bodybuilder now helping others build strength and confidence.",
    isAvailable: true,
  },
];

export default function TrainerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const trainer = mockTrainers.find((t) => t.id === params.id);

  if (!trainer) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/trainers" className="text-blue-600 hover:text-blue-800">
            ← Back to Trainers
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {trainer.name}
                  </h1>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trainer.location}
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    {trainer.experience} years experience
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    trainer.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {trainer.isAvailable ? "Available" : "Busy"}
                </span>
              </div>

              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(trainer.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {trainer.rating} ({trainer.totalReviews} reviews)
                </span>
              </div>

              <p className="mt-4 text-gray-700">{trainer.bio}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                  <span className="text-xl font-semibold text-gray-900">
                    ${trainer.hourlyRate}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">/hour</span>
                </div>
                <Link
                  href="/booking"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Book Session
                </Link>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Specializations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trainer.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
