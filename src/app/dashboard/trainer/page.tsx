'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import DashboardLayout from '../../../components/DashboardLayout'
import { 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  Target
} from 'lucide-react'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  avatar: string
  lastSession: string
  nextSession: string
  progress: number
  status: 'active' | 'inactive'
}

interface Session {
  id: string
  clientName: string
  date: string
  time: string
  type: string
  status: 'confirmed' | 'pending' | 'completed'
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: '/api/placeholder/40/40',
    lastSession: '2024-01-10',
    nextSession: '2024-01-15',
    progress: 85,
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    avatar: '/api/placeholder/40/40',
    lastSession: '2024-01-08',
    nextSession: '2024-01-16',
    progress: 72,
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: '/api/placeholder/40/40',
    lastSession: '2024-01-05',
    nextSession: '2024-01-18',
    progress: 45,
    status: 'inactive'
  }
]

const mockSessions: Session[] = [
  {
    id: '1',
    clientName: 'John Smith',
    date: '2024-01-15',
    time: '10:00 AM',
    type: 'Personal Training',
    status: 'confirmed'
  },
  {
    id: '2',
    clientName: 'Sarah Wilson',
    date: '2024-01-15',
    time: '2:00 PM',
    type: 'Yoga Session',
    status: 'pending'
  },
  {
    id: '3',
    clientName: 'Mike Johnson',
    date: '2024-01-16',
    time: '9:00 AM',
    type: 'HIIT Training',
    status: 'confirmed'
  }
]

export default function TrainerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [sessions, setSessions] = useState<Session[]>(mockSessions)

  const stats = [
    {
      title: 'Active Clients',
      value: clients.filter(c => c.status === 'active').length.toString(),
      change: '+2 this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Sessions This Week',
      value: '8',
      change: '+3 from last week',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2 this month',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'Monthly Earnings',
      value: '$2,450',
      change: '+15% from last month',
      icon: CreditCard,
      color: 'purple'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name || 'Trainer'}! 💪
          </h1>
          <p className="text-green-100">
            You have {sessions.filter(s => s.status === 'confirmed').length} confirmed sessions today. Keep inspiring your clients!
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
          {/* Active Clients */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Active Clients</h2>
                <Link
                  href="/trainer/clients"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {clients.filter(c => c.status === 'active').map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600">Next: {client.nextSession}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${client.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{client.progress}% progress</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/trainer/clients"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Manage Clients
                </Link>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                <Link
                  href="/trainer/schedule"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(session.status)}`}>
                        {getStatusIcon(session.status)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.clientName}</p>
                        <p className="text-sm text-gray-600">{session.type}</p>
                        <p className="text-xs text-gray-500">{session.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/trainer/schedule"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/trainer/schedule"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Schedule</h3>
              <p className="text-sm text-gray-600">Update availability</p>
            </Link>
            <Link
              href="/trainer/clients"
              className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Client Management</h3>
              <p className="text-sm text-gray-600">View client progress</p>
            </Link>
            <Link
              href="/trainer/earnings"
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <CreditCard className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Earnings</h3>
              <p className="text-sm text-gray-600">Track your income</p>
            </Link>
            <Link
              href="/messages"
              className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <Target className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600">Chat with clients</p>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 