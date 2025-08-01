'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import DashboardLayout from '../../../components/DashboardLayout'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart3,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface SystemMetric {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: any
  color: string
}

interface RecentActivity {
  id: string
  type: 'user_registration' | 'booking' | 'payment' | 'system'
  message: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

const mockMetrics: SystemMetric[] = [
  {
    title: 'Total Users',
    value: '1,247',
    change: '+12% this month',
    trend: 'up',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Active Trainers',
    value: '89',
    change: '+5 this week',
    trend: 'up',
    icon: Users,
    color: 'green'
  },
  {
    title: 'Monthly Revenue',
    value: '$45,230',
    change: '+18% from last month',
    trend: 'up',
    icon: DollarSign,
    color: 'purple'
  },
  {
    title: 'System Health',
    value: '99.9%',
    change: 'All systems operational',
    trend: 'neutral',
    icon: Activity,
    color: 'green'
  }
]

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'user_registration',
    message: 'New trainer Sarah Johnson registered',
    timestamp: '2 minutes ago',
    status: 'success'
  },
  {
    id: '2',
    type: 'booking',
    message: 'High-value booking: $150 session completed',
    timestamp: '15 minutes ago',
    status: 'success'
  },
  {
    id: '3',
    type: 'payment',
    message: 'Payment processing issue detected',
    timestamp: '1 hour ago',
    status: 'warning'
  },
  {
    id: '4',
    type: 'system',
    message: 'Database backup completed successfully',
    timestamp: '2 hours ago',
    status: 'success'
  }
]

export default function AdminDashboard() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [metrics, setMetrics] = useState<SystemMetric[]>(mockMetrics)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(mockRecentActivity)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <Users className="w-4 h-4" />
      case 'booking':
        return <Activity className="w-4 h-4" />
      case 'payment':
        return <DollarSign className="w-4 h-4" />
      case 'system':
        return <Settings className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name || 'Admin'}! 🛡️
          </h1>
          <p className="text-purple-100">
            System overview: All services are running smoothly. {recentActivity.filter(a => a.status === 'success').length} successful operations in the last hour.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/users"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Manage Users</h3>
                <p className="text-sm text-gray-600">View and manage all users</p>
              </Link>
              <Link
                href="/admin/analytics"
                className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <BarChart3 className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-medium text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">View detailed reports</p>
              </Link>
              <Link
                href="/admin/settings"
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <Settings className="w-8 h-8 text-purple-600 mb-2" />
                <h3 className="font-medium text-gray-900">System Settings</h3>
                <p className="text-sm text-gray-600">Configure platform</p>
              </Link>
              <Link
                href="/admin/reports"
                className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <Activity className="w-8 h-8 text-orange-600 mb-2" />
                <h3 className="font-medium text-gray-900">Reports</h3>
                <p className="text-sm text-gray-600">Generate reports</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Link
                  href="/admin/activity"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {getActivityTypeIcon(activity.type)}
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Database</h3>
              <p className="text-sm text-green-600">Operational</p>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">API Services</h3>
              <p className="text-sm text-green-600">Operational</p>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Payment Gateway</h3>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 