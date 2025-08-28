'use client'

import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

// Lazy load components (optional but improves performance)
const ExpertTrainers = dynamic(() => import('@/app/dashboard/client/ExpertTrainers'))
const CustomPlan = dynamic(() => import('@/app/dashboard/client/Customplan'))
const Schedule = dynamic(() => import('@/app/dashboard/client/FlexibleScheduling'))

export default function FeaturePage() {
  const { feature } = useParams()

  if (!feature) return <div>Loading...</div>

  switch (feature) {
    case 'expert-trainers':
      return <ExpertTrainers />
    case 'custom-plans':
      return <CustomPlan />
    case 'flexible-scheduling':
      return <Schedule />
    default:
      return <div>404 - Feature Not Found</div>
  }
}
