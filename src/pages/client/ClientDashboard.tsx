import React from 'react';
import { 
  Calendar,
  Clock,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const upcomingLessons = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00',
      type: 'practical',
      instructor: 'أحمد محمد',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2024-01-17',
      time: '14:30',
      type: 'theory',
      instructor: 'سارة أحمد',
      status: 'pending'
    }
  ];

  const stats = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: 'الدروس المكتملة',
      value: '12',
      change: '+2 هذا الأسبوع',
      color: 'blue'
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: 'ساعات التدريب',
      value: '24',
      change: '+4 ساعات',
      color: 'green'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: 'التقييم العام',
      value: '4.8',
      change: 'ممتاز',
      color: 'yellow'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: 'نسبة التقدم',
      value: '65%',
      change: '+10% هذا الشهر',
      color: 'purple'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      message: 'تم تأكيد درس القيادة العملية ليوم الاثنين',
      time: 'منذ ساعة'
    },
    {
      id: 2,
      type: 'info',
      message: 'تذكير: لديك درس نظري غداً الساعة 2:30 مساءً',
      time: 'منذ 3 ساعات'
    },
    {
      id: 3,
      type: 'warning',
      message: 'يرجى تحديث معلوماتك الشخصية',
      time: 'منذ يوم'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          {t('dashboard.welcome')}, {user?.name}!
        </h1>
        <p className="text-blue-100">
          مرحباً بك في لوحة تحكم العميل. يمكنك متابعة تقدمك ودروسك من هنا.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
            <p className={`text-sm text-${stat.color}-600`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Lessons */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {t('client.lessons.upcoming')}
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {lesson.type === 'practical' ? (
                        <Calendar className="w-6 h-6 text-blue-600" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {lesson.type === 'practical' ? 'درس عملي' : 'درس نظري'}
                      </h3>
                      <p className="text-sm text-gray-600">مع {lesson.instructor}</p>
                      <p className="text-sm text-gray-500">
                        {lesson.date} في {lesson.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {lesson.status === 'confirmed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            عرض جميع الدروس
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {t('nav.notifications')}
            </h2>
            <MessageCircle className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border-r-4 border-blue-400 bg-blue-50 p-4 rounded"
              >
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            عرض جميع الإشعارات
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
            حجز درس جديد
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
            تقييم خدماتنا
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            تواصل مع الدعم
          </button>
        </div>
      </div>
    </div>
  );
};