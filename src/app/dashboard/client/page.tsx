'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import DashboardLayout from '../../../components/DashboardLayout'
import { 
  Calendar, 
  Users, 
  Target, 
  CreditCard, 
  TrendingUp, 
  Clock,
  Star,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface Booking {
  id: string
  trainerName: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
  type: string
}

interface Goal {
  id: string
  title: string
  target: string
  current: string
  progress: number
  deadline: string
}

const mockBookings: Booking[] = [
  {
    id: '1',
    trainerName: 'Sarah Johnson',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'upcoming',
    type: 'Personal Training'
  },
  {
    id: '2',
    trainerName: 'Mike Chen',
    date: '2024-01-12',
    time: '2:00 PM',
    status: 'completed',
    type: 'Yoga Session'
  },
  {
    id: '3',
    trainerName: 'Emma Rodriguez',
    date: '2024-01-18',
    time: '9:00 AM',
    status: 'upcoming',
    type: 'HIIT Training'
  }
]

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Weight Loss',
    target: '180 lbs',
    current: '195 lbs',
    progress: 75,
    deadline: '2024-03-15'
  },
  {
    id: '2',
    title: 'Running Distance',
    target: '10K',
    current: '5K',
    progress: 50,
    deadline: '2024-02-28'
  },
  {
    id: '3',
    title: 'Strength Training',
    target: 'Bench Press 200 lbs',
    current: 'Bench Press 150 lbs',
    progress: 60,
    deadline: '2024-04-01'
  }
]

export default function ClientDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [recentBookings, setRecentBookings] = useState<Booking[]>(mockBookings)
  const [goals, setGoals] = useState<Goal[]>(mockGoals)

  const stats = [
    {
      title: 'Active Trainers',
      value: '3',
      change: '+1 this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Sessions This Month',
      value: '12',
      change: '+3 from last month',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Goals Progress',
      value: '75%',
      change: '+5% this week',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Total Spent',
      value: '$450',
      change: 'This month',
      icon: CreditCard,
      color: 'orange'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name || 'Client'}! 👋
          </h1>
          <p className="text-blue-100">
            Ready to crush your fitness goals today? You have {recentBookings.filter(b => b.status === 'upcoming').length} upcoming sessions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <Link
                  href="/client/bookings"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.trainerName}</p>
                        <p className="text-sm text-gray-600">{booking.type}</p>
                        <p className="text-xs text-gray-500">{booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/trainers"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Session
                </Link>
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Fitness Goals</h2>
                <Link
                  href="/client/goals"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{goal.title}</h3>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{goal.current}</span>
                      <span>{goal.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Deadline: {goal.deadline}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/client/goals"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Goal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/trainers"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Find Trainers</h3>
              <p className="text-sm text-gray-600">Discover new fitness professionals</p>
            </Link>
            <Link
              href="/client/bookings"
              className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <Calendar className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Bookings</h3>
              <p className="text-sm text-gray-600">View and reschedule sessions</p>
            </Link>
            <Link
              href="/client/payments"
              className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <CreditCard className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-medium text-gray-900">Payments</h3>
              <p className="text-sm text-gray-600">Manage your payment methods</p>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 