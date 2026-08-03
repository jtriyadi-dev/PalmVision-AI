export type EmploymentStatus = 'PERMANENT_SKU' | 'CONTRACT_BHL' | 'PROBATION' | 'DAILY_WORKER' | 'SEASONAL';
export type WorkLocationType = 'ESTATE' | 'MILL_PKS' | 'HEAD_OFFICE' | 'WORKSHOP' | 'NURSERY';
export type Gender = 'L' | 'P';
export type MaritalStatus = 'SINGLE' | 'MARRIED_K0' | 'MARRIED_K1' | 'MARRIED_K2' | 'MARRIED_K3' | 'DIVORCED';

export interface Employee {
  id: string;
  employeeId: string; // e.g. EMP-2026-0042
  nik: string; // KTP NIK 16 digits
  npwp: string;
  bpjsKesehatan: string;
  bpjsKetenagakerjaan: string;
  name: string;
  photoUrl?: string;
  gender: Gender;
  birthPlace: string;
  birthDate: string;
  religion: string;
  maritalStatus: MaritalStatus;
  address: string;
  phone: string;
  email: string;
  education: string;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  companyName: string;
  estateName: string;
  divisionName: string;
  departmentName: string;
  positionTitle: string;
  supervisorName: string;
  employmentStatus: EmploymentStatus;
  joinDate: string;
  contractEndDate?: string;
  basicSalary: number;
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  activeStatus: 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'TERMINATED';
}

export interface OrganizationDepartment {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string;
  totalEmployees: number;
  subDepartments?: string[];
}

export interface JobVacancy {
  id: string;
  title: string;
  department: string;
  estate: string;
  positionsCount: number;
  status: 'OPEN' | 'INTERVIEWING' | 'CLOSED';
  postedDate: string;
  applicantsCount: number;
}

export interface Applicant {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  lastEducation: string;
  stage: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'MEDICAL' | 'OFFERING' | 'ACCEPTED' | 'REJECTED';
  appliedDate: string;
  scorePercent: number;
}

export interface OnboardingChecklist {
  id: string;
  employeeName: string;
  position: string;
  startDate: string;
  documentsVerified: boolean;
  trainingCompleted: boolean;
  uniformIssued: boolean;
  idCardIssued: boolean;
  emailCreated: boolean;
  bpjsEnrolled: boolean;
  overallPercent: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  shiftName: string; // Pagi, Siang, Malam, Panen Normal
  clockIn: string;
  clockOut: string;
  status: 'PRESENT' | 'LATE' | 'ALPHA' | 'PERMIT' | 'SICK' | 'LEAVE';
  method: 'GPS_SELFIE' | 'FACE_RECOGNITION' | 'FINGERPRINT' | 'MANUAL';
  gpsLocation?: { lat: number; lng: number; locationName: string };
  photoVerificationUrl?: string;
}

export interface AttendanceCorrection {
  id: string;
  employeeName: string;
  date: string;
  originalClockIn: string;
  proposedClockIn: string;
  originalClockOut: string;
  proposedClockOut: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approverName: string;
}

export interface ShiftRoster {
  id: string;
  estate: string;
  division: string;
  shiftName: 'PAGI_HARVEST' | 'SIANG_PKS' | 'MALAM_SECURITY' | 'NON_SHIFT';
  startTime: string;
  endTime: string;
  assignedCount: number;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: 'CUTI_TAHUNAN' | 'CUTI_BESAR' | 'CUTI_MELAHIRKAN' | 'CUTI_SAKIT' | 'CUTI_KHUSUS';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'PENDING_SUPERVISOR' | 'APPROVED' | 'REJECTED';
  attachmentUrl?: string;
}

export interface OvertimeRequest {
  id: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  activityDescription: string;
  calculatedCostIdr: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface PayrollPeriod {
  id: string;
  periodName: string; // e.g. "Bulan Juli 2026"
  startDate: string;
  endDate: string;
  totalEmployeesProcessed: number;
  totalGrossPayrollIdr: number;
  totalBpjsPaidIdr: number;
  totalPph21Idr: number;
  totalNettPayrollIdr: number;
  status: 'DRAFT' | 'CALCULATED' | 'REVIEWED' | 'APPROVED' | 'POSTED_FINANCE';
}

export interface PayslipItem {
  id: string;
  employeeId: string;
  employeeName: string;
  positionTitle: string;
  nik: string;
  department: string;
  basicSalary: number;
  harvestIncentivePremi: number;
  overtimePay: number;
  allowances: number;
  grossSalary: number;
  bpjsKesEmployeeDeduction: number;
  bpjsTkEmployeeDeduction: number;
  pph21TERDeduction: number;
  loanDeduction: number;
  totalDeductions: number;
  nettSalary: number;
  paymentStatus: 'PAID' | 'PENDING';
}

export interface BpjsConfigSummary {
  bpjsKesCompanyPercent: number; // 4%
  bpjsKesEmployeePercent: number; // 1%
  bpjsTkJhtCompanyPercent: number; // 3.7%
  bpjsTkJhtEmployeePercent: number; // 2%
  bpjsTkJkmCompanyPercent: number; // 0.3%
  bpjsTkJkkCompanyPercent: number; // 0.24% - 1.74%
  bpjsTkJpCompanyPercent: number; // 2%
  bpjsTkJpEmployeePercent: number; // 1%
}

export interface EmployeeLoan {
  id: string;
  employeeName: string;
  loanType: 'PINJAMAN_KAS_DAPUR' | 'PINJAMAN_MOTOR' | 'KASBON_DARURAT';
  totalLoanAmountIdr: number;
  remainingAmountIdr: number;
  monthlyInstallmentIdr: number;
  status: 'ACTIVE' | 'PAID_OFF';
}

export interface TrainingProgram {
  id: string;
  title: string;
  category: 'ISPO_RSPO_COMPLIANCE' | 'PEMUPUKAN_EFEKTIF' | 'SAFETY_K3_PKS' | 'ALAT_BERAT_OPERATOR';
  trainer: string;
  scheduleDate: string;
  totalParticipants: number;
  completedParticipants: number;
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED';
}

export interface EmployeeCertification {
  id: string;
  employeeName: string;
  certificateName: string; // SIO Excavator, Ahli K3 Umum, RSPO Auditor
  issuingBody: string;
  issuedDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
}

export interface PerformanceKpi {
  id: string;
  employeeName: string;
  department: string;
  kpiCategory: 'HARVEST_TONNAGE' | 'MILL_OER_TARGET' | 'MAINTENANCE_SLA' | 'FIELD_QUALITY';
  targetScore: number;
  actualScore: number;
  achievementPercent: number;
  period: string;
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  companyOrigin: string;
  hostEmployeeName: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  qrBadgeCode: string;
}

export interface EmploymentContract {
  id: string;
  employeeName: string;
  contractType: 'PKWT_1_YEAR' | 'PKWT_6_MONTHS' | 'SKU_PERMANENT';
  startDate: string;
  endDate: string;
  daysToExpiry: number;
  status: 'ACTIVE' | 'WARNING_30_DAYS' | 'WARNING_7_DAYS' | 'EXPIRED';
}

export interface MedicalCheckupRecord {
  id: string;
  employeeName: string;
  position: string;
  mcuDate: string;
  healthResult: 'FIT_TO_WORK' | 'FIT_WITH_RESTRICTIONS' | 'UNFIT_TEMPORARY';
  nextMcuDueDate: string;
}

export interface UniformDistribution {
  id: string;
  employeeName: string;
  itemType: 'SERAGAM_PANEN_SLA' | 'BOOTS_K3' | 'HELM_SAFETY_PKS' | 'APRON_CHEM';
  size: string;
  quantity: number;
  distributedDate: string;
}

export interface AiWorkforceInsight {
  id: string;
  metricType: 'TURNOVER_RISK' | 'ATTENDANCE_PREDICTION' | 'HARVESTER_PRODUCTIVITY' | 'SHIFT_OPTIMIZATION';
  predictionSummary: string;
  confidenceScorePercent: number;
  actionableRecommendation: string;
  impactLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}
