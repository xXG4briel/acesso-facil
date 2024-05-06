export class Visit {
  id: string
  scheduledDate: string
  createdAt: string
  updatedAt: string
  files: Array<{
    name: string
  }>
  description: string
  companyId: string
  visitorId: string
  approved: boolean
  finished: boolean
  visitor: {
    fullName: string
    url: string
    role: string
    phone: string
  }
  company: {
    name: string
    url: string,
    address: any
  }
}

export class Visits {
  waiting: Visit[];
  approved: Visit[];
  rejected: Visit[];
  finished: Visit[];
}

