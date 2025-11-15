export class Visit {
  id: string
  scheduledDate: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  files: Array<{
    name: string
  }>
  documentVisit: Array<{
    id: string
    document: {
      id: string
      name: string,
      url: string
    }
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

