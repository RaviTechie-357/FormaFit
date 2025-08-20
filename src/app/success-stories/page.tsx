'use client'

import { useState } from 'react'
import { Star, Quote, ArrowRight, Heart, Award, TrendingUp, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

interface SuccessStory {
  id: string
  name: string
  age: number
  location: string
  trainer: string
  duration: string
  beforeWeight: string
  afterWeight: string
  story: string
  achievements: string[]
  rating: number
  image: string
  category: 'weight-loss' | 'muscle-gain' | 'fitness' | 'wellness'
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    age: 28,
    location: 'New York, NY',
    trainer: 'Mike Johnson',
    duration: '6 months',
    beforeWeight: '180 lbs',
    afterWeight: '145 lbs',
    story: 'I was struggling with my weight for years and had tried countless diets without success. Working with Mike completely changed my perspective on fitness and nutrition. He taught me that sustainable change comes from building healthy habits, not quick fixes.',
    achievements: ['Lost 35 pounds', 'Ran my first 5K', 'Improved energy levels', 'Better sleep quality'],
    rating: 5,
    image: '/api/placeholder/300/400',
    category: 'weight-loss'
  },
  {
    id: '2',
    name: 'David Chen',
    age: 32,
    location: 'Los Angeles, CA',
    trainer: 'Emma Rodriguez',
    duration: '8 months',
    beforeWeight: '155 lbs',
    afterWeight: '175 lbs',
    story: 'I was always the skinny guy who couldn\'t gain muscle no matter what I tried. Emma\'s strength training program and nutrition guidance helped me build 20 pounds of muscle and finally feel confident in my body.',
    achievements: ['Gained 20 pounds of muscle', 'Increased bench press by 50%', 'Improved posture', 'Better confidence'],
    rating: 5,
    image: '/api/placeholder/300/400',
    category: 'muscle-gain'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    age: 45,
    location: 'Miami, FL',
    trainer: 'Sarah Johnson',
    duration: '12 months',
    beforeWeight: '200 lbs',
    afterWeight: '160 lbs',
    story: 'After having two kids, I had completely lost touch with my fitness routine. Sarah helped me rediscover my love for exercise and showed me how to balance motherhood with self-care. I\'m now stronger than I\'ve ever been!',
    achievements: ['Lost 40 pounds', 'Completed a triathlon', 'Improved mental health', 'Set a great example for my kids'],
    rating: 5,
    image: '/api/placeholder/300/400',
    category: 'fitness'
  },
  {
    id: '4',
    name: 'James Wilson',
    age: 38,
    location: 'Chicago, IL',
    trainer: 'David Kim',
    duration: '4 months',
    beforeWeight: '220 lbs',
    afterWeight: '185 lbs',
    story: 'I was dealing with high blood pressure and low energy due to my sedentary lifestyle. David\'s comprehensive approach to fitness and nutrition helped me turn my health around completely.',
    achievements: ['Lost 35 pounds', 'Normalized blood pressure', 'Increased energy', 'Better work performance'],
    rating: 5,
    image: '/api/placeholder/300/400',
    category: 'wellness'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    age: 26,
    location: 'Austin, TX',
    trainer: 'Mike Chen',
    duration: '10 months',
    beforeWeight: '165 lbs',
    afterWeight: '135 lbs',
    story: 'I struggled with emotional eating and yo-yo dieting for years. Mike helped me develop a healthy relationship with food and exercise. Now I maintain my weight naturally and feel amazing.',
    achievements: ['Lost 30 pounds', 'Overcame emotional eating', 'Ran a marathon', 'Improved self-esteem'],
    rating: 5,
    image: '/api/placeholder/300/400',
    category: 'weight-loss'
  },
  {
    id: '6',
    name: 'Robert Davis',
    age: 50,
    location: 'Seattle, WA',
    trainer: 'Emma Rodriguez',
    duration: '6 months',
    beforeWeight: '190 lbs',
    afterWeight: '170 lbs',
    story: 'At 50, I thought it was too late to get in shape. Emma proved me wrong! Her age-appropriate training program helped me lose weight, gain strength, and feel 20 years younger.',
    achievements: ['Lost 20 pounds', 'Improved mobility', 'Reduced joint pain', 'Better sleep'],
    rating: 5,
    image: '/api/placeholder/300/400',
    category: 'fitness'
  }
]

const categories = [
  { id: 'all', name: 'All Stories', count: successStories.length },
  { id: 'weight-loss', name: 'Weight Loss', count: successStories.filter(s => s.category === 'weight-loss').length },
  { id: 'muscle-gain', name: 'Muscle Gain', count: successStories.filter(s => s.category === 'muscle-gain').length },
  { id: 'fitness', name: 'Fitness', count: successStories.filter(s => s.category === 'fitness').length },
  { id: 'wellness', name: 'Wellness', count: successStories.filter(s => s.category === 'wellness').length }
]

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null)

  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory)

  const stats = [
    { number: '500+', label: 'Success Stories', icon: Heart },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '50+', label: 'Expert Trainers', icon: Users },
    { number: '12', label: 'Average Months', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Award className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Real transformations from real people. Discover how our certified trainers have helped 
              thousands achieve their fitness goals and transform their lives.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              {/* Story Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">{story.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white bg-opacity-90 rounded-lg px-3 py-1">
                    <span className="text-sm font-medium text-gray-700">{story.duration}</span>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                  <span className="text-sm text-gray-500">{story.age} years</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span>{story.location}</span>
                  <span className="mx-2">•</span>
                  <span>Trainer: {story.trainer}</span>
                </div>

                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Before</div>
                    <div className="font-semibold text-gray-900">{story.beforeWeight}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  <div className="text-center">
                    <div className="text-sm text-gray-500">After</div>
                    <div className="font-semibold text-green-600">{story.afterWeight}</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {story.story}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {story.achievements.slice(0, 2).map((achievement, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                  {story.achievements.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{story.achievements.length - 2} more
                    </span>
                  )}
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Read Full Story
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have transformed their lives with professional fitness training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trainers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Find Your Trainer
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonial Quote */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium text-gray-900 mb-6">
            "The only bad workout is the one that didn't happen. Every step forward is progress, 
            no matter how small."
          </blockquote>
          <cite className="text-lg text-gray-600">- FormaFit Community</cite>
        </div>
      </div>

      {/* Modal for Full Story */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedStory.name}'s Story</h2>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Before</div>
                    <div className="font-semibold text-gray-900">{selectedStory.beforeWeight}</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                  <div className="text-center">
                    <div className="text-sm text-gray-500">After</div>
                    <div className="font-semibold text-green-600">{selectedStory.afterWeight}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">The Journey</h3>
                  <p className="text-gray-600">{selectedStory.story}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedStory.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Trainer: {selectedStory.trainer} • Duration: {selectedStory.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{selectedStory.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


