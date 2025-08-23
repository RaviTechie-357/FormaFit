// 'use client'

// import { useState, useEffect } from 'react'
// import { Search, Filter, Star, MapPin, Clock, DollarSign, Users } from 'lucide-react'
// import Link from 'next/link'

// interface Trainer {
//   id: string
//   name: string
//   avatar: string
//   rating: number
//   totalReviews: number
//   hourlyRate: number
//   location: string
//   specializations: string[]
//   experience: number
//   bio: string
//   isAvailable: boolean
// }

// const mockTrainers: Trainer[] = [
//   {
//     id: '1',
//     name: 'Sarah Johnson',
//     avatar: '/api/placeholder/60/60',
//     rating: 4.9,
//     totalReviews: 127,
//     hourlyRate: 75,
//     location: 'New York, NY',
//     specializations: ['Weight Training', 'Cardio', 'Nutrition'],
//     experience: 8,
//     bio: 'Certified personal trainer with 8+ years of experience helping clients achieve their fitness goals.',
//     isAvailable: true
//   },
//   {
//     id: '2',
//     name: 'Mike Chen',
//     avatar: '/api/placeholder/60/60',
//     rating: 4.8,
//     totalReviews: 89,
//     hourlyRate: 65,
//     location: 'Los Angeles, CA',
//     specializations: ['Yoga', 'Pilates', 'Flexibility'],
//     experience: 5,
//     bio: 'Yoga and Pilates specialist focused on flexibility and mindfulness training.',
//     isAvailable: true
//   },
//   {
//     id: '3',
//     name: 'Emma Rodriguez',
//     avatar: '/api/placeholder/60/60',
//     rating: 4.7,
//     totalReviews: 156,
//     hourlyRate: 85,
//     location: 'Miami, FL',
//     specializations: ['HIIT', 'Strength Training', 'Weight Loss'],
//     experience: 10,
//     bio: 'High-intensity training expert helping clients transform their bodies and lives.',
//     isAvailable: false
//   },
//   {
//     id: '4',
//     name: 'David Kim',
//     avatar: '/api/placeholder/60/60',
//     rating: 4.9,
//     totalReviews: 203,
//     hourlyRate: 95,
//     location: 'Chicago, IL',
//     specializations: ['Bodybuilding', 'Powerlifting', 'Sports Performance'],
//     experience: 12,
//     bio: 'Former competitive bodybuilder now helping others build strength and confidence.',
//     isAvailable: true
//   }
// ]

// export default function TrainersPage() {
//   const [trainers, setTrainers] = useState<Trainer[]>(mockTrainers)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedSpecialization, setSelectedSpecialization] = useState('')
//   const [priceRange, setPriceRange] = useState('')
//   const [sortBy, setSortBy] = useState('rating')
//   const [isMounted, setIsMounted] = useState(false)

//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   const specializations = ['Weight Training', 'Cardio', 'Nutrition', 'Yoga', 'Pilates', 'HIIT', 'Strength Training', 'Weight Loss', 'Bodybuilding', 'Powerlifting', 'Sports Performance']

//   const filteredTrainers = trainers.filter(trainer => {
//     const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          trainer.location.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesSpecialization = !selectedSpecialization || trainer.specializations.includes(selectedSpecialization)
//     const matchesPrice = !priceRange ||
//       (priceRange === 'low' && trainer.hourlyRate <= 60) ||
//       (priceRange === 'medium' && trainer.hourlyRate > 60 && trainer.hourlyRate <= 80) ||
//       (priceRange === 'high' && trainer.hourlyRate > 80)

//     return matchesSearch && matchesSpecialization && matchesPrice
//   })

//   const sortedTrainers = [...filteredTrainers].sort((a, b) => {
//     switch (sortBy) {
//       case 'rating':
//         return b.rating - a.rating
//       case 'price-low':
//         return a.hourlyRate - b.hourlyRate
//       case 'price-high':
//         return b.hourlyRate - a.hourlyRate
//       case 'experience':
//         return b.experience - a.experience
//       default:
//         return 0
//     }
//   })

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold mb-4">Find Your Perfect Trainer</h1>
//             <p className="text-xl text-blue-100 mb-8">
//               Connect with certified fitness professionals who can help you achieve your goals
//             </p>

//             {/* Search Bar */}
//             <div className="max-w-2xl mx-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search by name, location, or specialization..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   disabled={!isMounted}
//                   className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     isMounted
//                       ? 'text-gray-900'
//                       : 'text-gray-400 cursor-not-allowed'
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
//               <h3 className="text-lg font-semibold mb-4 flex items-center">
//                 <Filter className="w-5 h-5 mr-2" />
//                 Filters
//               </h3>

//               {/* Specialization Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Specialization
//                 </label>
//                 <select
//                   value={selectedSpecialization}
//                   onChange={(e) => setSelectedSpecialization(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Specializations</option>
//                   {specializations.map(spec => (
//                     <option key={spec} value={spec}>{spec}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price Range Filter */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price Range
//                 </label>
//                 <select
//                   value={priceRange}
//                   onChange={(e) => setPriceRange(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Prices</option>
//                   <option value="low">$60 or less</option>
//                   <option value="medium">$61 - $80</option>
//                   <option value="high">$81+</option>
//                 </select>
//               </div>

//               {/* Sort By */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Sort By
//                 </label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="rating">Highest Rated</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="experience">Most Experienced</option>
//                 </select>
//               </div>

//               {/* Results Count */}
//               <div className="text-sm text-gray-600">
//                 {sortedTrainers.length} trainer{sortedTrainers.length !== 1 ? 's' : ''} found
//               </div>
//             </div>
//           </div>

//           {/* Trainers Grid */}
//           <div className="lg:w-3/4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {sortedTrainers.map((trainer) => (
//                 <div key={trainer.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                   <div className="p-6">
//                     <div className="flex items-start space-x-4">
//                       {/* Avatar */}
//                       <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
//                         <Users className="w-8 h-8 text-gray-400" />
//                       </div>

//                       {/* Trainer Info */}
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-2">
//                           <h3 className="text-lg font-semibold text-gray-900">{trainer.name}</h3>
//                           <span className={`px-2 py-1 text-xs rounded-full ${
//                             trainer.isAvailable
//                               ? 'bg-green-100 text-green-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {trainer.isAvailable ? 'Available' : 'Busy'}
//                           </span>
//                         </div>

//                         {/* Rating */}
//                         <div className="flex items-center mb-2">
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-4 h-4 ${
//                                   i < Math.floor(trainer.rating)
//                                     ? 'text-yellow-400 fill-current'
//                                     : 'text-gray-300'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <span className="ml-2 text-sm text-gray-600">
//                             {trainer.rating} ({trainer.totalReviews} reviews)
//                           </span>
//                         </div>

//                         {/* Location and Experience */}
//                         <div className="flex items-center text-sm text-gray-600 mb-3">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {trainer.location}
//                           <span className="mx-2">•</span>
//                           <Clock className="w-4 h-4 mr-1" />
//                           {trainer.experience} years
//                         </div>

//                         {/* Specializations */}
//                         <div className="mb-3">
//                           <div className="flex flex-wrap gap-1">
//                             {trainer.specializations.slice(0, 3).map((spec) => (
//                               <span
//                                 key={spec}
//                                 className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                               >
//                                 {spec}
//                               </span>
//                             ))}
//                             {trainer.specializations.length > 3 && (
//                               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
//                                 +{trainer.specializations.length - 3} more
//                               </span>
//                             )}
//                           </div>
//                         </div>

//                         {/* Bio */}
//                         <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                           {trainer.bio}
//                         </p>

//                         {/* Price and Action */}
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <DollarSign className="w-4 h-4 text-green-600 mr-1" />
//                             <span className="text-lg font-semibold text-gray-900">
//                               ${trainer.hourlyRate}
//                             </span>
//                             <span className="text-sm text-gray-600 ml-1">/hour</span>
//                           </div>
//                           <Link
//                             href={`/trainers/${trainer.id}`}
//                             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                           >
//                             View Profile
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {sortedTrainers.length === 0 && (
//               <div className="text-center py-12">
//                 <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No trainers found</h3>
//                 <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Trainer {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  totalReviews: number;
  hourlyRate: number;
  location: string;
  specializations: string[];
  experience: number;
  bio: string;
  isAvailable: boolean;
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    async function fetchTrainers() {
      setLoading(true);
      try {
        const res = await fetch("/api/trainers"); // adjust endpoint if needed
        const data = await res.json();

        if (data.success && Array.isArray(data.trainers)) {
          const mapped = data.trainers.map(
            (t: any): Trainer => ({
              id: t.id,
              name: t.name,
              avatar: t.avatar || null,
              rating: t.trainerProfile?.rating ?? 0,
              totalReviews: t.trainerProfile?.totalReviews ?? 0,
              hourlyRate: t.trainerProfile?.hourlyRate ?? 0,
              location: t.trainerProfile?.location ?? "Not specified",
              specializations: t.trainerProfile?.specializations ?? [],
              experience: t.trainerProfile?.experience ?? 0,
              bio: t.trainerProfile?.bio ?? "No bio available",
              isAvailable: true, // adjust if API provides availability
            })
          );

          setTrainers(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainers();
  }, []);

  const specializations = [
    "Weight Training",
    "Cardio",
    "Nutrition",
    "Yoga",
    "Pilates",
    "HIIT",
    "Strength Training",
    "Weight Loss",
    "Bodybuilding",
    "Powerlifting",
    "Sports Performance",
  ];

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      !selectedSpecialization ||
      trainer.specializations.includes(selectedSpecialization);
    const matchesPrice =
      !priceRange ||
      (priceRange === "low" && trainer.hourlyRate <= 60) ||
      (priceRange === "medium" &&
        trainer.hourlyRate > 60 &&
        trainer.hourlyRate <= 80) ||
      (priceRange === "high" && trainer.hourlyRate > 80);

    return matchesSearch && matchesSpecialization && matchesPrice;
  });

  const sortedTrainers = [...filteredTrainers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.hourlyRate - b.hourlyRate;
      case "price-high":
        return b.hourlyRate - a.hourlyRate;
      case "experience":
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Perfect Trainer
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with certified fitness professionals who can help you
              achieve your goals
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={!isMounted}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isMounted
                      ? "text-gray-900"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Specialization Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Prices</option>
                  <option value="low">$60 or less</option>
                  <option value="medium">$61 - $80</option>
                  <option value="high">$81+</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                {sortedTrainers.length} trainer
                {sortedTrainers.length !== 1 ? "s" : ""} found
              </div>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Loading trainers...
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedTrainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          {trainer.avatar ? (
                            <img
                              src={trainer.avatar}
                              alt={trainer.name}
                              className="w-16 h-16 object-cover rounded-full"
                            />
                          ) : (
                            <Users className="w-8 h-8 text-gray-400" />
                          )}
                        </div>

                        {/* Trainer Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {trainer.name}
                            </h3>
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

                          {/* Rating */}
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
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

                          {/* Location and Experience */}
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {trainer.location}
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            {trainer.experience} years
                          </div>

                          {/* Specializations */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {trainer.specializations
                                .slice(0, 3)
                                .map((spec) => (
                                  <span
                                    key={spec}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              {trainer.specializations.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{trainer.specializations.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {trainer.bio}
                          </p>

                          {/* Price and Action */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-lg font-semibold text-gray-900">
                                ${trainer.hourlyRate}
                              </span>
                              <span className="text-sm text-gray-600 ml-1">
                                /hour
                              </span>
                            </div>
                            <Link
                              href={`/trainers/${trainer.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && sortedTrainers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No trainers found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
