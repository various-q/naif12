export interface User {
  id: string;
  email: string;
  role: 'client' | 'employee' | 'admin';
  name: string;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address?: string;
  date_of_birth?: string;
  license_number?: string;
  emergency_contact?: string;
  avatar_url?: string;
  language_preference: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  language: string;
  active: boolean;
  created_at: string;
  responses_count: number;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'rating' | 'text' | 'multiple_choice' | 'yes_no';
  options?: string[];
  required: boolean;
  order: number;
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  user_id?: string;
  anonymous: boolean;
  responses: Record<string, any>;
  submitted_at: string;
  language: string;
}

export interface Lesson {
  id: string;
  client_id: string;
  instructor_id: string;
  date: string;
  time: string;
  duration: number;
  type: 'theory' | 'practical';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  rating?: number;
}

export interface Employee {
  id: string;
  user_id: string;
  department: string;
  position: string;
  hire_date: string;
  performance_rating: number;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file';
}

export interface SupportTicket {
  id: string;
  client_id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  action_url?: string;
}

export interface SecurityLog {
  id: string;
  user_id: string;
  action: string;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  success: boolean;
  details?: string;
}

export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'it' | 'ru' | 'zh' | 'ja' | 'ko';