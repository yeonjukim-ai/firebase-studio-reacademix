export type Student = {
  id: string;
  name: string;
  class: string;
  status: 'active' | 'inactive' | 'on_leave';
  registrationDate: string;
  lastReportDate: string | null;
  avgScore: number;
  attendance: number; // percentage
  branch: string;
};

export type Report = {
  id: string;
  name: string;
  target: string;
  status: 'completed' | 'failed' | 'in_progress';
  creator: string;
  createdAt: string;
  downloadUrl?: string;
};

export type Transmission = {
  id: string;
  reportName: string;
  channel: 'Email' | 'SMS';
  status: 'sent' | 'failed';
  recipient: string;
  sentAt: string;
};

export type Kpi = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
};

export type PerformanceData = {
  month: string;
  '지점 A': number;
  '지점 B': number;
};
